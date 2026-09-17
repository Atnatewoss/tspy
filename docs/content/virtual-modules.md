## virtual:tspy-routes

The route module is a virtual module — it doesn't exist on disk. Vite
resolves it at build time and injects the generated route tree.

```ts
// This import is resolved by the TSPY Vite plugin
import { routes } from "virtual:tspy-routes";
```

## Server exports

TSPY generates typed exports on `tspy/server`. These are the runtime
bindings for auth, database, AI, and jobs:

```ts
// Generated exports
export { auth } from "./auth";
export { db } from "./database";
export { ai } from "./ai";
export { jobs } from "./jobs";
```

Import them in your API routes:

```ts
import { auth, db, ai, jobs } from "tspy/server";
```

## Type safety

All generated exports are fully typed. The types come from your plugin
configuration — if you configure `anthropic`, the `ai` export is typed
as the Anthropic SDK client.
