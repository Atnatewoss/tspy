## The pipeline

When you run `tspy build`, three things happen:

1. **Vite builds the client** — `app/` → `public/` (hashed bundles)
2. **Nitro builds the server** — `server/` → `.output/server/`
3. **Plugins generate code** — RPC stubs, import maps, type definitions

## Build output

```
.output/
├── server/
│   ├── index.mjs        # Nitro server entry
│   └── chunks/          # Server code chunks
├── public/
│   ├── _app/            # Vite client bundles
│   └── index.html       # Generated entry
└── nitro.json           # Build manifest
```

## What gets generated

TSPY generates several files during the build:

- **`.tspy/routes.ts`** — virtual route module
- **`.tspy/server-exports.ts`** — typed server exports
- **`.tspy/rpc-stubs.ts`** — Python ↔ TypeScript RPC stubs

These are virtual modules — they exist in memory during dev, on disk
during build.
