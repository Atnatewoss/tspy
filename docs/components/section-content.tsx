import Link from "next/link";
import { LEARN_CONTENT } from "./learn";
import {
  highlightCode,
  inferLang,
  type CodeLang,
} from "@/lib/highlight";

export function H3({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      id={id}
      className="mt-10 scroll-mt-24 text-lg font-semibold tracking-tight first:mt-0"
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="my-4 leading-7 text-muted-foreground">{children}</p>;
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-foreground">{children}</strong>;
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground">
      {children}
    </code>
  );
}

export async function CodeBlock({
  title,
  file,
  lang,
  children,
}: {
  title?: string;
  file?: string;
  lang?: CodeLang;
  children: string;
}) {
  const code = String(children).replace(/^\n/, "").replace(/\s+$/, "");
  const res = await highlightCode(code, lang ?? inferLang(file));
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-border text-left">
      {(title || file) && (
        <figcaption className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5 font-mono text-xs text-muted-foreground">
          {title && <span>{title}</span>}
          {file && <span>{file}</span>}
        </figcaption>
      )}
      <pre className="shiki-block overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-foreground">
        <code className="grid">
          {res.lines.map((line, i) => (
            <span key={i} className="line">
              {line.tokens.map((token, j) => (
                <span key={j} style={token.style}>
                  {token.content}
                </span>
              ))}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-3 rounded-xl border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
      <span className="mt-0.5 shrink-0 text-muted-foreground">&#9432;</span>
      <div>{children}</div>
    </div>
  );
}

export function Ol({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="my-4 list-decimal space-y-2 pl-5 leading-7 text-muted-foreground marker:font-medium marker:text-foreground/40">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}

export function Checklist({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 leading-7 text-muted-foreground">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-muted-foreground">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 align-top leading-6">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-medium text-foreground underline underline-offset-4"
    >
      {children}
    </Link>
  );
}

export function SectionContent({ slug }: { slug: string }) {
  return CONTENT[slug] ?? null;
}

const CONTENT: Record<string, React.ReactNode> = {
  introduction: (
    <>
      <P>
        The web runs on TypeScript. Intelligence runs on Python. They do not
        share a runtime, and no amount of glue makes them feel like one thing -
        because the folder says one project while the architecture says two.
      </P>
      <P>
        tspy is a fullstack framework that makes the pair native. TypeScript
        owns the web surface: the React client, the routes, the Nitro server.
        Python owns the intelligence layer: AI, agents, RAG, and background
        jobs. One command builds both into a single project:
      </P>
      <CodeBlock>
{`$ npx create-tspy-app@latest my-app`}
      </CodeBlock>
      <P>
        The framework wires the two halves together with a typed contract. What
        Python exposes is importable from TypeScript with real types, validated
        on every call - not through untyped JSON you have to trust.
      </P>

      <H3 id="model">One project, both worlds</H3>
      <P>
        A framework is a pair of ecosystems. The web ecosystem
        is TypeScript. The intelligence ecosystem is Python. This framework is
        built on top of both, the way Next.js is built on top of React - it
        does not replace either language; it frames them as one project.
      </P>
      <P>
        The folder is the mental model. A feature is one directory on the web
        surface, and the intelligence it needs lives in the same place, in
        Python, imported by its real name:
      </P>
      <CodeBlock file="app/page-one/">
{`page.tsx           # the web surface (TypeScript)
server_actions.py  # the intelligence (Python)`}
      </CodeBlock>
      <P>
        The names line up because the framework put them there: one route, one
        directory, two worlds already connected. You think in one feature at a
        time, not in two repositories.
      </P>
      <Callout>
        The runtime stays honest: one public development origin, with Vite and
        Nitro kept as internal subsystems. The implementation can grow toward a
        compiler when the application model proves what needs compiling.
      </Callout>

      <H3 id="boundary">The boundary is the product</H3>
      <P>
        In a glued pair, the boundary is where everything degrades: stubs,
        duplicate types, drifting schemas, untyped JSON. In this framework the
        boundary is the thing being sold - a typed contract generated from one
        definition, checked both ways, no hand-written glue. pyrpc already
        ships this layer.
      </P>

      <H3 id="generators">Generators</H3>
      <P>
        <Code>tspy generate</Code> scaffolds a feature end to end: the route,
        the Python behind it, the contract between them. One definition, both
        sides. The generator is the on-ramp that makes the co-located model as
        easy to start as it is to read.
      </P>

      <H3 id="baseline">The honest baseline</H3>
      <P>
        This framework is only worth building if it raises the baseline beyond{" "}
        &ldquo;Next.js plus FastAPI in a monorepo&rdquo;. A meta-framework earns
        its name by owning the boundary the glue only papered over - that is
        the whole project. Reaching for it,{" "}
        <A href="/docs/why-tspy">see why tspy</A>.
      </P>
    </>
  ),

  "why-tspy": (
    <>
      <P>
        A framework is only worth it if it raises the baseline. For tspy that
        baseline is explicit: you could already wire React, a Nitro server, and
        a FastAPI service together by hand. This page compares tspy against the
        fullstack field - and honestly, against the glued pair - so you can
        decide what the boundary is worth.
      </P>

      <H3 id="the-field">The field at a glance</H3>
      <Table
        head={["", "Web surface", "Intelligence (AI)", "Jobs", "The seam"]}
        rows={[
          [<Strong key="t">tspy</Strong>, <Code key="w">React · Vite · Nitro</Code>, <Code key="a">Python, native</Code>, <Code key="j">Python, native</Code>, <Code key="s">typed, generated</Code>],
          [<Strong key="n">Next.js</Strong>, "React · App Router (RSC)", "SDK add-ons", "Vercel cron / platform", "one TS runtime"],
          [<Strong key="r">Remix</Strong>, "React · full-stack loaders", "SDK add-ons", "server functions", "one TS runtime"],
          [<Strong key="nu">Nuxt</Strong>, "Vue · Nitro", "modules", "scheduled tasks", "one TS runtime"],
          [<Strong key="s">SvelteKit</Strong>, "Svelte · Vite", "add-ons", "adapters", "one TS runtime"],
          [<Strong key="w">Astro</Strong>, "Astro · islands", "no built-in", "no built-in", "static-first"],
          [<Strong key="r">Ruby on Rails</Strong>, "Rails · Hotwire / API", "gems", "Active Job + Sidekiq", "one Ruby runtime"],
          [<Strong key="d">Django</Strong>, "Django · templates / DRF", "libraries", "Celery", "one Python runtime"],
          [<Strong key="l">Laravel</Strong>, "Laravel · Blade / Inertia", "packages", "queues", "one PHP runtime"],
          [<Strong key="a">AdonisJS</Strong>, "Adonis · TS fullstack", "packages", "queues (BullMQ)", "one TS runtime"],
          [<Strong key="w2">Wasp</Strong>, "React · Node · Prisma", "add-ons", "built-in jobs", "one TS runtime"],
        ]}
      />
      <P>
        Two observations fall out. First, the field splits into two camps:
        single-runtime fullstack frameworks, and everything else. Second, every
        one of them treats the intelligence layer - AI, agents, workers - as an
        add-on for a single language. tspy is the one framework that starts
        from the other world and makes it first class instead of optional.
      </P>

      <H3 id="vs-next-remix">vs Next.js, Remix, Nuxt, SvelteKit</H3>
      <P>
        The four big TS meta-frameworks solved the same problem Next.js solved
        in 2016: they own the web wiring so you can ship without fighting
        config. Next.js leads with React + App Router and server components.
        Remix builds the same idea around data loaders and forms. Nuxt and
        SvelteKit do it for Vue and Svelte.
      </P>
      <P>
        For all of them, the intelligence story is an add-on. Your agent is a
        library call inside a single-language app, and when the job needs to
        run Python, you are back to glue: a service, an HTTP endpoint, untyped
        JSON. tspy does not compete on the web wiring - a React + Vite +
        Nitro base is a fair, modern stack - it competes on making{" "}
        <Strong>Python a first-class citizen</Strong> from the first command.
        AI and jobs are not a package you bolt on; they are the reason the
        framework exists.
      </P>
      <P>
        That is also why these compete in a different place than tspy. If your
        product is a form and a database, Next.js is genuinely excellent and
        you should use it. If your product is the intelligence - anything an
        agent produces - tspy is the one where that is the native model.
      </P>

      <H3 id="vs-wasp">vs Wasp & AdonisJS</H3>
      <P>
        Wasp is the closest sibling: a TypeScript meta-framework that configures
        React + Node + Prisma with auth and jobs built in, driven by a config
        file. It borrows the Rails idea of batteries included - and tspy borrows
        it back from them in turn. The difference is the boundary again: Wasp is
        single-runtime, so its jobs are TypeScript jobs. tspy&#8217;s jobs and AI
        are Python, with the full Python ecosystem behind them - not a port of a
        few of its ideas.
      </P>
      <P>
        AdonisJS is Node&#8217;s Rails: a batteries-included, opinionated TS
        framework with queues and an excellent CLI. It is a great choice for a
        pure TypeScript product. Neither Wasp nor AdonisJS owns the
        Python/intelligence side, and that is exactly the one tspy was built
        for.
      </P>

      <H3 id="vs-django">vs Django & Rails & Laravel</H3>
      <P>
        The batteries-included trio proved the model long before the TS
        frameworks copied it: one command, one project, everything wired. And
        Django is the closest thing to tspy&#8217;s history - it is the Python
        framework most AI teams reach for, and it runs jobs with Celery in the
        same language it runs the app in.
      </P>
      <P>
        The difference is the surface. Django&#8217;s web layer is its own
        thing: templates, forms, or DRF for APIs. Modern AI products ship a
        rich, stateful React client and a typed API, and imposing Django&#8217;s
        web model on top of that is why teams end up abstracting it behind a
        JS frontend anyway. tspy starts from the web half that already owns the
        client - TypeScript, React, Vite, Nitro - and makes the Python half
        native on the other side, instead of starting in Python and fighting to
        speak TypeScript later.
      </P>
      <P>
        And tasteless as the comparison table looks, it is honest: Rails and
        Laravel are superb when the whole product lives in one language. The
        moment "intelligence" and "web" are both mandatory, the seam they never
        designed for is the whole product - which is exactly what tspy makes
        first-class.
      </P>

      <H3 id="vs-glue">vs Next.js + FastAPI (the glued pair)</H3>
      <P>
        This is the real baseline, not the status quo - the field above is the
        context, but the honestly comparable thing is the pair that AI teams
        actually assemble by hand. The pair works, and thousands of products
        run on it. The friction is at the boundary:
      </P>
      <Checklist
        items={[
          <>
            <Strong>Types drift.</Strong> Your Python functions are JSON to the
            frontend. Schemas get hand-copied, get out of date, and nobody
            notices until runtime.
          </>,
          <>
            <Strong>Two dev servers, two deploys.</Strong> Frontend, API, and
            workers each need wiring, ports, proxies, and CI jobs that stay in
            sync by discipline.
          </>,
          <>
            <Strong>Two mental models.</Strong> A &ldquo;feature&rdquo; exists
            in three places across two repos, and the person reading it stitches
            it together by hand.
          </>,
        ]}
      />
      <P>
        tspy makes the boundary a typed contract instead of a JSON handshake,
        generates the feature so both sides stay in one folder, and runs one
        dev command and one build. The pair is powerful; tspy removes the part
        of it that is paperwork.
      </P>
      <Callout>
        What tspy does not claim: it is not a shared runtime. TypeScript and
        Python still run in their own worlds - the framework owns the seam
        between them so you do not have to.
      </Callout>

      <H3 id="bottom-line">The bottom line</H3>
      <P>
        Use a single-runtime framework when the product lives in one language -
        Next.js for a form-heavy React app, Rails for Ruby, Django for Python
        with a lighter web layer. Use the glued pair if you already own the
        wiring and the drift is tolerable.
      </P>
      <P>
        Reach for tspy when your product needs both worlds - a rich web surface
        and the intelligence behind it - and you want the boundary to be a
        product, not a liability.
      </P>
    </>
  ),

  "installation": (
    <>
      <H3 id="prerequisites">Prerequisites</H3>
      <P>
        tspy needs Node 20+ and, only if you select AI or jobs, Python 3.11+.
        There are no global installs - the CLI runs through{" "}
        <Code>npx</Code>, so node is the only hard requirement.
      </P>
      <H3 id="create">Create a project</H3>
      <P>
        Run the generator. It walks you through each capability with a prompt -
        everything is optional, nothing is installed until the project is
        written:
      </P>
      <CodeBlock>
{`$ npx create-tspy-app@latest my-app

? Auth provider -- None
? Database -- None
? AI capabilities (multi-select) -- llm/anthropic
? Jobs system -- None
Created my-app/ using template(s): base`}
      </CodeBlock>
      <H3 id="flags">Choose with flags</H3>
      <P>
        Every prompt has a flag, so the whole stack fits in one CI-friendly
        line - auth, database, toolkit, AI, brokers, everything:
      </P>
      <CodeBlock>
{`$ npx create-tspy-app@latest my-app \\
    --auth better-auth \\
    --database sqlite --toolkit drizzle \\
    --ai llm/anthropic --jobs celery --broker redis`}
      </CodeBlock>
      <H3 id="run">Install and run</H3>
      <P>
        <Code>npm install</Code> then <Code>npm run dev</Code>. The dev command
        starts the client, the server, and the Python pieces together - no
        two-terminal dance:
      </P>
      <CodeBlock>
{`$ cd my-app
$ npm install
$ npm run dev

  VITE  v6.0.0  ready in 320 ms
  -  Local:   http://localhost:5173/
  NITRO  listening on http://localhost:3000/`}
      </CodeBlock>
    </>
  ),

  "layouts-pages": (
    <>
      <H3 id="routes">Pages - the file system is the router</H3>
      <P>
        Every route is a file. <Code>app/page.tsx</Code> is the index,{" "}
        <Code>app/&lt;name&gt;/page.tsx</Code> is a URL, and nested folders make
        nested paths. No manual registration.
      </P>
      <H3 id="layouts">Layouts wrap every route</H3>
      <P>
        A <Code>app/layout.tsx</Code> at any level wraps all the routes below it
        - shared chrome, nav, providers. Nesting layouts is just nesting
        folders.
      </P>
      <H3 id="react-router">Under the hood - react-router</H3>
      <P>
        The file system compiles to React Router&rsquo;s route tree. You keep the
        typed <Code>Link</Code> and <Code>useNavigate</Code>, and route segments
        are lazy-loaded on navigation.
      </P>
    </>
  ),

  "linking-navigating": (
    <>
      <H3 id="link">Link</H3>
      <P>
        Use <Code>&lt;Link to="/docs/..."&gt;Link&lt;/Link&gt;</Code> for
        client-side navigation - no page reloads, prefetched on hover, lazy
        segments.
      </P>
      <H3 id="navigate">Navigate</H3>
      <P>
        For imperative navigation after an action, use <Code>useNavigate()</Code>.
        It is react-router&rsquo;s API, so anything you know carries over.
      </P>
    </>
  ),

  "server-client-components": (
    <>
      <H3 id="the-split">The split</H3>
      <P>
        The boundary is a folder split, not a per-file directive:{" "}
        <Code>app/</Code> is the client, <Code>server/</Code> is the Nitro
        backend, and <Code>ai/</Code> and <Code>jobs/</Code> are Python.
      </P>
      <H3 id="client">The client - React, CSR first</H3>
      <P>
        Today tspy is client-side rendered: the browser fetches the bundle and
        React renders. SSR is planned - the architecture keeps the render
        boundary movable without a rewrite.
      </P>
      <H3 id="server">The server - Nitro</H3>
      <P>
        <Code>server/</Code> owns the typed API. Handlers are{" "}
        <Code>defineEventHandler</Code>, routes are files, and everything is
        TypeScript.
      </P>
      <H3 id="python">The Python side</H3>
      <P>
        Python runs AI and jobs. It is reached through the generated typed RPC
        boundary - never an untyped JSON handshake.
      </P>
    </>
  ),

  "fetching-data": (
    <>
      <H3 id="from-client">From the client</H3>
      <P>
        Client code fetches over <Code>/api</Code> with generated typed stubs.
        In development Vite proxies to Nitro; in production Nitro serves it
        directly.
      </P>
      <H3 id="from-server">From the server</H3>
      <P>
        Nitro handlers read and return typed data. They can call Python through
        the RPC boundary when the answer needs the intelligence layer.
      </P>
      <H3 id="from-python">From Python</H3>
      <P>
        Python functions are exposed through generated RPC stubs, so fetching
        happens over the same typed contract from either side.
      </P>
    </>
  ),

  "mutating-data": (
    <>
      <H3 id="forms">Forms</H3>
      <P>
        Submit to <Code>/api</Code> endpoints. Input is validated before it
        reaches the database or Python.
      </P>
      <H3 id="validation">Validation</H3>
      <P>
        Validation is Zod, at the server boundary. The schema is typed, so what
        the client sends is what the server checked.
      </P>
      <H3 id="to-python">To Python</H3>
      <P>
        When the mutation needs intelligence, it crosses to Python through the
        typed RPC boundary - same file shape as a database write.
      </P>
    </>
  ),

  "caching": (
    <>
      <H3 id="honest">The honest baseline</H3>
      <P>
        tspy does not invent a cache layer. Caching lives where the ecosystem
        puts it - HTTP caching in Nitro, client caching in React Query - until
        the framework earns one of its own.
      </P>
      <H3 id="http">HTTP caching</H3>
      <P>
        HTTP caching is Nitro handling cache headers: revalidation, stale-while-
        revalidate, and route-level rules where you opt in.
      </P>
      <H3 id="client">Client caching</H3>
      <P>
        On the client, React Query owns caching - stale times, refetch on
        focus, and cache keys per feature.
      </P>
    </>
  ),

  auth: (
    <>
      <H3 id="providers">Providers</H3>
      <P>
        Every auth provider is a small plugin package that composes itself into{" "}
        <Code>tspy.config.ts</Code> under the <Code>auth</Code> key. Pick one:
      </P>
      <CodeBlock file="tspy.config.ts">
{`import { defineConfig } from "tspy";
import { betterAuth } from "@tspy/better-auth";

export default defineConfig({
  auth: betterAuth({
    emailAndPassword: { enabled: true },
    socialProviders: {
      google: { clientId: "...", clientSecret: "..." },
    },
  }),
});`}
      </CodeBlock>
      <Table
        head={["Package", "Provider", "Notes"]}
        rows={[
          [<Code key="p">@tspy/better-auth</Code>, <Code key="n">Better Auth</Code>, "Self-hosted, mounts at /api/auth/[...auth]"],
          [<Code key="p">@tspy/clerk</Code>, <Code key="n">Clerk</Code>, "Managed, wires the client"],
          [<Code key="p">@tspy/firebase</Code>, <Code key="n">Firebase</Code>, "Google account stack"],
          [<Code key="p">@tspy/supabase</Code>, <Code key="n">Supabase</Code>, "URL + anon key"],
          [<Code key="p">@tspy/workos</Code>, <Code key="n">WorkOS</Code>, "SSO / directory sync"],
        ]}
      />
      <P>
        The generated project also carries the matching <Code>server/auth/</Code>{" "}
        handler, so the same choice is scaffolded end-to-end. Whichever provider
        you compose becomes the <Code>auth</Code> export on{" "}
        <Code>tspy/server</Code>.
      </P>

      <H3 id="clerk">Clerk wires the client</H3>
      <P>
        Clerk is the one provider that spans the client side: a publishable key
        frontend mounts its session wrappers around the app, while the secret key
        stays server-side. Compose <Code>@tspy/clerk</Code> and the handler under{" "}
        <Code>server/auth/</Code> verifies sessions before protected routes run.
      </P>

      <H3 id="credentials">Credentials</H3>
      <P>
        Keys arrive through the environment. Each provider template writes its
        expected variables into <Code>.env.example</Code> -{" "}
        <Code>BETTER_AUTH_SECRET</Code>, <Code>CLERK_SECRET_KEY</Code>,{" "}
        <Code>FIREBASE_PRIVATE_KEY</Code>, <Code>SUPABASE_ANON_KEY</Code>,{" "}
        <Code>WORKOS_API_KEY</Code> - so a repo clone can be filled in without
        guessing names.
      </P>
    </>
  ),

  database: (
    <>
      <H3 id="matrix">The matrix</H3>
      <P>
        A database client is a plugin package composed in{" "}
        <Code>tspy.config.ts</Code> under the <Code>database</Code> key. Engine
        and access layer are chosen independently:
      </P>
      <Table
        head={["", "SQLite", "PostgreSQL"]}
        rows={[
          [<Strong key="prisma">Prisma</Strong>, "schema-driven, TS-safe", "schema-driven, TS-safe"],
          [<Strong key="drizzle">Drizzle</Strong>, "query builder", "query builder"],
          [<Strong key="kysely">Kysely</Strong>, "typed SQL builder", "typed SQL builder"],
          [<Strong key="sql">raw sql</Strong>, "direct driver", "direct driver"],
        ]}
      />
      <CodeBlock file="tspy.config.ts">
{`import { defineConfig } from "tspy";
import { drizzle } from "@tspy/drizzle";

export default defineConfig({
  database: drizzle({ provider: "sqlite", url: "file:./db.sqlite" }),
});`}
      </CodeBlock>

      <H3 id="files">What you get</H3>
      <P>
        The database layer lives under <Code>server/db/</Code>: a client
        initialized from the config, a first schema (or migration) file, and a
        seed script. The client is exposed at runtime as the <Code>db</Code>{" "}
        export of <Code>tspy/server</Code>.
      </P>

      <H3 id="rules">Rules</H3>
      <Checklist
        items={[
          <>
            One engine and one access layer per project - no ORM mixing.
          </>,
          <>
            The client is constructed on the server and never imported into the
            client bundle.
          </>,
          <>
            SQLite in development, PostgreSQL in production, no code changes:
            the URL and provider are config, not code.
          </>,
        ]}
      />
    </>
  ),

  ai: (
    <>
      <H3 id="llm">LLM providers</H3>
      <P>
        An AI provider is a plugin package composed in{" "}
        <Code>tspy.config.ts</Code> under the <Code>ai</Code> key. The package
        stays thin - it records which model and API key to use and hands you an
        official SDK client as the <Code>ai</Code> export on{" "}
        <Code>tspy/server</Code>.
      </P>
      <CodeBlock file="tspy.config.ts">
{`import { defineConfig } from "tspy";
import { anthropic } from "@tspy/anthropic";

export default defineConfig({
  ai: anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
    model: "claude-sonnet-4-5",
  }),
});`}
      </CodeBlock>
      <Table
        head={["Package", "SDK", "Default model"]}
        rows={[
          [<Code key="p">@tspy/anthropic</Code>, <Code key="s">Anthropic SDK</Code>, <Code key="m">claude-sonnet-4-5</Code>],
          [<Code key="p">@tspy/openai</Code>, <Code key="s">OpenAI SDK</Code>, <Code key="m">gpt-4o</Code>],
          [<Code key="p">@tspy/google</Code>, <Code key="s">Google Gemini SDK</Code>, <Code key="m">gemini-2.5-pro</Code>],
        ]}
      />

      <H3 id="capabilities">Capabilities</H3>
      <P>
        Agents, RAG, tools, prompts, and MCP live under <Code>ai/</Code> as
        thin, composable Python starting points. The model client is the
        foundation; capabilities build on it without baking combinations into
        the scaffold. Enable what the feature needs, in Python, next to the
        route that uses it.
      </P>
    </>
  ),

  jobs: (
    <>
      <H3 id="systems">Job systems</H3>
      <P>
        A background-job system is a plugin package composed in{" "}
        <Code>tspy.config.ts</Code> under the <Code>jobs</Code> key. The
        enqueue client becomes the <Code>jobs</Code> export on{" "}
        <Code>tspy/server</Code>, and the worker entrypoint is scaffolded under{" "}
        <Code>jobs/</Code>.
      </P>
      <CodeBlock file="tspy.config.ts">
{`import { defineConfig } from "tspy";
import { celery } from "@tspy/celery";

export default defineConfig({
  jobs: celery({ broker: "redis://localhost:6379" }),
});`}
      </CodeBlock>
      <Table
        head={["Package", "System", "Language"]}
        rows={[
          [<Code key="p">@tspy/celery</Code>, <Code key="n">Celery</Code>, "Python"],
          [<Code key="p">@tspy/rq</Code>, <Code key="n">RQ</Code>, "Python"],
          [<Code key="p">@tspy/dramatiq</Code>, <Code key="n">Dramatiq</Code>, "Python"],
        ]}
      />

      <H3 id="brokers">Brokers</H3>
      <P>
        Celery and Dramatiq accept a broker URL; RQ is Redis-only by design. Use
        Redis or RabbitMQ as the transport - the broker value is configuration,
        so switching it in development versus production changes a URL, not
        code.
      </P>
    </>
  ),

  "quick-start": (
    <>
      <H3 id="interactive">Run it interactively</H3>
      <P>
        Run the generator and answer the prompts. Each question picks a
        template package - nothing is installed until the project is written.
      </P>
      <CodeBlock>
{`$ npx create-tspy-app@latest my-app
? Auth provider -- None
? Database -- None
? AI capabilities (multi-select) -- llm/anthropic
? Jobs system -- None
? Broker for jobs -- Redis

Created my-app/ with 2 template(s): base + ai/llm/anthropic
18 files written.`}
      </CodeBlock>
      <P>
        The interactive flow walks through auth, database (plus its toolkit),
        AI capabilities, and jobs - in that order, mirroring the flags below.
      </P>

      <H3 id="flags">Flags for everything up front</H3>
      <P>
        Every prompt has a flag, so the whole choice fits in one line - or in
        CI:
      </P>
      <CodeBlock>
{`$ npx create-tspy-app@latest my-app \\
    --auth better-auth \\
    --database sqlite --toolkit drizzle \\
    --ai llm/anthropic,rag,agents \\
    --jobs celery --broker redis`}
      </CodeBlock>
      <Table
        head={["Flag", "Choices", "Default"]}
        rows={[
          ["--auth", "better-auth, clerk, firebase, supabase, workos", "none"],
          ["--database", "sqlite, postgresql, none", "none"],
          ["--toolkit", "prisma, drizzle, kysely, sql", "sql"],
          ["--ai", "llm/openai, llm/anthropic, llm/google, llm/ollama, agents, rag, tools, prompts, mcp", "---"],
          ["--jobs", "celery, rq, dramatiq", "none"],
          ["--broker", "redis, rabbitmq (Redis required for rq)", "redis"],
        ]}
      />
      <Callout>
        <Code>--database sqlite --toolkit drizzle</Code> becomes the package
        <Code>@tspy/drizzle</Code> composed in <Code>tspy.config.ts</Code>.
        Likewise <Code>--jobs celery</Code> becomes{" "}
        <Code>@tspy/celery</Code>, and so on.
      </Callout>

      <H3 id="run">Install and run</H3>
      <P>
        Install dependencies, then start everything with one command:
      </P>
      <CodeBlock>
{`$ cd my-app
$ npm install
$ npm run dev

TSPY dev server
- Local:   http://localhost:3000
- Network: http://192.168.0.211:3000
✓ Ready in 255ms`}
      </CodeBlock>
      <P>
        <Code>npm run dev</Code> starts the TSPY development runtime. The browser
        talks to one origin at <Code>localhost:3000</Code>; internally TSPY keeps
        Vite on client tooling and Nitro on the server runtime. No two-terminal
        dance, no public <Code>localhost:5173</Code>.
      </P>
    </>
  ),

  "structure": (
    <>
      <P>
        A fresh tspy project is a single directory with four fixed top-level
        folders. Only the folders you asked for are generated:
      </P>
      <CodeBlock file="my-app/">
{`my-app/
|-- app/                # the web application (TypeScript)
|   |-- globals.css
|   |-- layout.tsx      # root layout
|   \`-- page.tsx        # the home page
|-- server/             # the Nitro backend (TypeScript)
|   |-- api/
|   |   \`-- health.ts   # example API route
|   \`-- auth/           # only when an auth provider is selected
|-- ai/                 # AI capabilities (Python) - when selected
|-- jobs/               # background jobs (Python) - when selected
|-- public/             # static assets
|-- tspy.config.ts      # the framework config
|-- package.json
\`-- pyproject.toml      # Python dependencies (AI / jobs)`}
      </CodeBlock>

      <H3 id="app">app - the web application</H3>
      <P>
        The React client. <Code>app/page.tsx</Code> default-exports the page
        component, <Code>app/layout.tsx</Code> wraps every route, and{" "}
        <Code>app/globals.css</Code> holds the Tailwind theme. Routed by the
        file system through <Code>react-router</Code>.
      </P>

      <H3 id="server">server - the Nitro backend</H3>
      <P>
        The Nitro server in TypeScript holds API routes under{" "}
        <Code>server/api/</Code>, with auth and database layers appearing under
        <Code>server/auth/</Code> and <Code>server/db/</Code> when those
        templates are selected. Every route under <Code>server/api/**</Code> is
        served on the <Code>/api</Code> path and proxied by the dev server.
      </P>
      <CodeBlock file="server/api/health.ts">
{`export default defineEventHandler(() => ({
  ok: true,
  service: "tspy-demo",
}));`}
      </CodeBlock>

      <H3 id="ai-jobs">ai and jobs - Python</H3>
      <P>
        Python code that would otherwise be buried in the server lives at the
        top level. <Code>ai/</Code> holds the LLM provider client and the
        capabilities you enabled (agents, RAG, tools, prompts, MCP);{" "}
        <Code>jobs/</Code> holds workers and tasks. The two folders only exist
        when their templates are selected.
      </P>

      <H3 id="config">Config files</H3>
      <P>
        <Code>tspy.config.ts</Code> is the single place the framework reads. It
        composes the plugin packages - auth, database, AI, jobs - into the
        project:
      </P>
      <CodeBlock file="tspy.config.ts">
{`import { defineConfig } from "tspy";
import { betterAuth } from "@tspy/better-auth";
import { drizzle } from "@tspy/drizzle";
import { anthropic } from "@tspy/anthropic";
import { celery } from "@tspy/celery";

export default defineConfig({
  auth: betterAuth({ emailAndPassword: { enabled: true } }),
  database: drizzle({ provider: "sqlite", url: "file:./db.sqlite" }),
  ai: anthropic({ model: "claude-sonnet-4-5" }),
  jobs: celery({ broker: "redis://localhost:6379" }),
});`}
      </CodeBlock>
    </>
  ),

  "stack": (
    <>
      <P>
        tspy deliberately owns no implementations. Every piece of the stack is
        the real, mature library you would already use - tspy composes them, it
        does not reimplement them.
      </P>
      <Table
        head={["Layer", "Technology", "Owned by"]}
        rows={[
          ["Web client", "React 19 + Vite", "TypeScript"],
          ["Routing", "react-router (file-based)", "TypeScript"],
          ["API server", "Nitro + h3", "TypeScript"],
          ["Auth", "Better Auth, Clerk, Firebase, Supabase, WorkOS", "TypeScript"],
          ["Database", "Prisma, Drizzle, Kysely, or raw drivers", "TypeScript"],
          ["AI", "OpenAI, Anthropic, Google, Ollama SDKs", "Python"],
          ["Jobs", "Celery, RQ, or Dramatiq", "Python"],
        ]}
      />

      <H3 id="client">Client - React + Vite</H3>
      <P>
        The client is a standard Vite + React application with Tailwind CSS
        wired in. There is no hidden magic: the generated{" "}
        <Code>vite.config.ts</Code> loads the Tailwind plugin, and the app is
        routed by folder, the way the App Router works in Next.js.
      </P>
      <CodeBlock file="vite.config.ts">
{`import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
});`}
      </CodeBlock>

      <H3 id="server">Server - Nitro</H3>
      <P>
        Nitro runs the API. Routes follow the standard <Code>serve/api/**</Code>{" "}
        convention and are exposed under <Code>/api</Code>, so the client and
        server split cleanly with a thin proxy between them in development.
      </P>

      <H3 id="python">Python - AI and jobs</H3>
      <P>
        Python is a first-class citizen with its own <Code>pyproject.toml</Code>.
        The AI provider hands you the official SDK client, and jobs run under
        the worker you chose. The boundary between TypeScript and Python is
        a typed contract - not a process you have to babysit.
      </P>
    </>
  ),

  "conventions": (
    <>
      <P>
        The folder structure is the contract. Read a generated project and the
        layout tells you where the web stops and the intelligence begins.
      </P>

      <H3 id="app">app/ is the web application</H3>
      <P>
        Everything under <Code>app/</Code> is the client. Routes are folders; a
        <Code>page.tsx</Code> default-exports the component rendered at that
        path. No route table to edit, no config file to keep in sync.
      </P>

      <H3 id="server">server/ is the Nitro server</H3>
      <P>
        Everything under <Code>server/</Code> is the backend - API routes under{" "}
        <Code>server/api/</Code>, plus <Code>auth/</Code> and{" "}
        <Code>db/</Code> when selected. Server-only code never leaks into the
        client bundle.
      </P>

      <H3 id="capabilities">ai/ and jobs/ are first-class</H3>
      <P>
        AI and jobs live at the top level, not buried under{" "}
        <Code>server/</Code>. They are not an afterthought of the web
        framework; they are a dimension the framework is built around. The{" "}
        <Code>pyproject.toml</Code> at the root is their dependency manifest.
      </P>

      <H3 id="independence">Providers stay independent</H3>
      <P>
        Every provider is its own package (<Code>@tspy/better-auth</Code>,{" "}
        <Code>@tspy/drizzle</Code>, ...). Swap one for another by changing a
        line in <Code>tspy.config.ts</Code> - nothing else in your app moves.
      </P>
    </>
  ),

  "merge-strategy": (
    <>
      <P>
        Because templates share a base project, two templates sometimes write
        the same path. When they do, the generator merges - it does not clobber.
      </P>

      <H3 id="per-file">Per-file strategy</H3>
      <Table
        head={["File type", "Strategy"]}
        rows={[
          ["package.json", "merged deeply: scripts, dependencies, devDependencies"],
          ["pyproject.toml", "merged by section (project, dependencies)"],
          [".env.example", "keys merged; existing values untouched"],
          ["everything else", "last writer wins"],
        ]}
      />
      <P>
        The base template always applies first, so every named capability is a
        merge on top of it - auth adds a provider to <Code>package.json</Code>{" "}
        without undoing the jobs template that ran before it.
      </P>

      <H3 id="example">Example</H3>
      <CodeBlock>
{`# base + auth/better-auth + database/drizzle
package.json     - scripts + deps merged
tspy.config.ts   - auth + database written once
.env.example     - BETTER_AUTH_SECRET, DATABASE_URL merged`}
      </CodeBlock>
    </>
  ),

  "how-it-works": (
    <>
      <H3 id="compose">Composition</H3>
      <P>
        Generation is strictly ordered: the <Code>base</Code> template first,
        then each selected template in the fixed order auth, database, AI,
        jobs (with the broker). The result is the layered project - never a
        restart from scratch for a different combination.
      </P>
      <CodeBlock>
{`create-tspy-app my-app --auth better-auth --database sqlite \\
    --toolkit drizzle --ai llm/anthropic --jobs celery

templates applied, in order:
  base
  + auth/better-auth
  + database/drizzle/sqlite
  + ai/llm/anthropic
  + jobs/celery
  + jobs/brokers/redis`}
      </CodeBlock>

      <H3 id="write-merge">Write or merge</H3>
      <P>
        When a template writes a path the base already created, the generator
        merges <Code>package.json</Code>, <Code>pyproject.toml</Code>, and{" "}
        <Code>.env.example</Code>; everything else is written once, last writer
        wins. The report at the end tells you exactly what happened:
      </P>
      <CodeBlock>
{`Created my-app/ with 6 template(s): base + auth + database + ai + celery + redis.
42 files written, 3 files merged.`}
      </CodeBlock>

      <H3 id="dev">One dev command</H3>
      <P>
        <Code>npm run dev</Code> starts Vite (the client) and Nitro (the API)
        together, proxies <Code>/api</Code> to the server, and - when Python
        templates are selected - wires the AI and job runtimes. The{" "}
        <Code>.env.example</Code> lists every variable the project needs, so a
        clone can be filled in without guessing names.
      </P>
    </>
  ),

  ...LEARN_CONTENT,
};
