import type { BetterAuthPlugin } from "better-auth";
import { createAuthMiddleware, getSessionFromCtx } from "better-auth/api";
import {
  parseSetCookieHeader,
  setRequestCookie,
  setSessionCookie,
} from "better-auth/cookies";
import { handleOAuthUserInfo } from "better-auth/oauth2";
import {
  GATE_IDENTITY_HEADER,
  gateIdentityEnabled,
  gateIdentityFromHeaders,
  sessionBoundToGateIdentity,
} from "./gate-identity.server";

export const GATE_PROVIDER_ID = "grok-gate";
const GATE_ACCOUNT_ISSUER = "https://grok.com";
const LOG = "[gate-identity]";

type GateAccount = Parameters<typeof handleOAuthUserInfo>[1]["account"];

/**
 * Emit the signed session cookie so the browser actually receives it.
 *
 * `setSessionCookie` writes into the Better Auth middleware header bag, but on
 * TanStack Start that bag is not always copied onto the final HTTP response
 * (the response can end up with no `Set-Cookie`). Sign the token ourselves and
 * push it through TanStack's `setCookie` + `responseHeaders` so both the
 * framework cookie store and any after-hooks see it.
 */
async function emitSessionCookie(
  ctx: Parameters<Parameters<typeof createAuthMiddleware>[0]>[0],
  sessionTokenName: string,
  sessionToken: string,
): Promise<string | null> {
  const attributes = ctx.context.authCookies.sessionToken.attributes;
  const maxAge = ctx.context.sessionConfig.expiresIn;
  const cookieOptions = {
    ...attributes,
    maxAge,
  };

  let signedCookie: string;
  try {
    signedCookie = await ctx.setSignedCookie(
      sessionTokenName,
      sessionToken,
      ctx.context.secret,
      cookieOptions,
    );
  } catch (err) {
    console.error(`${LOG} setSignedCookie failed`, err);
    return null;
  }

  const sessionValue = parseSetCookieHeader(signedCookie).get(
    sessionTokenName,
  )?.value;
  if (!sessionValue) {
    console.error(`${LOG} signed Set-Cookie missing session token value`, {
      cookiePreview: signedCookie.slice(0, 120),
    });
    return null;
  }

  // Primary path: TanStack Start's response cookie store (reaches the browser).
  try {
    const { setCookie } = await import("@tanstack/react-start/server");
    setCookie(sessionTokenName, sessionValue, {
      path: cookieOptions.path ?? "/",
      httpOnly: cookieOptions.httpOnly ?? true,
      secure: cookieOptions.secure ?? true,
      sameSite: (cookieOptions.sameSite as "lax" | "strict" | "none") ?? "lax",
      maxAge: typeof maxAge === "number" ? maxAge : undefined,
      domain: cookieOptions.domain,
    });
  } catch (err) {
    console.error(`${LOG} TanStack setCookie failed`, err);
  }

  // Also stash on Better Auth responseHeaders so after-hooks (tanstackStartCookies)
  // can forward it if they run.
  try {
    const responseHeaders = ctx.context.responseHeaders;
    if (responseHeaders) {
      responseHeaders.append("set-cookie", signedCookie);
    } else {
      console.error(`${LOG} ctx.context.responseHeaders is missing`);
    }
  } catch (err) {
    console.error(`${LOG} responseHeaders.append(set-cookie) failed`, err);
  }

  return sessionValue;
}

/**
 * Expire the previous user's `session_data` cookie cache after an identity
 * swap. The cache is signed against the old session and outlives it (5-min
 * TTL), so without this `/get-session` keeps serving the replaced user.
 * Mirrors `emitSessionCookie`'s dual-path delivery: TanStack's response
 * cookie store plus Better Auth's `responseHeaders` bag.
 */
async function expireSessionDataCookie(
  ctx: Parameters<Parameters<typeof createAuthMiddleware>[0]>[0],
  cookie: { name: string; attributes: { path?: string; secure?: boolean } },
): Promise<void> {
  const path = cookie.attributes.path ?? "/";
  const secure = cookie.attributes.secure ?? true;
  try {
    const { setCookie } = await import("@tanstack/react-start/server");
    setCookie(cookie.name, "", {
      path,
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: 0,
    });
  } catch (err) {
    console.error(`${LOG} TanStack setCookie (expire session_data) failed`, err);
  }
  try {
    ctx.context.responseHeaders?.append(
      "set-cookie",
      `${cookie.name}=; Path=${path}; HttpOnly; ` +
        `${secure ? "Secure; " : ""}SameSite=Lax; Max-Age=0`,
    );
  } catch (err) {
    console.error(
      `${LOG} responseHeaders.append (expire session_data) failed`,
      err,
    );
  }
}

