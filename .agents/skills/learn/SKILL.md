---
name: learn
description: Comprehensive deep-dive specification and technical reference for TSPY's architecture, filesystem routing engine, runtime adapters, and dev server integrations.
---

# TSPY Meta-Framework Specification & Learning Guide

This document serves as the authoritative, end-to-end technical reference and architectural specification for **TSPY**, a full-stack React meta-framework designed for TypeScript and Python applications.

---

## 1. Executive Summary & Meta-Framework Philosophy

Modern web applications require a seamless bridge between client-side user interfaces, server-side APIs, and backend data processing. While React excels at UI component rendering and state management, it leaves routing, build configuration, server execution, and asset bundling to the developer.

**TSPY** fills this gap by acting as a zero-config, highly opinionated meta-framework. It synthesizes four core technologies into a cohesive developer experience:

1. **Vite**: Ultra-fast frontend bundler and HMR dev server.
2. **Nitro**: Universal, edge-ready server engine for APIs and server-side execution.
3. **React Router**: Industry-standard client-side URL matching and navigation engine.
4. **TSPY Filesystem Router**: A decoupled, build-time route discovery engine that parses `app/` conventions into a virtual module.

### Core Design Axioms

- **Build/Dev-Time Discovery Only**: Filesystem scanning is strictly a framework/build concern. The browser runtime MUST NOT scan the filesystem or execute `import.meta.glob`.
- **Pure Data Manifests**: The route parser extracts filesystem structure into a pure JSON-like tree (`RouteManifestNode`). It never generates raw JavaScript strings directly.
- **Dedicated Code Generation**: A separate generator translates `RouteManifestNode` into JavaScript code consuming React Router's `lazy` route objects.
- **Ergonomic Layout API**: Developers write layouts using standard React `{ children }` composition. TSPY transparently adapts this to React Router's `<Outlet />` primitive via a runtime adapter.
- **Zero Config in User Space**: Applications contain no `index.html`, `vite.config.ts`, or `nitro.config.ts`. TSPY manages these environments programmatically.

### Lean Core, Optional Plugins (install footprint is a product property)

TSPY is intentionally NOT a "one big framework that includes everything" (the
Next.js model: heavy custom bundler stack, full RSC runtime, image/font
optimizers, huge transitive graph — often 250–400MB+ of `node_modules`). The
goal is the TanStack Start / Farm.js shape: small core + optional packages on
Vite.

- **Thin `tspy` core**: auth, database, AI, and jobs MUST NOT live in the core
  package. They ship as opt-in plugin workspaces (`@tspy/better-auth`,
  `@tspy/drizzle`, `@tspy/google`, …) that call the core factories
  (`createAuthPlugin`, `createDatabasePlugin`, `createAiPlugin`,
  `createJobsPlugin`).
- **Stay on Vite + Nitro**: never build a heavy custom bundler stack. Vite owns
  the client dev/build; Nitro owns the server.
- **Generate only what the user needs**: `.tspy/` output (import maps, API
  client, server exports) is produced from the composed plugins — no large
  prebuilt runtime shipped by default.
- **Plugins stay thin**: a plugin records config (provider, model, API key) and
  produces the matching generated export — it does not bundle the provider's
  full implementation into the scaffold.
- **No downloadable dependency bloat**: the floor install is `tspy` + `@tspy/dev`
  + Vite; everything else is the user's explicit choice.
- Install-size regressions (fat defaults, monolith deps, legacy surface) are a
  design failure, not a maintenance task.

---

## 2. Comparative Framework Analysis

TSPY's architecture draws direct inspiration from established web meta-frameworks while maintaining distinct boundaries:

| Feature / Aspect | Next.js (App Router) | Nuxt 3 | SvelteKit | TSPY |
| --- | --- | --- | --- | --- |
| **Filesystem Root** | `app/` | `pages/` | `src/routes/` | `app/` |
| **Route Discovery** | Build-time compilation | Build-time scanner | Build-time route tree | Build/Dev-time Vite plugin |
| **Runtime Router** | Custom React App Router | `vue-router` | SvelteKit runtime router | `react-router` |
| **Layout Convention** | `layout.tsx` (`children`) | `layouts/` | `+layout.svelte` | `layout.tsx` (`children`) |
| **Layout Adaptation** | React Server Components | `<NuxtPage />` | `<slot />` / `children` | `TSPYLayoutAdapter` (`<Outlet />`) |
| **Server Engine** | Next Server / Node | Nitro | Adapter-based | Nitro |
| **Browser FS Scan** | ❌ No | ❌ No | ❌ No | ❌ No (`virtual:tspy-routes`) |

