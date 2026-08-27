# Reading the user, protecting routes, and preventing flicker

## Reading the user / protecting routes

`@/lib/auth/use-current-user` (with auth on these reflect the REAL session, so a
preview visitor is signed out until they sign in):

- `useCurrentUser()` → `AppUser | null` — for display. `null` means *loading OR
  signed out*, so never redirect on it alone.
- `useCurrentUserState()` → `{ user, isPending }` — for guards: wait for
  `isPending` to clear before treating `user: null` as signed out, or a hard
  reload bounces signed-in users to sign-in.

**State components** from `@/lib/auth/gates`: `SignedIn`, `SignedOut`,
`RedirectToSignIn`, `UserButton`. (When auth is disabled via
`VITE_AUTH_ENABLED=false` they apply dev-user semantics so a non-auth app still
renders.)

```tsx
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";

function Navbar() {
  const user = useCurrentUser(); // display only — null may just mean "loading"
  return (
    <>
      <span>{user?.displayName ?? "Guest"}</span>
      <SignedOut><a href="/login">Sign in</a></SignedOut>
      <SignedIn><UserButton /></SignedIn>
    </>
  );
}

function AccountPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return null;             // session still resolving
  if (!user) return <RedirectToSignIn />; // client-side Navigate — not window.location
  return <h1>Welcome, {user.displayName}</h1>;
}
```

Sign out with `<UserButton />` or `signOut()` from `@/lib/auth/client`.

Session loading is the **same in live preview and when deployed**: wait for
`isPending` from `useCurrentUserState()` (backed by `/api/auth/get-session`).
The only live-preview difference is **how sign-in starts** (popup + bearer hand-off
instead of a full-page OAuth redirect) — not how guests vs signed-in users are
detected. Prefer `<RedirectToSignIn />` (TanStack `<Navigate>`) over
`window.location.href = "/login"` so a signed-out redirect does not full-reload
the SPA.

## Preventing auth flicker

`useSession()` resolves on the client, so a naive UI flashes signed-out →
signed-in on load. Rules:

1. **Gate on `isPending`, not `user` alone — and render a same-sized skeleton.**
   Showing the SAME placeholder while `isPending` (server render + first client
   paint) makes it one clean swap (skeleton → content) with no flash and no SSR
   hydration mismatch. Don't return `null` in a slot that then grows — reserve the
   space:

   ```tsx
   import { useCurrentUserState } from "@/lib/auth/use-current-user";
   import { UserButton } from "@/lib/auth/gates";

   function AuthSlot() {
     const { user, isPending } = useCurrentUserState();
     if (isPending) return <div className="h-8 w-8 animate-pulse rounded-full bg-black/10" />;
     return user ? <UserButton /> : <a href="/login">Sign in</a>;
   }
   ```

2. **Guard at a layout boundary** (nav / page shell), not in leaf components that
   mount/unmount — `useSession` is one shared store, so keep one stable consumer
   per region instead of re-gating everywhere.

3. **Zero-flash when deployed: SSR the session from the cookie.** On a deployed
   app (and top-level navigations) the session cookie is same-origin, so the server
   already knows the user on the first request — resolve it in the root route and
   render the authed shell immediately:

   ```tsx
   // src/routes/__root.tsx (excerpt)
   import { createServerFn } from "@tanstack/react-start";
   import { createRootRoute } from "@tanstack/react-router";

   const fetchSessionUser = createServerFn({ method: "GET" }).handler(async () => {
     // Cookie path only — works when deployed / on top-level loads.
     const { getSessionUser } = await import("@/lib/auth/verify.server");
     const u = await getSessionUser();
     return u ? { id: u.id, email: u.email } : null;
   });

   export const Route = createRootRoute({
     beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
     // Merge into the existing root — keep the existing head().
     // component: prefer `sessionUser` for the FIRST paint when deployed, then
     // `useCurrentUserState()` for live in-page updates.
   });
   ```

   Sign-in/out navigate, so `beforeLoad` re-runs and the context stays fresh; call
   `router.invalidate()` if you change auth state without navigating.

   In live preview the session often rides a bearer after popup sign-in, so cookie
   SSR may still return null until the client `useSession()` runs with the bearer
   attached — still gate on `isPending`, same as when deployed.

The template already enables Better Auth's `session.cookieCache`, so `/get-session`
answers from a cookie when one is present (no DB round-trip).
