## The parser

The route parser scans `app/` at build time. It reads page and layout
files, detects dynamic segments (`[id]`), and builds a route tree.

```ts
// Input: file paths
["app/page.tsx", "app/about/page.tsx", "app/users/[id]/page.tsx"]

// Output: route tree
{
  path: "/",
  children: [
    { path: "about" },
    { path: "users/:id" },
  ]
}
```

## The manifest

The parser produces a `RouteManifestNode` — a pure data structure that
describes your routes. No JavaScript strings, no code generation at this
stage.

```ts
interface RouteManifestNode {
  segment: string;       // "users", "[id]", ""
  path?: string;         // "users", ":id", ""
  page?: string;         // absolute file path
  layout?: string;       // absolute file path
  children: RouteManifestNode[];
}
```

## Code generation

A separate generator transforms the manifest into JavaScript code that
React Router consumes. Each route becomes a lazy-loaded component:

```ts
{
  path: "users/:id",
  lazy: async () => import("/app/users/[id]/page.tsx"),
}
```

The generated code is clean, readable, and debuggable.