---

## 3. Comprehensive Data & Control Flow Architecture

```text
                               ┌─────────────────────────────────────────┐
                               │             DEVELOPER SPACE             │
                               │  app/layout.tsx    app/page.tsx         │
                               │  app/about/page.tsx  app/users/[id]/page │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       TSPY BUILD & DEV LAYER                                           │
│                                                                                                        │
│  ┌────────────────────────┐         ┌─────────────────────────┐         ┌───────────────────────────┐  │
│  │   tspyRoutesPlugin     │         │   parseRoutes()         │         │   generateRouteModule()   │  │
│  │  (fast-glob scanner)   ├────────►│  (converts file list to ├────────►│  (emits virtual JS code   │  │
│  │  Scans app/ directory  │         │   RouteManifestNode)    │         │   with lazy dynamic imports│  │
│  └───────────┬────────────┘         └─────────────────────────┘         └─────────────┬─────────────┘  │
│              │                                                                        │                │
│              ▼                                                                        ▼                │
│  ┌────────────────────────┐                                             ┌───────────────────────────┐  │
│  │     server.watcher     │                                             │   virtual:tspy-routes     │  │
│  │  Listens for add/unlink├────────────────────────────────────────────►│  (Injected Vite module    │  │
│  │  Invalidates module    │                                             │   graph entry)            │  │
│  └────────────────────────┘                                             └─────────────┬─────────────┘  │
└───────────────────────────────────────────────────────────────────────────────────────┼────────────────┘
                                                                                        │
                                                                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       CLIENT BROWSER RUNTIME                                           │
│                                                                                                        │
│  ┌────────────────────────┐         ┌─────────────────────────┐         ┌───────────────────────────┐  │
│  │    entry-client.tsx    │         │       TSPYRouter        │         │    createBrowserRouter    │  │
│  │  Mounts to #root DOM   ├────────►│  Reads virtual routes   ├────────►│   Instantiates router with│  │
│  │  element               │         │  from virtual module    │         │   lazy route objects      │  │
│  └────────────────────────┘         └─────────────────────────┘         └─────────────┬─────────────┘  │
│                                                                                       │                │
│                                                                                       ▼                │
│                                                                         ┌───────────────────────────┐  │
│                                                                         │    URL Match & Navigation │  │
│                                                                         │  / -> Home Page           │  │
│                                                                         │  /about -> About Page     │  │
│                                                                         │  /users/123 -> User Page  │  │
│                                                                         └─────────────┬─────────────┘  │
│                                                                                       │                │
│                                                                                       ▼                │
│                                                                         ┌───────────────────────────┐  │
│                                                                         │     TSPYLayoutAdapter     │  │
│                                                                         │  Wraps Layout component & │  │
│                                                                         │  renders child <Outlet /> │  │
│                                                                         └───────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Package & Module Blueprint

The TSPY meta-framework is organized into two primary monorepo packages: `tspy` (runtime core & routing API) and `@tspy/dev` (dev server & build tooling).

### 4.1 `packages/tspy/src/router/conventions.ts`
Defines route file matchers, dynamic segment detection, and path formatting helpers:

```typescript
export const PAGE_FILE = "page.tsx";
export const LAYOUT_FILE = "layout.tsx";

export function isPageFile(filename: string): boolean {
  return filename === PAGE_FILE || filename.endsWith(`/${PAGE_FILE}`);
}

export function isLayoutFile(filename: string): boolean {
  return filename === LAYOUT_FILE || filename.endsWith(`/${LAYOUT_FILE}`);
}

export function isDynamicSegment(segment: string): boolean {
  return segment.startsWith("[") && segment.endsWith("]") && !segment.startsWith("[...");
}

export function isCatchAllSegment(segment: string): boolean {
  return segment.startsWith("[...") && segment.endsWith("]");
}

