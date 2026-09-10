# @tspy/dev

The dev server and build tooling for TSPY. Used by the `tspy` package; the
`tspy dev` flow starts Nitro (port 3000) and Vite (port 5173) programmatically.

- Route discovery via `tspyRoutesPlugin` (`virtual:tspy-routes`), with HMR
  invalidation on `app/` file changes
- React plugin and HTML entry wired in for you — no `vite.config.ts` needed
- `/api` proxied from Vite to Nitro

## Usage

Usually invoked through the `tspy` package:

```ts
import { runDevServer } from "tspy";
await runDevServer({ cwd: process.cwd() });
```

## Development

```sh
pnpm --filter @tspy/dev test
```