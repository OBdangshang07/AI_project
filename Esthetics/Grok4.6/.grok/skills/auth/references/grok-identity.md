# Sign in with Grok (deployed apps — zero clicks)

Behind the edge gate, every proxied request from a signed-in Grok viewer
carries an unforgeable `x-grok-identity` JWT (EdDSA, minted per request; the
gate strips any client-supplied copy). The pre-wired `gateIdentitySessions`
plugin (`src/lib/auth/gate-session.server.ts`) verifies it against the gate's
JWKS (`/__gate/identity-key`, via `src/lib/auth/gate-identity.server.ts`) and,
when the app has no session yet, materializes the Better Auth session for that
viewer automatically — no sign-in button, no redirect, no broker round-trip.
`useSession` / `useCurrentUser` simply return the Grok user.

The broker OAuth flow is the **fallback** for anonymous/public viewers and for
contexts without the gate; the live preview keeps its existing popup mechanism.

## Files (pre-wired — do not edit)

| File | Role |
|---|---|
| `gate-identity.server.ts` | Verifies the gate's `x-grok-identity` viewer JWT (EdDSA vs the gate JWKS; fail-closed). Server-only. |
| `gate-session.server.ts` | Better Auth plugin that turns a verified gate identity into the app session with zero clicks. Already registered in `server.ts`. |

## Env (deployer-injected)

| Var | Scope | Meaning |
|---|---|---|
| `GROK_PROJECT_ID` | server | enables "Sign in with Grok" (`x-grok-identity` audience check `app:<project_id>`) |
| `GROK_GATE_ORIGIN` | server | gate public origin (JWKS + issuer pin); unset → derived from the inbound host |

Deployed behavior: gate-authenticated viewers are signed in automatically from
`x-grok-identity`; the deployer also injects a per-app broker client +
`DATABASE_URL`, so the fallback sign-in persists identities in Postgres.
