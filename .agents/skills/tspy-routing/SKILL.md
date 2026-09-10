---
name: tspy-routing
description: Architecture, conventions, and implementation patterns for TSPY's decoupled build-time filesystem routing.
---

# TSPY Routing Architecture

## Core Architectural Boundary
```text
app/ filesystem
      ↓
route discovery (Vite plugin / build-time scanner)
      ↓
RouteManifestNode tree
      ↓
route generator (JS code string builder)
      ↓
virtual:tspy-routes
      ↓
React Router (createBrowserRouter)
      ↓
lazy route modules & TSPYLayoutAdapter
      ↓
React DOM
```

## Key Principles & Conventions
1. **Build-Time Discovery Only**: Browser runtime MUST NOT scan the filesystem (`import.meta.glob` is strictly forbidden in client runtime). Route scanning is owned by `tspyRoutesPlugin`.
2. **Parser vs. Generator Separation**:
   - `parser.ts` takes flat file paths and outputs a hierarchical `RouteManifestNode` tree (`segment`, `path`, `page`, `layout`, `children`).
   - `generator.ts` traverses the `RouteManifestNode` tree and emits the JavaScript string for `virtual:tspy-routes`.
3. **Pathless Layout Routes**:
   - Layout files (e.g. `app/layout.tsx`) generate pathless layout routes in React Router (`{ lazy: ..., children: [...] }` without a `path` property).
   - Page files (e.g. `app/page.tsx`) generate index routes (`index: true`) or relative path routes (`path: "about"`).
4. **Layout API Adaptation**:
   - TSPY layout components export standard React layout functions accepting `{ children }: { children: React.ReactNode }`.
   - TSPY's runtime adapter `TSPYLayoutAdapter` (`packages/tspy/src/router/adapter.tsx`) wraps the user's layout and injects React Router's `<Outlet />` into `{ children }`.
5. **Lazy Loading Contract**:
   - Routes use React Router's `lazy` loader contract: `lazy: async () => { const mod = await import("/app/..."); return { Component: ... }; }`.
6. **Vite Watcher HMR**:
   - `tspyRoutesPlugin` attaches to `server.watcher` on `add` and `unlink` events in `/app`.
   - On route structural changes, it invalidates `virtual:tspy-routes` in Vite's module graph to trigger clean HMR.
