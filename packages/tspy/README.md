# tspy

The core package of the TSPY meta-framework: a fullstack framework where
TypeScript owns the web (Vite + React + filesystem routing) and Python owns the
intelligence (AI and background jobs).

## Exports

- `defineConfig` — typed entry for `tspy.config.ts`
- `createAuthPlugin`, `createDatabasePlugin`, `createAiPlugin`,
  `createJobsPlugin` — factories the `@tspy/*` packages build on
- `api` — client-side RPC helper
- `TSPYRouter` — mounts the app's filesystem routes
- `tspy/server` — generated server exports (`auth`, `db`, `ai`, `jobs`)
- `tspy/router` — route parser, generator, and layout adapter
- `runDevServer` — starts Vite + Nitro programmatically

## Config

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { betterAuth } from "@tspy/better-auth";
import { drizzle } from "@tspy/drizzle";

export default defineConfig({
  auth: betterAuth({ emailAndPassword: { enabled: true } }),
  database: drizzle({ provider: "sqlite", url: "file:./db.sqlite" }),
});
```

## Runtime

```ts
// client
import { api } from "tspy";
const result = await api.users.sayHello({ name: "tspy" });

// server
import { auth, db, ai, jobs } from "tspy/server";
```

## Development

The package has no standalone test suite; its behavior is exercised through the
end-to-end scaffolding tests in <code>create-tspy-app</code>.