/** Drop a cookie from the request `Cookie` header (inverse of `setRequestCookie`). */
function removeRequestCookie(headers: Headers, name: string): void {
  const cookieHeader = headers.get("cookie");
  if (!cookieHeader) return;
  const kept = cookieHeader
    .split(";")
    .map((pair) => pair.trim())
    .filter((pair) => pair && !pair.startsWith(`${name}=`));
  if (kept.length > 0) {
    headers.set("cookie", kept.join("; "));
  } else {
    headers.delete("cookie");
  }
}

export function gateIdentitySessions() {
  return {
    id: "grok-gate-identity",
    hooks: {
      before: [
        {
          matcher: (ctx: { path?: string }) => ctx.path === "/get-session",
          handler: createAuthMiddleware(async (ctx) => {
            if (!gateIdentityEnabled()) return;
            const inbound = ctx.request?.headers ?? ctx.headers;
            if (!inbound) {
              console.error(`${LOG} no request headers on /get-session`);
              return;
            }
            // Bearer auth (live-preview popup) already carries a session — leave it alone.
            if (inbound.get("authorization")) return;
            if (!inbound.get(GATE_IDENTITY_HEADER)) return;

            const identity = await gateIdentityFromHeaders(inbound);
            if (!identity) {
              console.error(
                `${LOG} ${GATE_IDENTITY_HEADER} present but verification failed`,
              );
              return;
            }

            const sessionCookieName = ctx.context.authCookies.sessionToken.name;
            const cookieHeader = inbound.get("cookie") ?? "";
            if (cookieHeader.includes(`${sessionCookieName}=`)) {
              const existing = await getSessionFromCtx(ctx).catch((err) => {
                console.error(`${LOG} getSessionFromCtx failed`, err);
                return null;
              });
              if (existing?.session && existing.user) {
                const accounts = await ctx.context.internalAdapter
                  .findAccounts(existing.user.id)
                  .catch((err) => {
                    console.error(`${LOG} findAccounts failed`, err);
                    return null;
                  });
                if (!accounts) {
                  console.error(
                    `${LOG} could not load accounts for existing session user`,
                    { userId: existing.user.id },
                  );
                  return;
                }
                if (
                  sessionBoundToGateIdentity(
                    accounts,
                    identity.sub,
                    GATE_PROVIDER_ID,
                  )
                ) {
                  // Already signed in as this gate identity — nothing to do.
                  return;
                }
                await ctx.context.internalAdapter
                  .deleteSession(existing.session.token)
                  .catch((err) => {
                    console.error(
                      `${LOG} deleteSession (stale non-gate session) failed`,
                      err,
                    );
                    return null;
                  });
              }
            }

            try {
              const result = await handleOAuthUserInfo(ctx, {
                userInfo: {
                  id: identity.sub,
                  email: (
                    identity.email ?? `${identity.sub}@viewer.grok.invalid`
                  ).toLowerCase(),
                  emailVerified: Boolean(identity.email),
                  name: identity.name ?? "Grok user",
                },
                account: {
                  providerId: GATE_PROVIDER_ID,
                  issuer: GATE_ACCOUNT_ISSUER,
                  accountId: identity.sub,
                } as GateAccount,
              });
              if (result.error || !result.data) {
                console.error(`${LOG} handleOAuthUserInfo failed`, {
                  error: result.error,
                  hasData: Boolean(result.data),
                  sub: identity.sub,
                });
                return;
              }

              // Persist session rows + internal newSession state.
              await setSessionCookie(ctx, result.data);

              // Explicitly sign the token and emit Set-Cookie — do NOT rely on
              // reading it back from ctx.context.responseHeaders (often empty
              // here, which previously caused a silent signed-out render).
              const sessionValue = await emitSessionCookie(
                ctx,
                sessionCookieName,
                result.data.session.token,
              );
              if (!sessionValue) {
                console.error(
                  `${LOG} session created in DB but cookie was not emitted`,
                  { userId: result.data.user.id },
                );
                return;
              }

              const sessionDataCookie = ctx.context.authCookies.sessionData;
              await expireSessionDataCookie(ctx, sessionDataCookie);

              // Inject the cookie into this request so the rest of /get-session
              // resolves the newly created session in the same round-trip.
              const headers = new Headers(
                Object.fromEntries(inbound.entries()),
              );
              setRequestCookie(headers, sessionCookieName, sessionValue);
              removeRequestCookie(headers, sessionDataCookie.name);
              return { context: { headers } };
            } catch (err) {
              console.error(`${LOG} gate identity session hook threw`, err);
              return;
            }
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
}
