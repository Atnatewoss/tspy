export const GITHUB_URL = "https://github.com/Atnatewoss/tspy";

export type TocItem = { id: string; title: string };

export type SectionDef = {
  slug: string;
  title: string;
  group: string;
  intro: string;
  subsections: TocItem[];
};

export const DOCS_GROUPS = [
  { title: "Getting Started", intro: "What tspy is, how to install it, and your first project built in one command." },
  { title: "Routing & Rendering", intro: "How pages, layouts, navigation, and the client/server boundary work in a tspy project." },
  { title: "Data Fetching", intro: "How data moves between the browser, the server, and Python - and how it is cached." },
  { title: "Architecture", intro: "The stack, the conventions, and how the framework composes your project." },
  { title: "Templates", intro: "The composable template packages you add: auth, database, AI, and jobs." },
];

export const LEARN_GROUPS = [
  { title: "The Core Philosophy", intro: "What makes TSPY a meta-framework." },
  { title: "The Routing Engine", intro: "How filesystem routing works inside TSPY." },
  { title: "Build & Dev Servers", intro: "Vite, Nitro, and the CLI." },
  { title: "The Server Backend", intro: "Hono, Nitro, and edge compatibility." },
  { title: "Python Integration", intro: "AI, jobs, and the RPC boundary." },
  { title: "Application Architecture", intro: "Data, auth, and the database layer." },
];

