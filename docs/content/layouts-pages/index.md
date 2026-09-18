## Pages — the file system is the router

Every route is a file. `app/page.tsx` is the index, `app/<name>/page.tsx`
is a URL, and nested folders make nested paths. No manual registration.

## Layouts wrap every route

A `app/layout.tsx` at any level wraps all the routes below it — shared
chrome, nav, providers. Nesting layouts is just nesting folders.

## Under the hood — react-router

The file system compiles to React Router's route tree. You keep the typed
`Link` and `useNavigate`, and route segments are lazy-loaded on navigation.
