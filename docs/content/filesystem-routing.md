## The convention

Routes are files. Every `page.tsx` becomes a URL. Every `layout.tsx`
wraps the routes below it. The file system is the router — no manual
registration needed.

```
app/
├── page.tsx              → /
├── layout.tsx            → wraps all pages
├── about/
│   └── page.tsx          → /about
├── blog/
│   ├── layout.tsx        → wraps /blog/* routes
│   ├── page.tsx          → /blog
│   └── [slug]/
│       └── page.tsx      → /blog/:slug
```

## Build-time discovery

When you run `tspy dev` or `tspy build`, the framework scans `app/` for
page and layout files. It builds a route tree — a pure data structure
that maps file paths to URL patterns.

This happens at build time. The browser never scans the filesystem.

## virtual:tspy-routes & React Router

The route tree compiles to a virtual module (`virtual:tspy-routes`) that
React Router consumes. Each route becomes a lazy-loaded component:

```ts
// Generated (simplified)
export const routes = [
  {
    path: "/",
    lazy: async () => import("/app/page.tsx"),
    children: [
      { path: "about", lazy: async () => import("/app/about/page.tsx") },
      { path: "blog/:slug", lazy: async () => import("/app/blog/[slug]/page.tsx") },
    ],
  },
];
```

Navigation is client-side. Segments load on demand. No full-page reloads.