export const DOCS_SECTION_DEFS: SectionDef[] = [
  {
    slug: "introduction",
    title: "Introduction",
    group: "Getting Started",
    intro:
      "tspy is a fullstack framework. One command builds a project where TypeScript owns the web - a React client and a Nitro server - and Python owns AI and background jobs. Everything is composed from small, independent template packages instead of baked-in boilerplate.",
    subsections: [],
  },
  {
    slug: "why-tspy",
    title: "Why tspy?",
    group: "Getting Started",
    intro:
      "The honest baseline is the glued pair - Next.js plus FastAPI in a monorepo. This page compares tspy against the field of fullstack frameworks so you can decide what the boundary is worth.",
    subsections: [
      { id: "the-field", title: "The field at a glance" },
      { id: "vs-next-remix", title: "vs Next.js, Remix, Nuxt, SvelteKit" },
      { id: "vs-wasp", title: "vs Wasp & AdonisJS" },
      { id: "vs-django", title: "vs Django & Rails & Laravel" },
      { id: "vs-glue", title: "vs Next.js + FastAPI" },
      { id: "bottom-line", title: "The bottom line" },
    ],
  },
  {
    slug: "installation",
    title: "Installation",
    group: "Getting Started",
    intro:
      "Prerequisites, the one-command generator, and what you get on disk. No global installs, no config to write by hand - the CLI composes your project from templates.",
    subsections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "create", title: "Create a project" },
      { id: "flags", title: "Choose with flags" },
      { id: "run", title: "Install and run" },
    ],
  },
  {
    slug: "quick-start",
    title: "Quick start",
    group: "Getting Started",
    intro:
      "Build a fresh tspy application sized to exactly the capabilities you need: auth, a database, AI, and background jobs. Each is chosen from a flag - and each is optional.",
    subsections: [
      { id: "interactive", title: "Run it interactively" },
      { id: "flags", title: "Flags for everything up front" },
      { id: "run", title: "Install and run" },
    ],
  },
  {
    slug: "structure",
    title: "Project structure",
    group: "Getting Started",
    intro:
      "Each capability owns a fixed top-level directory: app/ for the web client, server/ for the Nitro backend, and ai/ and jobs/ for Python - generated only for what you selected.",
    subsections: [
      { id: "app", title: "app - the web application" },
      { id: "server", title: "server - the Nitro backend" },
      { id: "ai-jobs", title: "ai and jobs - Python" },
      { id: "config", title: "Config files" },
    ],
  },
  {
    slug: "layouts-pages",
    title: "Layouts and Pages",
    group: "Routing & Rendering",
    intro:
      "Every route is a file. app/page.tsx is the index, any app/<name>/page.tsx is a URL, and app/layout.tsx wraps every route. The file system is the router - no manual registration.",
    subsections: [
      { id: "routes", title: "Pages" },
      { id: "layouts", title: "Layouts" },
      { id: "react-router", title: "Under the hood" },
    ],
  },
  {
    slug: "linking-navigating",
    title: "Linking and Navigating",
    group: "Routing & Rendering",
    intro:
      "Navigation is react-router underneath, with file-based routing on top. Use its Link and useNavigate - client-side, no page reloads, lazy-loaded route segments.",
    subsections: [
      { id: "link", title: "Link" },
      { id: "navigate", title: "Navigate" },
    ],
  },
  {
    slug: "server-client-components",
    title: "Server and Client Components",
    group: "Routing & Rendering",
    intro:
      "app/ is the client (React, CSR first, SSR planned) and server/ is the backend (Nitro + h3). The boundary is a fixed folder split, not a per-file directive.",
    subsections: [
      { id: "the-split", title: "The split" },
      { id: "client", title: "The client" },
      { id: "server", title: "The server" },
      { id: "python", title: "The Python side" },
    ],
  },
  {
    slug: "fetching-data",
    title: "Fetching Data",
    group: "Data Fetching",
    intro:
      "Data travels over /api. In development Vite proxies it to Nitro; in production Nitro serves it directly. Python functions are exposed through the generated typed RPC boundary.",
    subsections: [
      { id: "from-client", title: "From the client" },
      { id: "from-server", title: "From the server" },
      { id: "from-python", title: "From Python" },
    ],
  },
  {
    slug: "mutating-data",
    title: "Mutating Data",
    group: "Data Fetching",
    intro:
      "Forms submit to server/api endpoints where input is validated with Zod before it reaches the database or Python layer. The RPC boundary types the call both ways.",
    subsections: [
      { id: "forms", title: "Forms" },
      { id: "validation", title: "Validation" },
      { id: "to-python", title: "To Python" },
    ],
  },
  {
    slug: "caching",
    title: "Caching",
    group: "Data Fetching",
    intro:
      "The honest baseline: caching lives where the ecosystem puts it - HTTP caching in Nitro, client caching in React Query - until the framework earns a layer of its own.",
    subsections: [
      { id: "honest", title: "The honest baseline" },
      { id: "http", title: "HTTP caching" },
      { id: "client", title: "Client caching" },
    ],
  },
  {
    slug: "how-it-works",
    title: "How it works",
    group: "Architecture",
    intro:
      "The generator always applies the base template first, then each selected template in order. Files the base already created are merged; everything else is written once.",
    subsections: [
      { id: "compose", title: "Composition" },
      { id: "write-merge", title: "Write or merge" },
      { id: "dev", title: "One dev command" },
    ],
  },
  {
    slug: "conventions",
    title: "Conventions",
    group: "Architecture",
    intro:
      "How the generated project is meant to be read: the folder structure is the contract, and the framework keeps each capability in its own top-level directory.",
    subsections: [
      { id: "app", title: "app/ is the web application" },
      { id: "server", title: "server/ is the Nitro server" },
      { id: "capabilities", title: "ai/ and jobs/ are first-class" },
      { id: "independence", title: "Providers stay independent" },
    ],
  },
  {
    slug: "stack",
    title: "The stack",
    group: "Architecture",
    intro:
      "Established tools, no tspy abstractions: React and Vite for the client, Nitro for the server, and Python with the mature libraries for AI and jobs.",
    subsections: [
      { id: "client", title: "Client - React + Vite" },
      { id: "server", title: "Server - Nitro" },
      { id: "python", title: "Python - AI and jobs" },
    ],
  },
  {
    slug: "merge-strategy",
    title: "Merge strategy",
    group: "Templates",
    intro:
      "When a template writes a path that the base already created, the generator merges: package.json files deeply, pyproject.toml sections, .env.example keys, and everything else last writer wins.",
    subsections: [
      { id: "per-file", title: "Per-file strategy" },
      { id: "example", title: "Example" },
    ],
  },
  {
    slug: "auth",
    title: "Auth",
    group: "Templates",
    intro:
      "Authentication is TypeScript, under server/auth/. Each provider is a plugin package (@tspy/better-auth, @tspy/clerk, @tspy/firebase, @tspy/supabase, @tspy/workos) composed in tspy.config.ts - pick one.",
    subsections: [
      { id: "providers", title: "Providers" },
      { id: "clerk", title: "Clerk wires the client" },
      { id: "credentials", title: "Credentials" },
    ],
  },
  {
    slug: "database",
    title: "Database",
    group: "Templates",
    intro:
      "A database access layer under server/db/, chosen from a matrix: SQLite or PostgreSQL, behind Prisma, Drizzle, Kysely, or a raw driver - each a plugin package (@tspy/prisma, @tspy/drizzle, @tspy/kysely, @tspy/sql) wired in tspy.config.ts.",
    subsections: [
      { id: "matrix", title: "The matrix" },
      { id: "files", title: "What you get" },
      { id: "rules", title: "Rules" },
    ],
  },
  {
    slug: "ai",
    title: "AI (Python)",
    group: "Templates",
    intro:
      "AI capabilities are Python, under ai/. LLM providers are plugin packages (@tspy/anthropic, @tspy/openai, @tspy/google, @tspy/ollama) composed in tspy.config.ts; agents, RAG, tools, prompts, and MCP are thin, composable starting points.",
    subsections: [
      { id: "llm", title: "LLM providers" },
      { id: "capabilities", title: "Capabilities" },
    ],
  },
  {
    slug: "jobs",
    title: "Jobs (Python)",
    group: "Templates",
    intro:
      "Background jobs are Python. Each system is a plugin package (@tspy/celery, @tspy/rq, @tspy/dramatiq) composed in tspy.config.ts, with a broker: Redis or RabbitMQ.",
    subsections: [
      { id: "systems", title: "Job systems" },
      { id: "brokers", title: "Brokers" },
    ],
  },
];

