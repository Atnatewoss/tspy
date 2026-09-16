<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/public/icon-dark.svg" />
    <img src="docs/public/icon-light.svg" alt="tspy" width="140" />
  </picture>
</p>

<h1 align="center">TSPY</h1>

<p align="center">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" /></a>
  <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D20-brightgreen" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-11-orange" />
</p>

<p align="center"><strong>TypeScript on the web. Python for intelligence. One framework.</strong></p>

---

## Why TSPY?

- **Intelligence Native**: True, first-class co-location of React UIs and Python AI models. A single directory owns the frontend route and its backend intelligence.
- **Decoupled Filesystem Routing**: Automatic, intuitive route discovery from the `app/` directory via build-time AST parsing. Zero runtime filesystem scanning.
- **Ultra-Fast Development**: Powered programmatically by Vite for instant frontend HMR and Nitro for robust cross-platform server runtimes.
- **Zero-Config Ergonomics**: No `index.html` or `nitro.config.ts`. The framework manages the build environment internally so you can focus on your product. A minimal `vite.config.ts` is generated only to enable Tailwind CSS.
- **End-to-End Type Safety**: Generated RPC boundaries mean calling a Python model from a React component is as safe as a local function call.
- **Ergonomic Layout API**: Write layouts using standard React `{ children }` composition. TSPY transparently adapts them to nested routing models.

---

## Quick Start

Create a new TSPY application in seconds:

```bash
npx create-tspy-app my-app
cd my-app
npm run dev
```

The `tspy dev` server automatically launches both the Vite frontend server and Nitro backend API server with full Hot Module Replacement (HMR).

---

## Project Structure

```text
my-app/
├── app/
│   ├── layout.tsx         # Root application layout
│   ├── page.tsx           # Home page (/)
│   ├── about/
│   │   └── page.tsx       # About page (/about)
│   └── users/
│       └── [id]/
│           └── page.tsx   # Dynamic user page (/users/:id)
├── public/                # Static public assets
├── server/
│   └── api/
│       └── health.ts      # Nitro API route (GET /api/health)
└── package.json
```

---

## Routing Conventions

| File Path | URL Route | Description |
| --- | --- | --- |
| `app/layout.tsx` | Root Shell | Wraps the root component hierarchy |
| `app/page.tsx` | `/` | Index route |
| `app/about/page.tsx` | `/about` | Static route |
| `app/users/[id]/page.tsx` | `/users/:id` | Dynamic parameter route (`params.id`) |
| `app/docs/[...slug]/page.tsx` | `/docs/*` | Catch-all wildcard route (`params["*"]`) |
| `app/dashboard/layout.tsx` | Dashboard Shell | Nested layout wrapper |
| `app/dashboard/page.tsx` | `/dashboard` | Nested index route |

### Writing a Layout

Layouts use standard React component props:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      {children}
    </div>
  );
}
```

### Writing a Page

```tsx
// app/users/[id]/page.tsx
import { useParams } from "react-router";

export default function UserPage() {
  const { id } = useParams();
  return <h1>User Profile: {id}</h1>;
}
```

---

## Framework Architecture

TSPY isolates framework concerns so that application code remains clean and standard:

```text
app/ filesystem
      ↓
TSPY route scanner (fast-glob)
      ↓
RouteManifestNode tree
      ↓
TSPY route generator
      ↓
virtual:tspy-routes
      ↓
React Router runtime & lazy route modules
      ↓
React DOM
```

---

## License

MIT