## Quick start

```bash
npx create-tspy-app@latest my-app
cd my-app
npm run dev
```

The generator asks a few questions — auth provider, database, AI, jobs —
and scaffolds a complete project. Everything is wired: the config, the
server handlers, the client bindings.

## Manual setup

If you prefer to start from scratch:

```bash
mkdir my-app && cd my-app
npm init -y
npm install tspy @tspy/dev react react-dom
npm install -D typescript @types/react
```

Create `tspy.config.ts`:

```ts tspy.config.ts
import { defineConfig } from "tspy";

export default defineConfig({
  // Add plugins as needed
});
```

Create `app/page.tsx`:

```tsx app/page.tsx
export default function Home() {
  return <h1>Hello from TSPY</h1>;
}
```

Run the dev server:

```bash
npx tspy dev
```

## What's included

- **Vite** for fast HMR and bundling
- **Nitro** for the server (API routes, middleware)
- **React Router** for client-side navigation
- **File-system routing** — pages are files, layouts wrap routes
- **TypeScript** end-to-end

## Project structure

```
my-app/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── about/
│       └── page.tsx      # /about route
├── server/
│   └── api/              # Nitro API routes
├── tspy.config.ts        # Framework config
├── package.json
└── tsconfig.json
```

## Next steps

- Read about [why TSPY](/docs/why-tspy) and the philosophy
- Understand the [project structure](/docs/structure)
- Learn about [layouts and pages](/docs/layouts-pages)
