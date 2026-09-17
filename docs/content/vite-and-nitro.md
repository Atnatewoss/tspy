## Why no index.html

There is no `index.html` in your project. TSPY generates it internally —
the entry point, the script tags, the module preload hints. You don't
touch it.

## Vite inside TSPY

TSPY owns the Vite configuration. You don't write `vite.config.ts`. The
framework sets up:

- React plugin
- Path aliases (`@/` → `app/`)
- Dev server proxy (`/api` → Nitro)
- HMR for routes and layouts

## Nitro inside TSPY

Nitro handles the server side. It provides:

- API route handling
- Middleware execution
- Static file serving
- Deployment presets

Both run in the same `tspy dev` command. Vite serves the client, Nitro
serves the API, and the proxy connects them.
