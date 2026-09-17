export const GITHUB_URL = "https://github.com/Atnatewoss/tspy";

export type TocItem = { id: string; title: string; isChild?: boolean; children?: TocItem[] };

export type SidebarChild = { slug: string; title: string; children?: SidebarChild[] };

export type SectionDef = {
  slug: string;
  title: string;
  group: string;
  intro: string;
  subsections: TocItem[];
  children?: SidebarChild[];
  subcategory?: string;
};

export const DOCS_GROUPS = [
  { title: "Get Started", intro: "What tspy is, how to install it, and your first project built in one command." },
  { title: "Concepts", intro: "The core ideas: routing, rendering, data flow, architecture, and the stack." },
  { title: "Build & Dev", intro: "The dev server, build pipeline, HMR, configuration, and server architecture." },
  { title: "Integrations", intro: "Auth, database, and the composable provider packages." },
  { title: "Runtime", intro: "Cache, observability, cron, and deployment output." },
  { title: "Deployment", intro: "Ship your project to any platform." },
  { title: "CI/CD", intro: "Continuous integration and delivery pipelines." },
  { title: "Agentic Integration", intro: "AI agents, tool calling, and autonomous workflows." },
  { title: "Reference", intro: "Testing, CLI, examples, and package map." },
];

export const DOCS_SECTION_DEFS: SectionDef[] = [
  // ── Get Started ──
  {
    slug: "why-tspy",
    title: "Why?",
    group: "Get Started",
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
    title: "Getting Started",
    group: "Get Started",
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
    slug: "structure",
    title: "Project Structure",
    group: "Get Started",
    intro:
      "Each capability owns a fixed top-level directory: app/ for the web client, server/ for the Nitro backend, and ai/ and jobs/ for Python - generated only for what you selected. The folder structure is the contract.",
    subsections: [
      { id: "app", title: "app - the web application" },
      { id: "server", title: "server - the Nitro backend" },
      { id: "ai-jobs", title: "ai and jobs - Python" },
      { id: "config", title: "Config files" },
      { id: "conventions", title: "Conventions" },
    ],
  },

  // ── Concepts ──
  {
    slug: "layouts-pages",
    title: "Layouts and Pages",
    group: "Concepts",
    subcategory: "Core",
    intro:
      "Every route is a file. app/page.tsx is the index, any app/<name>/page.tsx is a URL, and app/layout.tsx wraps every route. The file system is the router - no manual registration.",
    subsections: [
      { id: "routes", title: "Pages" },
      { id: "layouts", title: "Layouts" },
      { id: "react-router", title: "Under the hood" },
    ],
  },
  {
    slug: "filesystem-routing",
    title: "Filesystem routing",
    group: "Concepts",
    subcategory: "Core",
    intro: "How TSPY discovers pages from the app/ directory using build-time scanning, builds a RouteManifestNode tree, generates a virtual module with lazy dynamic imports, and adapts layouts to React Router.",
    subsections: [
      { id: "the-convention", title: "The convention" },
      { id: "discovery", title: "Build-time discovery" },
      { id: "react-router", title: "virtual:tspy-routes & React Router" },
    ],
  },
  {
    slug: "linking-navigating",
    title: "Linking and Navigating",
    group: "Concepts",
    subcategory: "Core",
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
    group: "Concepts",
    subcategory: "Core",
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
    slug: "python-execution-model",
    title: "Python Execution",
    group: "Concepts",
    subcategory: "Core",
    intro: "How the Python runtime is managed in dev and production.",
    subsections: [
      { id: "runtime", title: "Runtime" },
      { id: "dev-vs-prod", title: "Dev versus production" },
      { id: "deployment", title: "Deployment" },
    ],
  },
  {
    slug: "the-rpc-boundary",
    title: "The RPC Boundary",
    group: "Concepts",
    subcategory: "Core",
    intro: "How TypeScript and Python communicate safely.",
    subsections: [
      { id: "communication", title: "Communication" },
      { id: "generation", title: "Generation" },
      { id: "the-contract", title: "The contract" },
    ],
  },
  {
    slug: "fetching-data",
    title: "Fetching Data",
    group: "Concepts",
    subcategory: "Data & APIs",
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
    group: "Concepts",
    subcategory: "Data & APIs",
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
    group: "Concepts",
    subcategory: "Data & APIs",
    intro:
      "The honest baseline: caching lives where the ecosystem puts it - HTTP caching in Nitro, client caching in React Query - until the framework earns a layer of its own.",
    subsections: [
      { id: "honest", title: "The honest baseline" },
      { id: "http", title: "HTTP caching" },
      { id: "client", title: "Client caching" },
    ],
  },
  {
    slug: "ai-capabilities",
    title: "AI Capabilities",
    group: "Concepts",
    subcategory: "Integrations",
    intro: "Structure of the ai/ folder, LLM clients, and agent orchestration.",
    subsections: [
      { id: "structure", title: "Structure" },
      { id: "providers", title: "Providers" },
      { id: "calling", title: "Calling from the web" },
    ],
  },
  {
    slug: "background-jobs",
    title: "Background Jobs",
    group: "Concepts",
    subcategory: "Integrations",
    intro: "Structure of the jobs/ folder, workers, and message brokers (Celery/Redis).",
    subsections: [
      { id: "workers", title: "Workers" },
      { id: "flow", title: "The flow" },
      { id: "why-python", title: "Why Python workers" },
    ],
  },

  // ── Build & Dev ──
  {
    slug: "vite-and-nitro",
    title: "Vite and Nitro",
    group: "Build & Dev",
    intro: "TSPY owns Vite and Nitro, not the other way around. This chapter covers why index.html is an internal detail, how the dev server orchestrates both runtimes, and what the Vite plugin does.",
    subsections: [
      { id: "why-no-index-html", title: "Why no index.html" },
      { id: "vite-inside-tspy", title: "Vite inside TSPY" },
      { id: "nitro-inside-tspy", title: "Nitro inside TSPY" },
    ],
  },
  {
    slug: "the-dev-server",
    title: "The Dev Server",
    group: "Build & Dev",
    intro: "How tspy dev orchestrates processes, proxies requests, and handles ports.",
    subsections: [
      { id: "orchestration", title: "Orchestration" },
      { id: "ports", title: "Ports" },
      { id: "proxying", title: "Proxying" },
    ],
  },
  {
    slug: "hmr-and-watchers",
    title: "HMR & Watchers",
    group: "Build & Dev",
    intro: "The chokidar integration, module graph invalidation, and recovering from route conflicts.",
    subsections: [
      { id: "chokidar", title: "Chokidar" },
      { id: "invalidation", title: "Invalidation" },
    ],
  },
  {
    slug: "tspy-config",
    title: "Configuration",
    group: "Get Started",
    intro: "One config file for the whole framework. This chapter covers the plugin-based config - defineConfig composes auth, database, ai, and jobs plugins into the project, and TSPY turns each into runtime exports (`api` on the client, `auth`/`db`/`ai`/`jobs` on the server).",
    subsections: [
      { id: "the-file", title: "The file" },
      { id: "plugins", title: "Plugins" },
      { id: "defineconfig", title: "defineConfig" },
      { id: "runtime", title: "Runtime exports" },
    ],
  },
  {
    slug: "build-pipeline",
    title: "Build Pipeline",
    group: "Build & Dev",
    intro: "The tspy build process, emitting the server bundle and client assets.",
    subsections: [
      { id: "the-build", title: "The Build" },
      { id: "one-artifact", title: "One artifact" },
      { id: "prerender", title: "Prerendering and targets" },
    ],
  },
  {
    slug: "the-parser-and-manifest",
    title: "Parser & Manifest",
    group: "Build & Dev",
    intro: "How RouteManifestNode is built, conflict detection, and static analysis.",
    subsections: [
      { id: "the-parser", title: "The Parser" },
      { id: "segment-transformations", title: "Segment Transformations" },
      { id: "conflicts", title: "Conflict Detection" },
    ],
  },
  {
    slug: "virtual-modules",
    title: "Virtual Modules",
    group: "Build & Dev",
    intro: "Inside virtual:tspy-routes, AST generation, and lazy loading.",
    subsections: [
      { id: "generator", title: "The Generator" },
      { id: "code-generation", title: "Code Generation" },
      { id: "lazy-loading", title: "Lazy Loading" },
    ],
  },
  {
    slug: "layout-adaptation",
    title: "Layout Adaptation",
    group: "Build & Dev",
    intro: "How layout.tsx is wrapped in TSPYLayoutAdapter and React Router outlets.",
    subsections: [
      { id: "the-mismatch", title: "The mismatch" },
      { id: "adaptation", title: "TSPYLayoutAdapter" },
      { id: "why-not-outlet", title: "Why not require Outlet?" },
    ],
  },
  {
    slug: "how-it-works",
    title: "How it works",
    group: "Build & Dev",
    intro:
      "The generator always applies the base template first, then each selected template in order. Files the base already created are merged; everything else is written once.",
    subsections: [
      { id: "compose", title: "Composition" },
      { id: "write-merge", title: "Write or merge" },
      { id: "dev", title: "One dev command" },
    ],
  },

  // ── Build & Dev (Server & API) ──
  {
    slug: "server-and-hono",
    title: "The Server & Hono",
    group: "Build & Dev",
    intro: "Nitro runs the HTTP server. Hono is wired inside Nitro as the request handler. Neither is exposed in the developer API. This chapter explains the abstraction boundary and why Hono was chosen over Fastify.",
    subsections: [
      { id: "nitro-and-hono", title: "Nitro and Hono" },
      { id: "why-hono", title: "Why Hono not Fastify" },
    ],
  },
  {
    slug: "api-proxying",
    title: "API Proxying",
    group: "Build & Dev",
    intro: "How frontend fetches are intercepted and proxied to Nitro/Python.",
    subsections: [
      { id: "interception", title: "Interception" },
      { id: "dev-vs-prod", title: "Dev vs production" },
    ],
  },
  {
    slug: "middleware-and-edge",
    title: "Middleware & Edge",
    group: "Build & Dev",
    intro: "Where middleware runs, edge compatibility, and the request lifecycle.",
    subsections: [
      { id: "middleware", title: "Middleware" },
      { id: "request-lifecycle", title: "Request lifecycle" },
      { id: "edge", title: "Edge" },
    ],
  },

  // ── Concepts (Python Integration) ──

  // ── Integrations ──
  {
    slug: "integrations-overview",
    title: "Overview",
    group: "Integrations",
    intro:
      "Register services once, get typed callers, providers, middleware, and database models. tspy integrations are plugin packages composed in tspy.config.ts.",
    subsections: [],
  },
  {
    slug: "auth",
    title: "Auth",
    group: "Integrations",
    intro:
      "Authentication is TypeScript, under server/auth/. Each provider is a plugin package (@tspy/better-auth, @tspy/clerk, @tspy/firebase, @tspy/supabase, @tspy/workos) composed in tspy.config.ts - pick one.",
    subsections: [
      { id: "providers", title: "Providers" },
      { id: "server-side", title: "Server-side verification" },
      { id: "protecting-routes", title: "Protecting routes" },
      { id: "clerk", title: "Clerk wires the client" },
      { id: "credentials", title: "Credentials" },
    ],
    children: [
      { slug: "auth/better-auth", title: "Better Auth" },
      { slug: "auth/clerk-provider", title: "Clerk" },
      { slug: "auth/firebase-provider", title: "Firebase" },
      { slug: "auth/supabase-provider", title: "Supabase" },
      { slug: "auth/workos-provider", title: "WorkOS" },
    ],
  },
  {
    slug: "database",
    title: "Database",
    group: "Integrations",
    intro:
      "The database layer is a plugin package composed in tspy.config.ts. Engine and access layer are chosen independently — Prisma, Drizzle, Kysely, or raw SQL, with SQLite or PostgreSQL.",
    subsections: [
      { id: "matrix", title: "The matrix" },
      { id: "client", title: "The client" },
      { id: "rules", title: "Rules" },
      { id: "loading", title: "Connecting at startup" },
    ],
    children: [
      { slug: "database/prisma-provider", title: "Prisma" },
      { slug: "database/drizzle-provider", title: "Drizzle" },
      { slug: "database/kysely-provider", title: "Kysely" },
      { slug: "database/sql-provider", title: "Raw SQL" },
    ],
  },
  {
    slug: "ai",
    title: "AI",
    group: "Integrations",
    intro:
      "AI capabilities are Python, under ai/. LLM providers are plugin packages (@tspy/anthropic, @tspy/openai, @tspy/google, @tspy/ollama) composed in tspy.config.ts; agents, RAG, tools, prompts, and MCP are thin, composable starting points.",
    subsections: [
      { id: "llm", title: "LLM providers" },
      { id: "capabilities", title: "Capabilities" },
    ],
    children: [
      { slug: "ai/agents", title: "Agents" },
      { slug: "ai/llm", title: "LLM" },
      { slug: "ai/mcp", title: "MCP" },
      { slug: "ai/prompts", title: "Prompts" },
      { slug: "ai/rag", title: "RAG" },
    ],
  },
  {
    slug: "jobs",
    title: "Jobs",
    group: "Integrations",
    intro:
      "Background jobs are Python. Each system is a plugin package (@tspy/celery, @tspy/rq, @tspy/dramatiq) composed in tspy.config.ts, with a broker: Redis or RabbitMQ.",
    subsections: [
      { id: "systems", title: "Job systems" },
      { id: "brokers", title: "Brokers" },
    ],
    children: [
      { slug: "jobs/celery-provider", title: "Celery" },
      { slug: "jobs/rq-provider", title: "RQ" },
      { slug: "jobs/dramatiq-provider", title: "Dramatiq" },
    ],
  },
  {
    slug: "merge-strategy",
    title: "Merge strategy",
    group: "Build & Dev",
    intro:
      "When a template writes a path that the base already created, the generator merges: package.json files deeply, pyproject.toml sections, .env.example keys, and everything else last writer wins.",
    subsections: [
      { id: "per-file", title: "Per-file strategy" },
      { id: "example", title: "Example" },
    ],
  },

  // ── Runtime ──
  {
    slug: "runtime-overview",
    title: "Overview",
    group: "Runtime",
    intro:
      "Cache, observability, cron, and deployment output — the runtime layer that sits between your code and the platform.",
    subsections: [],
  },

  // ── Deployment ──
  {
    slug: "deployment",
    title: "Overview",
    group: "Deployment",
    intro:
      "tspy projects build to a standard .output/ directory via Nitro. One build, deploy anywhere — Node.js, Cloudflare Workers, Vercel, Deno, or Bun. Nitro presets carry over unchanged.",
    subsections: [
      { id: "build-output", title: "Build output" },
      { id: "nitro-presets", title: "Nitro presets" },
      { id: "platforms", title: "Supported platforms", children: [
        { id: "platform-vercel", title: "Vercel" },
        { id: "platform-netlify", title: "Netlify" },
        { id: "platform-cloudflare", title: "Cloudflare Workers" },
        { id: "platform-aws", title: "AWS" },
        { id: "platform-deno", title: "Deno Deploy" },
        { id: "platform-node", title: "Node.js / Docker" },
      ]},
    ],
  },

  // ── CI/CD ──
  {
    slug: "ci-cd",
    title: "Overview",
    group: "CI/CD",
    intro:
      "Set up continuous integration and delivery for your tspy project. GitHub Actions, testing, and deployment pipelines.",
    subsections: [],
  },

  // ── Agentic Integration ──
  {
    slug: "agentic-integration",
    title: "Overview",
    group: "Agentic Integration",
    intro:
      "Build AI agents that act autonomously — tool calling, MCP integration, multi-step workflows, and human-in-the-loop patterns.",
    subsections: [],
  },

  // ── Reference ──
  {
    slug: "stack",
    title: "The stack",
    group: "Reference",
    intro:
      "Established tools, no tspy abstractions: React and Vite for the client, Nitro for the server, and Python with the mature libraries for AI and jobs.",
    subsections: [
      { id: "client", title: "Client - React + Vite" },
      { id: "server", title: "Server - Nitro" },
      { id: "python", title: "Python - AI and jobs" },
    ],
  },
  {
    slug: "testing",
    title: "Testing",
    group: "Reference",
    intro:
      "Unit tests, integration tests, and end-to-end testing for your tspy project.",
    subsections: [],
  },
  {
    slug: "cli",
    title: "CLI",
    group: "Reference",
    intro:
      "The tspy CLI commands: dev, build, and more.",
    subsections: [],
  },
  {
    slug: "examples",
    title: "Examples",
    group: "Reference",
    intro:
      "Example projects demonstrating routing, auth, database, AI, and API patterns.",
    subsections: [],
  },
  {
    slug: "reference",
    title: "Package Reference",
    group: "Reference",
    intro:
      "A compact map of the main package exports and where to learn more.",
    subsections: [],
  },
];