export function formatSegmentToRoutePath(segment: string): string {
  if (isCatchAllSegment(segment)) return "*";
  if (isDynamicSegment(segment)) return `:${segment.slice(1, -1)}`;
  return segment;
}
```

### 4.2 `packages/tspy/src/router/types.ts`
Specifies the manifest data structures:

```typescript
export interface RouteManifestNode {
  segment: string;       // Directory or param segment (e.g. "", "about", "[id]")
  path?: string;         // Relative URL segment (e.g. "about", ":id", "*")
  page?: string;         // Absolute file path to page.tsx
  layout?: string;       // Absolute file path to layout.tsx
  children: RouteManifestNode[];
}
```

### 4.3 `packages/tspy/src/router/parser.ts`
Transforms flat `/app` file paths into the `RouteManifestNode` hierarchy while enforcing route conflict rules:

```typescript
export function parseRoutes(files: string[]): RouteManifestNode {
  const root: RouteManifestNode = { segment: "", children: [] };

  const getOrCreateNode = (segments: string[]): RouteManifestNode => {
    let current = root;
    for (const segment of segments) {
      const formattedPath = formatSegmentToRoutePath(segment);

      // Conflict detection for duplicate dynamic/catch-all segments at the same level
      const existingConflict = current.children.find((c) => {
        if (c.segment === segment) return false;
        if (isDynamicSegment(segment) && isDynamicSegment(c.segment)) return true;
        if (isCatchAllSegment(segment) && isCatchAllSegment(c.segment)) return true;
        return c.path === formattedPath;
      });

      if (existingConflict) {
        throw new Error(
          `TSPY Route Conflict: Conflicting segments "${segment}" and "${existingConflict.segment}" at the same directory level.`
        );
      }

      let child = current.children.find((c) => c.segment === segment);
      if (!child) {
        child = { segment, path: formattedPath, children: [] };
        current.children.push(child);
      }
      current = child;
    }
    return current;
  };

  for (const rawFile of files) {
    let normalized = rawFile.replace(/\\/g, "/").replace(/^(\.\/|\/)?(app\/|\/)?/, "");
    const parts = normalized.split("/").filter(Boolean);
    if (parts.length === 0) continue;

    const filename = parts[parts.length - 1];
    if (!isPageFile(filename) && !isLayoutFile(filename)) continue;

    const dirSegments = parts.slice(0, parts.length - 1);
    const targetNode = dirSegments.length === 0 ? root : getOrCreateNode(dirSegments);
    const fullVitePath = rawFile.startsWith("/") ? rawFile : `/${rawFile}`;

    if (isPageFile(filename)) targetNode.page = fullVitePath;
    else if (isLayoutFile(filename)) targetNode.layout = fullVitePath;
  }

  return root;
}
```

### 4.4 `packages/tspy/src/router/generator.ts`
Traverses the `RouteManifestNode` tree and emits clean, formatted JavaScript output for React Router:

```typescript
function generateNodeCode(node: RouteManifestNode, isRoot: boolean): string {
  if (node.layout) {
    const layoutLazy = `lazy: async () => {
      const mod = await import("${node.layout}");
      return {
        Component: () => React.createElement(TSPYLayoutAdapter, { Layout: mod.default })
      };
    }`;

    const childrenCode: string[] = [];
    if (node.page) {
      childrenCode.push(`{
        index: true,
        lazy: async () => {
          const mod = await import("${node.page}");
          return { Component: mod.default };
        }
      }`);
    }

    for (const child of node.children) {
      childrenCode.push(generateNodeCode(child, false));
    }

    return `{
      ${!isRoot && node.path ? `path: "${node.path}",` : ""}
      ${layoutLazy},
      children: [ ${childrenCode.join(",\n")} ]
    }`;
  }

  if (isRoot) {
    const rootChildren: string[] = [];
    if (node.page) {
      rootChildren.push(`{
        index: true,
        lazy: async () => {
          const mod = await import("${node.page}");
          return { Component: mod.default };
        }
      }`);
    }
    for (const child of node.children) {
      rootChildren.push(generateNodeCode(child, false));
    }
    return rootChildren.join(",\n");
  }

  const childCodes = node.children.map((c) => generateNodeCode(c, false));
  const pageLazy = node.page
    ? `lazy: async () => {
        const mod = await import("${node.page}");
        return { Component: mod.default };
      }`
    : "";

  if (node.page) {
    return `{
      path: "${node.path}",
      ${pageLazy}${childCodes.length > 0 ? `,\nchildren: [ ${childCodes.join(",\n")} ]` : ""}
    }`;
  } else {
    return `{
      path: "${node.path}",
      children: [ ${childCodes.join(",\n")} ]
    }`;
  }
}

export function generateRouteModule(manifest: RouteManifestNode): string {
  return `import React from "react";
import { TSPYLayoutAdapter } from "tspy/router";

export const routes = [
  ${generateNodeCode(manifest, true)}
];
`;
}
```

### 4.5 `packages/tspy/src/router/adapter.tsx`
Provides runtime layout wrapping without exposing React Router's `<Outlet />`:

```tsx
import React from "react";
import { Outlet } from "react-router";