export const LEARN_SECTION_DEFS: SectionDef[] = [
  // Part 1: The Core Philosophy
  {
    slug: "learn/why-a-meta-framework",
    title: "Why a meta-framework?",
    group: "The Core Philosophy",
    intro: "React, Vite, and Nitro are all excellent tools on their own. This chapter explains what a meta-framework actually adds and why TSPY is worth building on top of all three.",
    subsections: [
      { id: "what-react-gives-you", title: "What React gives you" },
      { id: "what-is-missing", title: "What is missing" },
      { id: "the-meta-framework-layer", title: "The meta-framework layer" },
      { id: "tspy-vs-nextjs", title: "TSPY vs Next.js" },
    ],
  },
  {
    slug: "learn/the-honest-baseline",
    title: "The honest baseline",
    group: "The Core Philosophy",
    intro: "The reality of TypeScript and Python today versus our shared-core ambition.",
    subsections: [
      { id: "the-status-quo", title: "The status quo" },
      { id: "the-tspy-bridge", title: "The TSPY bridge" },
    ],
  },
  // Part 2: The Routing Engine
  {
    slug: "learn/filesystem-routing",
    title: "Filesystem routing",
    group: "The Routing Engine",
    intro: "How TSPY discovers pages from the app/ directory using build-time scanning, builds a RouteManifestNode tree, generates a virtual module with lazy dynamic imports, and adapts layouts to React Router.",
    subsections: [
      { id: "the-convention", title: "The convention" },
      { id: "discovery", title: "Build-time discovery" },
      { id: "react-router", title: "virtual:tspy-routes & React Router" },
    ],
  },
  {
    slug: "learn/the-parser-and-manifest",
    title: "Parser & Manifest",
    group: "The Routing Engine",
    intro: "How RouteManifestNode is built, conflict detection, and static analysis.",
    subsections: [
      { id: "the-parser", title: "The Parser" },
      { id: "segment-transformations", title: "Segment Transformations" },
      { id: "conflicts", title: "Conflict Detection" },
    ],
  },
  {
    slug: "learn/virtual-modules",
    title: "Virtual Modules",
    group: "The Routing Engine",
    intro: "Inside virtual:tspy-routes, AST generation, and lazy loading.",
    subsections: [
      { id: "generator", title: "The Generator" },
      { id: "code-generation", title: "Code Generation" },
      { id: "lazy-loading", title: "Lazy Loading" },
    ],
  },
  {
    slug: "learn/layout-adaptation",
    title: "Layout Adaptation",
    group: "The Routing Engine",
    intro: "How layout.tsx is wrapped in TSPYLayoutAdapter and React Router outlets.",
    subsections: [
      { id: "the-mismatch", title: "The mismatch" },
      { id: "adaptation", title: "TSPYLayoutAdapter" },
      { id: "why-not-outlet", title: "Why not require Outlet?" },
    ],
  },
  // Part 3: Build & Dev Servers
  {
    slug: "learn/vite-and-nitro",
    title: "Vite and Nitro",
    group: "Build & Dev Servers",
    intro: "TSPY owns Vite and Nitro, not the other way around. This chapter covers why index.html is an internal detail, how the dev server orchestrates both runtimes, and what the Vite plugin does.",
    subsections: [
      { id: "why-no-index-html", title: "Why no index.html" },
      { id: "vite-inside-tspy", title: "Vite inside TSPY" },
      { id: "nitro-inside-tspy", title: "Nitro inside TSPY" },
    ],
  },
  {
    slug: "learn/the-dev-server",
    title: "The Dev Server",
    group: "Build & Dev Servers",
    intro: "How tspy dev orchestrates processes, proxies requests, and handles ports.",
    subsections: [
      { id: "orchestration", title: "Orchestration" },
      { id: "ports", title: "Ports" },
      { id: "proxying", title: "Proxying" },
    ],
  },
  {
    slug: "learn/hmr-and-watchers",
    title: "HMR & Watchers",
    group: "Build & Dev Servers",
    intro: "The chokidar integration, module graph invalidation, and recovering from route conflicts.",
    subsections: [
      { id: "chokidar", title: "Chokidar" },
      { id: "invalidation", title: "Invalidation" },
    ],
  },
  {
    slug: "learn/tspy-config",
    title: "tspy.config.ts",
    group: "Build & Dev Servers",
    intro: "One config file for the whole framework. This chapter covers the plugin-based config - defineConfig composes auth, database, ai, and jobs plugins into the project, and TSPY turns each into runtime exports (`api` on the client, `auth`/`db`/`ai`/`jobs` on the server).",
    subsections: [
      { id: "the-file", title: "The file" },
      { id: "plugins", title: "Plugins" },
      { id: "defineconfig", title: "defineConfig" },
      { id: "runtime", title: "Runtime exports" },
    ],
  },
  {
    slug: "learn/build-pipeline",
    title: "Build Pipeline",
    group: "Build & Dev Servers",
    intro: "The tspy build process, emitting the server bundle and client assets.",
    subsections: [
      { id: "the-build", title: "The Build" },
      { id: "one-artifact", title: "One artifact" },
      { id: "prerender", title: "Prerendering and targets" },
    ],
  },
  // Part 4: The Server Backend
  {
    slug: "learn/server-and-hono",
    title: "The Server & Hono",
    group: "The Server Backend",
    intro: "Nitro runs the HTTP server. Hono is wired inside Nitro as the request handler. Neither is exposed in the developer API. This chapter explains the abstraction boundary and why Hono was chosen over Fastify.",
    subsections: [
      { id: "nitro-and-hono", title: "Nitro and Hono" },
      { id: "why-hono", title: "Why Hono not Fastify" },
    ],
  },
  {
    slug: "learn/api-proxying",
    title: "API Proxying",
    group: "The Server Backend",
    intro: "How frontend fetches are intercepted and proxied to Nitro/Python.",
    subsections: [
      { id: "interception", title: "Interception" },
      { id: "dev-vs-prod", title: "Dev vs production" },
    ],
  },
  {
    slug: "learn/middleware-and-edge",
    title: "Middleware & Edge",
    group: "The Server Backend",
    intro: "Where middleware runs, edge compatibility, and the request lifecycle.",
    subsections: [
      { id: "middleware", title: "Middleware" },
      { id: "request-lifecycle", title: "Request lifecycle" },
      { id: "edge", title: "Edge" },
    ],
  },
  // Part 5: Python Integration
  {
    slug: "learn/python-execution-model",
    title: "Python Execution",
    group: "Python Integration",
    intro: "How the Python runtime is managed in dev and production.",
    subsections: [
      { id: "runtime", title: "Runtime" },
      { id: "dev-vs-prod", title: "Dev versus production" },
      { id: "deployment", title: "Deployment" },
    ],
  },
  {
    slug: "learn/the-rpc-boundary",
    title: "The RPC Boundary",
    group: "Python Integration",
    intro: "How TypeScript and Python communicate safely.",
    subsections: [
      { id: "communication", title: "Communication" },
      { id: "generation", title: "Generation" },
      { id: "the-contract", title: "The contract" },
    ],
  },
  {
    slug: "learn/ai-capabilities",
    title: "AI Capabilities",
    group: "Python Integration",
    intro: "Structure of the ai/ folder, LLM clients, and agent orchestration.",
    subsections: [
      { id: "structure", title: "Structure" },
      { id: "providers", title: "Providers" },
      { id: "calling", title: "Calling from the web" },
    ],
  },
  {
    slug: "learn/background-jobs",
    title: "Background Jobs",
    group: "Python Integration",
    intro: "Structure of the jobs/ folder, workers, and message brokers (Celery/Redis).",
    subsections: [
      { id: "workers", title: "Workers" },
      { id: "flow", title: "The flow" },
      { id: "why-python", title: "Why Python workers" },
    ],
  },
  // Part 6: Application Architecture
  {
    slug: "learn/data-mutations",
    title: "Data & Mutations",
    group: "Application Architecture",
    intro: "How forms and mutations travel from React to Nitro to Python.",
    subsections: [
      { id: "forms", title: "Forms" },
      { id: "validation", title: "Validation" },
      { id: "to-python", title: "To Python" },
    ],
  },
  {
    slug: "learn/auth-flow",
    title: "Auth Flow",
    group: "Application Architecture",
    intro: "How the auth templates (Clerk/Better Auth) integrate at the framework level.",
    subsections: [
      { id: "integration", title: "Integration" },
      { id: "server-side", title: "Server-side verification" },
      { id: "protecting-routes", title: "Protecting routes" },
    ],
  },
  {
    slug: "learn/database-access",
    title: "Database Access",
    group: "Application Architecture",
    intro: "The server/db matrix, Prisma/Drizzle integrations, and edge drivers.",
    subsections: [
      { id: "matrix", title: "Matrix" },
      { id: "client", title: "The client" },
      { id: "rules", title: "Rules" },
      { id: "loading", title: "Connecting at startup" },
    ],
  },
];

