## Hot Module Replacement

Vite's HMR updates your code in the browser without a full page reload.
Change a component, see the result instantly.

TSPY extends HMR to:

- **Route files** — adding/removing `page.tsx` updates the router
- **Layout files** — changing `layout.tsx` updates all child routes
- **Server files** — API changes are reflected immediately

## Watchers

The dev server watches for filesystem changes:

- `app/**/page.tsx` — route changes
- `app/**/layout.tsx` — layout changes
- `server/**/*.ts` — API changes
- `ai/**/*.py` — Python changes (restarts Python process)

When a file is added or removed, the virtual route module is invalidated
and the browser reloads the router.
