# Chapter 3: Automated Testing & Quality Assurance Suite

## 1. Unit Testing Suite (`packages/tspy/src/router/router.test.ts`)

Tests the pure data functions `parseRoutes` and `generateRouteModule`.

```typescript
import { parseRoutes } from "./parser";
import { generateRouteModule } from "./generator";

const mockFiles = [
  "/app/layout.tsx",
  "/app/page.tsx",
  "/app/about/page.tsx",
  "/app/users/[id]/page.tsx",
  "/app/docs/[...slug]/page.tsx",
];

const manifest = parseRoutes(mockFiles);
const code = generateRouteModule(manifest);

// Validation
console.assert(manifest.layout === "/app/layout.tsx", "Root layout assigned");
console.assert(manifest.page === "/app/page.tsx", "Root page assigned");
console.assert(code.includes('import { TSPYLayoutAdapter } from "tspy/router";'), "Layout adapter import emitted");
```

---

## 2. Router Integration & URL Matching (`packages/tspy/src/router/integration.test.ts`)

Tests URL pattern matching, parameter extraction, and route conflict detection using React Router's `createMemoryRouter`.

```typescript
import React from "react";
import { createMemoryRouter, useParams } from "react-router";
import { parseRoutes } from "./parser";
import { TSPYLayoutAdapter } from "./adapter";

// Test route matching for /users/123
const router = createMemoryRouter(routes, { initialEntries: ["/users/123"] });
await router.navigate("/users/123");

const match = router.state.matches[router.state.matches.length - 1];
console.assert(match.params.id === "123", "Params id extracted accurately");

// Test conflict detection
try {
  parseRoutes(["app/users/[id]/page.tsx", "app/users/[userId]/page.tsx"]);
  console.assert(false, "Should have thrown conflict error");
} catch (err) {
  console.assert(err.message.includes("TSPY Route Conflict"), "Caught route conflict error");
}
```

---

## 3. Vite Virtual Module E2E & HMR (`packages/tspy/src/router/vite-e2e.test.ts`)

Launches a programmatic Vite server to test virtual module compilation, resolution, and HMR module graph invalidations across file additions, deletions, and layout creations.

```typescript
const vite = await createViteServer({
  root: testAppDir,
  resolve: {
    alias: [
      { find: "tspy/router", replacement: tspyRouterPath },
      { find: /^react$/, replacement: reactPath },
      { find: /^react-router$/, replacement: reactRouterPath },
    ],
  },
  server: { middlewareMode: true, watch: null },
  plugins: [tspyRoutesPlugin(testAppDir)],
});

// Test transformation
const res = await vite.transformRequest("virtual:tspy-routes");
console.assert(res.code.includes('path: "about"'), "Virtual module transforms correctly");
```