export const SECTION_DEFS: SectionDef[] = [...DOCS_SECTION_DEFS, ...LEARN_SECTION_DEFS];

export type NavItem = { title: string; href: string };
export type NavGroup = { title: string; items: NavItem[] };

export function buildNav(groups: { title: string; intro: string }[], defs: SectionDef[]): NavGroup[] {
  return groups.map((group) => ({
    title: group.title,
    items: defs.filter((s) => s.group === group.title).map((s) => ({
      title: s.title,
      href: s.slug.startsWith("learn/") ? `/learn/${s.slug.replace("learn/", "")}` : `/docs/${s.slug}`,
    })),
  })).filter((group) => group.items.length > 0);
}

export const DOCS_NAV: NavGroup[] = buildNav(DOCS_GROUPS, DOCS_SECTION_DEFS);
export const LEARN_NAV: NavGroup[] = buildNav(LEARN_GROUPS, LEARN_SECTION_DEFS);

export const SECTIONS: { id: string; title: string }[] = SECTION_DEFS.map(
  (s) => ({ id: s.slug, title: s.title })
);

export function sectionsFor(type: "docs" | "learn" | "all" = "all"): SectionDef[] {
  if (type === "docs") return DOCS_SECTION_DEFS;
  if (type === "learn") return LEARN_SECTION_DEFS;
  return SECTION_DEFS;
}

export function getSection(slug: string): SectionDef | undefined {
  return SECTION_DEFS.find((s) => s.slug === slug);
}

export function getAdjacent(
  slug: string,
  type: "docs" | "learn" | "all" = "all"
): {
  prev?: SectionDef;
  next?: SectionDef;
} {
  const defs = sectionsFor(type);
  const index = defs.findIndex((s) => s.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? defs[index - 1] : undefined,
    next: index < defs.length - 1 ? defs[index + 1] : undefined,
  };
}