export interface TSPYLayoutAdapterProps {
  Layout: React.ComponentType<{ children?: React.ReactNode }>;
}

export function TSPYLayoutAdapter({ Layout }: TSPYLayoutAdapterProps) {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
```

### 4.6 `packages/dev/src/plugins/routes.ts`
Vite plugin discovering routes via `fast-glob` and triggering HMR invalidation on filesystem watcher events:

```typescript
import { Plugin } from "vite";
import fg from "fast-glob";
import path from "node:path";
import { parseRoutes, generateRouteModule } from "tspy/router";

export function tspyRoutesPlugin(cwd: string): Plugin {
  const virtualModuleId = "virtual:tspy-routes";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  const getAppFiles = (): string[] => {
    const appDir = path.join(cwd, "app");
    try {
      const relativeFiles = fg.sync("**/{page,layout}.tsx", { cwd: appDir });
      return relativeFiles.map((f) => `/app/${f}`);
    } catch {
      return [];
    }
  };

  return {
    name: "tspy-routes",

    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        const files = getAppFiles();
        const manifest = parseRoutes(files);
        return generateRouteModule(manifest);
      }
    },

    configureServer(server) {
      const handleFileChange = (filepath: string) => {
        const normalized = filepath.replace(/\\/g, "/");
        if (
          normalized.includes("/app/") &&
          (normalized.endsWith("/page.tsx") || normalized.endsWith("/layout.tsx"))
        ) {
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws?.send({ type: "full-reload" });
          }
        }
      };

      if (server.watcher) {
        server.watcher.on("add", handleFileChange);
        server.watcher.on("unlink", handleFileChange);
      }
    },
  };
}
```

---

## 5. Route Manifest & Tree Construction Mechanics

Consider the following application filesystem structure:

```text
app/
├── layout.tsx
├── page.tsx
├── about/
│   └── page.tsx
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   └── settings/
│       └── page.tsx
└── users/
    └── [id]/
        └── page.tsx
```

### 5.1 Parsed `RouteManifestNode` Tree

Running `parseRoutes` over this structure yields:

```json
{
  "segment": "",
  "layout": "/app/layout.tsx",
  "page": "/app/page.tsx",
  "children": [
    {
      "segment": "about",
      "path": "about",
      "page": "/app/about/page.tsx",
      "children": []
    },
    {
      "segment": "dashboard",
      "path": "dashboard",
      "layout": "/app/dashboard/layout.tsx",
      "page": "/app/dashboard/page.tsx",
      "children": [
        {
          "segment": "settings",
          "path": "settings",
          "page": "/app/dashboard/settings/page.tsx",
          "children": []
        }
      ]
    },
    {
      "segment": "users",
      "path": "users",
      "children": [
        {
          "segment": "[id]",
          "path": ":id",
          "page": "/app/users/[id]/page.tsx",
          "children": []
        }
      ]
    }
  ]
}
```

### 5.2 Generated Virtual JavaScript Module (`virtual:tspy-routes`)

The code generator transforms this tree into:

```javascript
import React from "react";
import { TSPYLayoutAdapter } from "tspy/router";

