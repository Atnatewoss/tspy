## Package layout

The project ships as two packages: a thin `tspy` runtime core and an
optional `@tspy/dev` tooling package. Everything else is a plugin
package.

## tspy core

The core package owns the routing API — the filesystem parser, the
manifest types, and the runtime router adapter. It has no bundled auth,
database, AI, or job implementations; those live in plugins.

## @tspy/dev

The dev package owns the tooling: the Vite plugin that scans `app/`,
the Nitro server wiring, and the CLI. It is the only package with a
build-time footprint in your project.

## Plugins

Plugins are thin workspaces that call core factories —
`createAuthPlugin`, `createDatabasePlugin`, `createAiPlugin`,
`createJobsPlugin`. Each one records config and produces generated
exports; none bundles a provider's full implementation into your app.

## Exports map

| Module | Purpose |
|---|---|
| `tspy` | Core runtime and routing API |
| `tspy/router` | Parser, manifest types, layout adapter |
| `@tspy/dev` | Vite plugin, server wiring, CLI |
| `@tspy/<provider>` | One plugin per integration |