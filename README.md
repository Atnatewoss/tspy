# TSPY

The full-stack React framework for the AI era: React UI and Python intelligence in one codebase.

TSPY is an early-stage full-stack web framework. It owns the `app/` route directory, generates a typed client/server boundary at build time, and composes small plugin packages for AI providers, authentication, databases, and background jobs instead of baking combinations into a scaffold. React runs the UI, Nitro runs the server, and Python runs the intelligence.

> TSPY is in development. Public APIs may change before 1.0.

## Why TSPY?

- **Intelligence native.** Co-locate a React route with its Python AI model. Python capabilities live under `ai/` in the same project, and calling a model from a React component is as type-safe as a local function call.
- **Decoupled filesystem routing.** Routes are discovered from `app/` by a build-time AST parser and compiled into a `RouteManifestNode` tree. No runtime filesystem scanning, no central route registry.
- **Fast feedback.** Vite drives instant frontend HMR while Nitro provides the production server runtime, so development stays lightweight and production output stays portable.
- **Type-safe boundaries.** Generated RPC contracts make server handlers, queries, and Python model calls fail at build or type-check time when they drift from the implementation.
- **Zero-config ergonomics.** No `index.html`, no `nitro.config.ts`. The build environment is managed internally; a minimal `vite.config.ts` is only generated when Tailwind is enabled.
- **Composable capabilities.** Auth, databases, background jobs, and LLM providers are opt-in plugins composed in `tspy.config.ts`. Capabilities you do not select add no runtime cost.

## Quick start

Create a new TSPY application:

```bash
npx create-tspy-app my-app
cd my-app
npm run dev
```

`tspy dev` starts the Vite frontend server and the Nitro API server together with full hot module replacement (HMR).

## Documentation

Guides and API reference live at [tspy.dev](https://tspy.dev):

- Filesystem routing and the RPC boundary
- AI capabilities and LLM providers
- Authentication, databases, and background jobs
- Middleware, edge features, and deployment

## Project structure

```text
my-app/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page (/)
├── ai/                     # Python intelligence (present when AI is enabled)
│   └── llm.py
├── server/
│   └── api/
│       └── health.ts       # Nitro + Hono API route (GET /api/health)
├── public/                 # Static assets
└── package.json
```

## Routing conventions

| File path | URL | Description |
| --- | --- | --- |
| `app/layout.tsx` | - | Root layout wrapping the application |
| `app/page.tsx` | `/` | Index route |
| `app/about/page.tsx` | `/about` | Static route |
| `app/users/[id]/page.tsx` | `/users/:id` | Dynamic route (`params.id`) |
| `app/docs/[...slug]/page.tsx` | `/docs/*` | Catch-all route (`params["*"]`) |
| `app/dashboard/layout.tsx` | `/dashboard` | Nested layout |

### Writing a layout

Layouts are standard React components using children composition:

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

### Writing a page

```tsx
// app/users/[id]/page.tsx
import { useParams } from "react-router";

export default function UserPage() {
  const { id } = useParams();
  return <h1>User Profile: {id}</h1>;
}
```

## Integrations

Capability plugins ship as separate `@tspy/*` packages and are composed under keys in `tspy.config.ts`:

| Category | Packages | Docs |
| --- | --- | --- |
| AI providers | `@tspy/anthropic`, `@tspy/google`, `@tspy/ollama`, `@tspy/openai` | [tspy.dev/docs/ai](https://tspy.dev/docs/ai) |
| Authentication | `@tspy/better-auth`, `@tspy/clerk`, `@tspy/firebase`, `@tspy/supabase`, `@tspy/workos` | [tspy.dev/docs/auth](https://tspy.dev/docs/auth) |
| Databases | `@tspy/drizzle`, `@tspy/kysely`, `@tspy/prisma`, `@tspy/sql` | [tspy.dev/docs/database](https://tspy.dev/docs/database) |
| Background jobs | `@tspy/celery`, `@tspy/dramatiq`, `@tspy/rq` | [tspy.dev/docs/jobs](https://tspy.dev/docs/jobs) |

Deployment is handled through Nitro presets for Node.js/Docker, Vercel, Netlify, Cloudflare Workers, Deno Deploy, Fly.io, Railway, Render, and AWS Lambda. See [tspy.dev/docs/deployment](https://tspy.dev/docs/deployment).

## Architecture

TSPY isolates framework concerns so application code stays clean and standard. Routes are discovered from `app/` at build time and compiled into a React Router tree, while `server/api` handlers are compiled into a Hono router with a generated, type-safe RPC client.

```text
app/ filesystem -> route scanner -> RouteManifestNode -> generator -> virtual:tspy-routes -> React Router -> React DOM
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full package map, request flow, design principles, and key components.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, workflow, and commit conventions. Report security issues via [SECURITY.md](SECURITY.md).

## License

MIT