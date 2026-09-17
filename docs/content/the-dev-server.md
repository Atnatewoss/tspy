## Orchestration

When you run `tspy dev`, the framework starts two processes:

1. **Vite** — serves the client bundle, handles HMR
2. **Nitro** — serves the API, handles server-side logic

Both run on the same port (3000). Vite handles browser requests, Nitro
handles `/api/*` requests. The proxy is transparent.

## Ports

- **3000** — Vite dev server (public)
- **3001** — Nitro server (internal, proxied)

You only interact with port 3000. The Nitro port is internal.

## Proxying

All `/api/*` requests are proxied from Vite to Nitro. This means:

- Client code can fetch `/api/...` directly
- In production, Nitro serves everything
- No CORS issues in development

```ts tspy.config.ts
// The proxy is automatic — no configuration needed
export default defineConfig({
  // ...
});
```