export type NavItem = { title: string; href: string; isChild?: boolean; children?: NavItem[] };
export type NavGroup = { title: string; items: NavItem[] };

export function buildNav(groups: { title: string; intro: string }[], defs: SectionDef[]): NavGroup[] {
  // Collect all slugs that appear as children of any section
  const childSlugs = new Set<string>();
  function collectChildSlugs(children?: SidebarChild[]) {
    for (const c of children ?? []) {
      childSlugs.add(c.slug);
      collectChildSlugs(c.children);
    }
  }
  for (const s of defs) {
    collectChildSlugs(s.children);
  }

  return groups.map((group) => {
    const groupDefs = defs
      .filter((s) => s.group === group.title && !childSlugs.has(s.slug));

    // Check if any section in this group has subcategories
    const hasSubcategories = groupDefs.some((s) => s.subcategory);

    if (!hasSubcategories) {
      // No subcategories — flat list (original behavior)
      return {
        title: group.title,
        items: groupDefs.flatMap((s) => {
          const main = { title: s.title, href: `/docs/${s.slug}` };
          const kids = (s.children ?? []).map((c) => {
            const item: NavItem = {
              title: c.title,
              href: `/docs/${c.slug}`,
              isChild: true as const,
            };
            if (c.children && c.children.length > 0) {
              item.children = c.children.map((gc) => ({
                title: gc.title,
                href: `/docs/${gc.slug}`,
                isChild: true as const,
              }));
            }
            return item;
          });
          return [main, ...kids];
        }),
      };
    }

    // Group by subcategory
    const subcategoryMap = new Map<string, SectionDef[]>();
    for (const s of groupDefs) {
      const sub = s.subcategory ?? "Other";
      if (!subcategoryMap.has(sub)) {
        subcategoryMap.set(sub, []);
      }
      subcategoryMap.get(sub)!.push(s);
    }

    const items: NavItem[] = [];
    for (const [subcategory, sections] of subcategoryMap) {
      if (subcategory === "Other") {
        for (const s of sections) {
          const item: NavItem = {
            title: s.title,
            href: `/docs/${s.slug}`,
          };
          if (s.children && s.children.length > 0) {
            item.children = s.children.map((c) => {
              const kid: NavItem = {
                title: c.title,
                href: `/docs/${c.slug}`,
                isChild: true as const,
              };
              if (c.children && c.children.length > 0) {
                kid.children = c.children.map((gc) => ({
                  title: gc.title,
                  href: `/docs/${gc.slug}`,
                  isChild: true as const,
                }));
              }
              return kid;
            });
          }
          items.push(item);
        }
      } else {
        const children: NavItem[] = sections.flatMap((s) => {
          const main = { title: s.title, href: `/docs/${s.slug}`, isChild: true as const };
          const kids = (s.children ?? []).map((c) => {
            const item: NavItem = {
              title: c.title,
              href: `/docs/${c.slug}`,
              isChild: true as const,
            };
            if (c.children && c.children.length > 0) {
              item.children = c.children.map((gc) => ({
                title: gc.title,
                href: `/docs/${gc.slug}`,
                isChild: true as const,
              }));
            }
            return item;
          });
          return [main, ...kids];
        });

        items.push({
          title: subcategory,
          href: "",
          children,
        });
      }
    }

    return { title: group.title, items };
  }).filter((group) => group.items.length > 0);
}

