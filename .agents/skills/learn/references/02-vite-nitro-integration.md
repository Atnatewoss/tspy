# Chapter 2: Vite Plugin & Nitro Server Integration Architecture

## 1. Overview

TSPY internalizes Vite and Nitro into programmatic services started by `@tspy/dev`. Developers do not manage `vite.config.ts`, `nitro.config.ts`, or `index.html` in their application root.

---

## 2. Programmatic Server Setup (`packages/dev/src/index.ts`)

```typescript
import { createServer as createViteServer } from "vite";
import react from "@vitejs/plugin-react";
import { createNitro, createDevServer as createNitroDevServer, build, prepare } from "nitropack";
import { tspyRoutesPlugin } from "./plugins/routes";

export async function runDevServer(options: { cwd?: string } = {}) {
  const cwd = options.cwd || process.cwd();

  // 1. Programmatic Nitro Backend API Server
  const nitro = await createNitro({
    rootDir: cwd,
    dev: true,
    compatibilityDate: '2026-09-14'
  });
  
  const nitroDevServer = createNitroDevServer(nitro);
  const nitroPort = 3000;
  await nitroDevServer.listen(nitroPort);
  await prepare(nitro);
  build(nitro).catch(err => console.error("Nitro build error:", err));

  // 2. Programmatic Vite Frontend Server
  const vite = await createViteServer({
    root: cwd,
    server: {
      port: 5173,
      watch: {
        ignored: ["**/node_modules/**", "**/.git/**"],
      },
      proxy: {
        "/api": `http://localhost:${nitroPort}`,
      },
    },
    plugins: [
      tspyRoutesPlugin(cwd),
      react(),
      {
        name: "tspy-html",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (
              req.headers.accept?.includes("text/html") &&
              !req.url?.startsWith("/api")
            ) {
              try {
                let html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TSPY App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/@id/tspy/entry-client"></script>
  </body>
</html>`;
                html = await server.transformIndexHtml(req.url, html);
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.end(html);
              } catch (e) {
                return next(e);
              }
            } else {
              next();
            }
          });
        },
      },
    ],
  });

  await vite.listen();
  vite.printUrls();
}
```

---

## 3. Virtual Module Resolution & Invalidation

`tspyRoutesPlugin` intercepts `virtual:tspy-routes` requests:

```typescript
const virtualModuleId = "virtual:tspy-routes";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

// Resolution hook
resolveId(id) {
  if (id === virtualModuleId) return resolvedVirtualModuleId;
}

// Module load hook
load(id) {
  if (id === resolvedVirtualModuleId) {
    const files = getAppFiles();
    const manifest = parseRoutes(files);
    return generateRouteModule(manifest);
  }
}
```

### Module Graph Invalidation
When `server.watcher` detects a file addition or deletion in `/app`, the plugin invalidates `\0virtual:tspy-routes` in Vite's module graph:

```typescript
const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
if (mod) {
  server.moduleGraph.invalidateModule(mod);
  server.ws?.send({ type: "full-reload" });
}
```

This triggers an automatic HMR update in the browser, regenerating the client router with zero server restarts.
