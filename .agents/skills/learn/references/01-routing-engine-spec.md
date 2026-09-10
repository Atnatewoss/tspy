# Chapter 1: TSPY Routing Engine Technical Specification

## 1. Overview & Architectural Boundaries

The TSPY filesystem routing engine decouples route discovery from browser runtime execution.

```text
app/ filesystem
      ↓
tspyRoutesPlugin (build/dev-time scanning via fast-glob)
      ↓
RouteManifestNode tree (parseRoutes)
      ↓
virtual:tspy-routes JavaScript string (generateRouteModule)
      ↓
React Router (createBrowserRouter)
      ↓
TSPYLayoutAdapter & Lazy Page Components
```

---

## 2. File Conventions & Matching Engine

Filesystem scanning strictly searches for two file names within the `/app` root directory:
- `page.tsx`: Defines a renderable page component.
- `layout.tsx`: Defines a layout wrapper for the directory and its subdirectories.

### Segment Transformations
1. **Static Directory / File Segments**:
   - `app/page.tsx` -> Index route (`index: true`)
   - `app/about/page.tsx` -> Segment `"about"`, path `"about"`
   - `app/dashboard/settings/page.tsx` -> Directory hierarchy `dashboard` -> `settings`

2. **Dynamic Parameter Segments**:
   - Syntax: `[paramName]`
   - Example: `app/users/[id]/page.tsx` -> Segment `"[id]"`, formatted path `":id"`
   - URL matching: `/users/123` matches `:id` and sets `useParams().id = "123"`

3. **Catch-All Wildcard Segments**:
   - Syntax: `[...slugName]`
   - Example: `app/docs/[...slug]/page.tsx` -> Segment `"[...slug]"`, formatted path `"*"`
   - URL matching: `/docs/foo/bar/baz` matches `*` and sets `useParams()["*"] = "foo/bar/baz"`

---

## 3. Conflict Detection Matrix

To prevent ambiguous route definitions, `parseRoutes` enforces dynamic parameter and catch-all exclusivity at every directory level:

| Attempted File Combination | Result | Error Reason |
| --- | --- | --- |
| `app/users/[id]/page.tsx` AND `app/users/[userId]/page.tsx` | ❌ Error | Conflicting dynamic segments `[id]` and `[userId]` at the same level |
| `app/docs/[...slug]/page.tsx` AND `app/docs/[...path]/page.tsx` | ❌ Error | Conflicting catch-all segments `[...slug]` and `[...path]` at the same level |
| `app/about/page.tsx` AND `app/about/layout.tsx` | ✅ Allowed | Layout wraps page at same segment level |
| `app/users/page.tsx` AND `app/users/[id]/page.tsx` | ✅ Allowed | Static index page alongside dynamic parameter subroute |

---

## 4. `TSPYLayoutAdapter` Mechanics

React Router uses `<Outlet />` to render nested child routes inside layout components.

In order to allow TSPY developers to write standard React layouts:

```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="layout">{children}</div>;
}
```

TSPY provides a dedicated runtime component [`TSPYLayoutAdapter`](file:///home/atnatewos/github/tspy/packages/tspy/src/router/adapter.tsx):

```tsx
import React from "react";
import { Outlet } from "react-router";

export function TSPYLayoutAdapter({ Layout }: { Layout: React.ComponentType<{ children?: React.ReactNode }> }) {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
```

In the generated virtual module, layouts are loaded dynamically and wrapped using `TSPYLayoutAdapter`:

```javascript
lazy: async () => {
  const mod = await import("/app/layout.tsx");
  return {
    Component: () => React.createElement(TSPYLayoutAdapter, { Layout: mod.default })
  };
}
```
