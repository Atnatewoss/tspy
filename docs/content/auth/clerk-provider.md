Clerk is a managed authentication service. It handles user management, sessions, session tokens, and multi-factor authentication for you — the plugin wires Clerk's client and verifies sessions on the server.

## Compose the plugin

Add `@tspy/clerk` under the `auth` key in `tspy.config.ts`. The publishable key goes to the client (it wraps the app), while the secret key stays server-side.

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { clerk } from "@tspy/clerk";

export default defineConfig({
  auth: clerk({
    publishableKey: "...",
    secretKey: "...",
  }),
});
```

## Environment variables

- `CLERK_PUBLISHABLE_KEY` — safe to expose on the client.
- `CLERK_SECRET_KEY` — server-only; never commit it.

## Clerk wires the client

Clerk is the one provider that spans the client side. A publishable key frontend mounts its session wrappers (`<ClerkProvider>`, sign-in/up components) around your app, so the UI renders based on live session state without extra work.

On the server, the handler under `server/auth/` verifies sessions before protected routes run:

```ts
// server/api/me.ts
import { auth } from "tspy/server";

export default defineEventHandler(async (event) => {
  const session = await auth.getSession(event);
  if (!session) throw createError({ statusCode: 401 });
  return session.user;
});
```

## Shared credentials

Because the client and the server each need a different key, Clerk is also the one provider where the plugin writes two entries to `.env.example`: `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`. The server never reads the publishable key, and the client never sees the secret.