export const DOCS_NAV: NavGroup[] = buildNav(DOCS_GROUPS, DOCS_SECTION_DEFS);

export const SECTIONS: { id: string; title: string }[] = DOCS_SECTION_DEFS.map(
  (s) => ({ id: s.slug, title: s.title })
);

/** Flat list of all child/grandchild SectionDef-compatible objects. */
function buildChildDefs(defs: SectionDef[]): SectionDef[] {
  const out: SectionDef[] = [];
  function walk(children: SidebarChild[], group: string, parentTitle: string) {
    for (const c of children) {
      out.push({
        slug: c.slug,
        title: c.title,
        group,
        intro: "",
        subsections: [],
        // store parent title so breadcrumb knows it
        subcategory: parentTitle,
      });
      if (c.children) walk(c.children, group, c.title);
    }
  }
  for (const s of defs) {
    if (s.children) walk(s.children, s.group, s.title);
  }
  return out;
}

export const CHILD_DEFS: SectionDef[] = buildChildDefs(DOCS_SECTION_DEFS);

/** All routable sections (parent + child pages). */
export function sectionsFor(_type: "docs" | "all" = "all"): SectionDef[] {
  return [...DOCS_SECTION_DEFS, ...CHILD_DEFS];
}

export function getSection(slug: string): SectionDef | undefined {
  return DOCS_SECTION_DEFS.find((s) => s.slug === slug)
    ?? CHILD_DEFS.find((s) => s.slug === slug);
}

export function getAdjacent(
  slug: string,
  _type: "docs" | "all" = "all"
): {
  prev?: SectionDef;
  next?: SectionDef;
} {
  const all = [...DOCS_SECTION_DEFS, ...CHILD_DEFS];
  const index = all.findIndex((s) => s.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? all[index - 1] : undefined,
    next: index < all.length - 1 ? all[index + 1] : undefined,
  };
}
