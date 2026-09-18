# TSPY Architecture

This document describes how TSPY is composed and the design decisions behind it. TSPY is in development, so treat the checked-out source, package manifests, tests, and templates as the authoritative contract rather than any prose here.

## High-level architecture

TSPY is a monorepo of small packages that together form a full-stack framework: a Vite-powered dev server, a Nitro-powered server runtime, a build-time filesystem router, a generated typed RPC boundary, and composable capability plugins.

```
         create-tspy-app (project generator)
                    |
                    v
        tspy.config.ts + app/ + server/api/ + ai/
                    |
                    v
                tspy dev (@tspy/dev)
        +-----------------------------+
        |  Vite  (port 3000)          |
        |   |- tspy-routes plugin     |
        |   |    fast-glob -> parser  |
        |   |    -> virtual:routes    |
        |   |- React + HMR            |
        |   '- /api proxy             |
        +-----------------------------+
                    |           \
                    |  /api       \  server pages
                    v             v
        +------------------------------+
        |  Nitro (port 3001)          |
        |   |- Hono router (/api/**)  |
        |   '- plugin server exports  |
        +------------------------------+
```

## Package structure

### Core packages

| Package | Directory | Responsibility |
| --- | --- | --- |
| `tspy` | `packages/tspy` | Core framework: configuration, route parser and generator, React Router adapter, client entry, RPC client stub, plugin utilities and types |
| `@tspy/dev` | `packages/dev` | Programmatic dev server (Vite + Nitro), the `virtual:tspy-routes` Vite plugin, and the `.tspy/` generators (RPC, server exports, config loading) |
| `@tspy/create-app` | `packages/create-tspy-app` | Interactive project generator and composable templates (`base`, `ai`, `auth`, `database`, `jobs`) |

### Capability plugins

`packages/tspy-*` provide the composable integrations, each a `TSPYPlugin` composed under a key in `tspy.config.ts`:

- AI providers: `tspy-anthropic`, `tspy-google`, `tspy-ollama`, `tspy-openai`
- Authentication: `tspy-better-auth`, `tspy-clerk`, `tspy-firebase`, `tspy-supabase`, `tspy-workos`
- Databases: `tspy-drizzle`, `tspy-kysely`, `tspy-prisma`, `tspy-sql`
- Background jobs: `tspy-celery`, `tspy-dramatiq`, `tspy-rq`

### Documentation

`docs/` is the TSPY documentation site (tspy.dev) and the reference for routing, the RPC boundary, AI capabilities, jobs, and deployment.

## Request flow

### Development

1. `tspy dev` runs `generateAll` first: it loads `tspy.config.ts` with jiti, calls `setup` on every plugin, and writes the generated `.tspy/server.ts` (plugin server exports) plus the RPC artifacts `.tspy/hono.ts` and `.tspy/api-client.ts`.
2. Nitro starts on port 3001 in dev mode; the `/api` prefix is proxied there from Vite.
3. Vite starts on port 3000 with aliases that resolve `#tspy-api` to `.tspy/api-client.ts` and `tspy/server` to `.tspy/server.ts` at dev time.
4. The `tspy-routes` Vite plugin scans `app/**/{page,layout}.tsx` with fast-glob, hands the paths to `parseRoutes`, and serves the generated route module as `virtual:tspy-routes`. File creation, removal, and renames trigger HMR through the plugin's `configureServer` watcher.
5. The `tspy-html` middleware injects the HTML shell (a `#root` div and the `entry-client` module), which hydrates the app with `createRoot` + `StrictMode` and a `TSPYRouter`.
6. Client RPC calls (`api.<path>.<method>(args)`) are generated from the Hono `AppRouter` type, POST to `/api/<path>`, are proxied to Nitro, and hit the compiled Hono router, which invokes the matching handler from `server/api/`.

The ai/auth/db/jobs exports under `tspy/server` are provided at dev time by the generated `.tspy/server.ts`; the checked-in `server.ts` and `api-client.ts` stubs exist so imports resolve in source and are marked AUTO-GENERATED to signal the dev-time replacement.

### Production