export const routes = [
  {
    lazy: async () => {
      const mod = await import("/app/layout.tsx");
      return {
        Component: () => React.createElement(TSPYLayoutAdapter, { Layout: mod.default })
      };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const mod = await import("/app/page.tsx");
          return { Component: mod.default };
        }
      },
      {
        path: "about",
        lazy: async () => {
          const mod = await import("/app/about/page.tsx");
          return { Component: mod.default };
        }
      },
      {
        path: "dashboard",
        lazy: async () => {
          const mod = await import("/app/dashboard/layout.tsx");
          return {
            Component: () => React.createElement(TSPYLayoutAdapter, { Layout: mod.default })
          };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const mod = await import("/app/dashboard/page.tsx");
              return { Component: mod.default };
            }
          },
          {
            path: "settings",
            lazy: async () => {
              const mod = await import("/app/dashboard/settings/page.tsx");
              return { Component: mod.default };
            }
          }
        ]
      },
      {
        path: "users",
        children: [
          {
            path: ":id",
            lazy: async () => {
              const mod = await import("/app/users/[id]/page.tsx");
              return { Component: mod.default };
            }
          }
        ]
      }
    ]
  }
];
```

---

## 6. React Router Adaptation & Pathless Route Mechanics

### Pathless Root Layout Routes
In React Router, a route object without a `path` property acts as a pathless layout route. It wraps child routes under a visual component hierarchy without altering the URL path matching logic:

```typescript
// Pathless root layout route
{
  lazy: async () => {
    const mod = await import("/app/layout.tsx");
    return {
      Component: () => <TSPYLayoutAdapter Layout={mod.default} />
    };
  },
  children: [
    { index: true, lazy: ... },    // Matches /
    { path: "about", lazy: ... }   // Matches /about
  ]
}
```

### Relative Path Construction
Child routes use relative path strings (`"about"`, `"settings"`, `":id"`, `"*"`). React Router concatenates relative path segments along the route tree matching path:
- `/dashboard` -> Matches root layout -> Matches `dashboard` layout -> Matches `index: true` page.
- `/dashboard/settings` -> Matches root layout -> Matches `dashboard` layout -> Matches `settings` page.
- `/users/123` -> Matches root layout -> Matches `users` directory -> Matches `:id` dynamic page (`params.id = "123"`).

---

## 7. Development & Hot Module Replacement (HMR) Lifecycles

### 7.1 Server Initialization Flow
1. Developer runs `npx tspy dev` or `npm run dev`.
2. `@tspy/dev` starts Nitro server programmatically on port `3000`.
3. `@tspy/dev` starts Vite server programmatically on port `5173` with proxy for `/api` pointing to Nitro.
4. `tspyRoutesPlugin` registers virtual module resolver for `virtual:tspy-routes`.

### 7.2 File Creation Lifecycle (`add`)
1. Developer creates `app/contact/page.tsx`.
2. Vite's `server.watcher` fires `add` event.
3. `tspyRoutesPlugin` handler identifies that `/app/contact/page.tsx` is a page file.
4. Plugin fetches `\0virtual:tspy-routes` from Vite's module graph and calls `server.moduleGraph.invalidateModule(mod)`.
5. Plugin sends `{ type: "full-reload" }` websocket message to browser.
6. Browser re-fetches `virtual:tspy-routes`, instantiating the newly created `/contact` route.

### 7.3 File Deletion Lifecycle (`unlink`)
1. Developer deletes `app/contact/page.tsx`.
2. `server.watcher` fires `unlink` event.
3. `tspyRoutesPlugin` invalidates `virtual:tspy-routes`.
4. Router updates without `/contact` route.

---

## 8. Quality Assurance & Verification Suite

The TSPY routing implementation is covered by a three-tiered automated test suite:

### 8.1 Parser Unit Tests (`packages/tspy/src/router/router.test.ts`)
Validates that file path input arrays generate accurate `RouteManifestNode` trees and formatted code strings.

### 8.2 Integration Tests (`packages/tspy/src/router/integration.test.ts`)
Instantiates React Router's `createMemoryRouter` with generated route definitions to verify:
- Navigation to `/` matches root layout and index page.
- Navigation to `/users/123` extracts `params.id === "123"`.
- Navigation to `/docs/foo/bar` extracts `params["*"] === "foo/bar"`.
- Route conflict detection throws on duplicate dynamic parameters.

### 8.3 Vite Virtual Module E2E Tests (`packages/tspy/src/router/vite-e2e.test.ts`)
Launches a programmatic Vite server against a temporary test workspace (`scratch/test-app`) to verify:
- `virtual:tspy-routes` transforms into valid JS.
- HMR file creation (`app/contact/page.tsx`) invalidates and updates module output.
- HMR file deletion removes route.
- HMR nested layout addition (`app/about/layout.tsx`) updates route tree hierarchy.

---

## 9. Future Roadmap & Architectural Extensions

While the initial slice implements build-time route discovery for client-side rendering, TSPY is designed for future extension:

1. **Server-Side Rendering (SSR) & Document Layouts**: Updating `app/layout.tsx` to control `<html><body>` when Nitro handles document SSR rendering.
2. **Data Loaders (`loader`)**: Exporting `loader` functions from `page.tsx` mapped directly to React Router route loaders.
3. **Server Actions (`action`)**: Form submissions and mutations handled by backend Nitro handlers.
4. **Error Boundaries (`error.tsx`)**: Automatic route error boundary catching via React Router `ErrorBoundary`.
5. **Loading UI (`loading.tsx`)**: Suspense wrappers for lazy loading fallback UI.