- The route manifest is computed at build time, so the production server never scans the filesystem for routes.
- Route modules are emitted as `lazy` imports inside React Router route objects, giving per-route code splitting.
- The server runtime is Nitro-backed, so output is portable across the documented deployment presets (Node/Docker, Vercel, Netlify, Cloudflare Workers, Deno Deploy, Fly.io, Railway, Render, AWS Lambda).
- The RPC client uses the same generated Hono client type against the built `/api` router.

## Design principles

- **Build-time routing.** Routes are parsed and validated during the build; nothing is discovered at request time.
- **Predictable full-stack boundaries.** The generated RPC client and the server router are produced from the same source, so the boundary can fail at type-check time instead of at runtime.
- **Composable capabilities.** Features ship as opt-in plugins under `tspy.config.ts` keys. Unselected capabilities add no runtime cost.
- **Zero-config ergonomics.** No `index.html` and no `nitro.config.ts`; the framework owns the build environment.
- **Co-located intelligence.** React routes and their Python AI models live in the same project tree (`app/` and `ai/`).
- **Vite for development, Nitro for production.** Development keeps the Vite HMR loop; production output is built for a server runtime.

## Key components

| Component | File | Responsibility |
| --- | --- | --- |
| Route parser | `packages/tspy/src/router/parser.ts` | Builds a `RouteManifestNode` tree from `page.tsx`/`layout.tsx` paths; detects conflicts between dynamic and catch-all segments at the same level |
| Route conventions | `packages/tspy/src/router/conventions.ts` | `page.tsx`/`layout.tsx` matching, `[id]` dynamic and `[...slug]` catch-all segment helpers |
| Route generator | `packages/tspy/src/router/generator.ts` | Emits React Router route objects with `lazy` modules and layout composition |
| Layout adapter | `packages/tspy/src/router/adapter.tsx` | Wraps a layout component around the child `<Outlet />` |
| Router | `packages/tspy/src/router.tsx` | `TSPYRouter` builds a `createBrowserRouter` from `virtual:tspy-routes` |
| Vite plugin | `packages/dev/src/plugins/routes.ts` | Provides the `virtual:tspy-routes` module from a fast-glob scan and sends route changes to Vite HMR |
| Generators | `packages/dev/src/generator.ts` | `generateAll`, `generateRPC` (compiles `server/api` into a Hono router and its client), `generateServerExports`, `loadConfig` |
| Dev server | `packages/dev/src/index.ts` | Boots Vite and Nitro, serves the HTML shell, proxies `/api`, and wires the `#tspy-api`/`tspy/server` aliases |
| Config and plugins | `packages/tspy/src/config.ts`, `packages/tspy/src/plugin-utils.ts` | `defineConfig`, `TSPYPlugin` shape, and the `createAuthPlugin`/`createDatabasePlugin`/`createAiPlugin`/`createJobsPlugin` helpers |
| Client entry | `packages/tspy/src/entry-client.tsx` | React root creation, `StrictMode`, and the app's `globals.css` import |

## Generated artifacts are a contract

- `.tspy/hono.ts` and `.tspy/api-client.ts` are produced from `server/api/` and are the single source for the RPC type boundary.
- `.tspy/server.ts` re-exports what each plugin contributes to `tspy/server`.
- `virtual:tspy-routes` is produced from `app/` and is the single source for the route table.
- The checked-in `server.ts` and `api-client.ts` files are dev stubs and are labeled AUTO-GENERATED; do not implement framework behavior in them.

## Testing strategy

- Package tests: `packages/tspy/src/router/router.test.ts` and `integration.test.ts` cover parsing, conflict detection, and route module generation; `packages/tspy/src/router/vite-e2e.test.ts` exercises the plugin output end to end.
- Generator tests: `packages/create-tspy-app` runs `node --test` over scaffolding behavior.
- Workspace: `pnpm typecheck` and `pnpm test` run all packages recursively.

## Performance considerations

- Route discovery happens once at build time, so runtime has zero scanning overhead.
- Route modules are `lazy`, so each page loads its own chunk.
- Development keeps HMR on the Vite loop; the Nitro server is only exercised for `/api` and server concerns.
- Generated modules are served through a virtual module, so the parser output is not duplicated on disk at runtime.