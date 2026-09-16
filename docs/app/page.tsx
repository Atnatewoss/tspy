"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";

import { SiteHeader } from "@/components/site-header";
import {
  LogoIcon,
  ViteLogo,
  PythonLogo,
  SparkleIcon,
  JobsIcon,
  TerminalIcon,
  KeyIcon,
  DatabaseIcon,
  ServerIcon,
  CopyIcon,
} from "@/components/icons";
import { GITHUB_URL } from "@/lib/sections";

const CREATE_COMMAND = "npx create-tspy-app@latest";

const CONFIG_EXAMPLE = `import { defineConfig } from "tspy";
import { betterAuth } from "@tspy/better-auth";
import { drizzle } from "@tspy/drizzle";
import { anthropic } from "@tspy/anthropic";
import { celery } from "@tspy/celery";

export default defineConfig({
  auth: betterAuth({ emailAndPassword: { enabled: true } }),
  database: drizzle({ provider: "sqlite", url: "file:./app.db" }),
  ai: anthropic({ model: "claude-sonnet-4-5" }),
  jobs: celery({ broker: "redis://localhost:6379" }),
});`;

const DOODLE_PIXEL =
  "var(--font-vt323), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const DOODLE_PIXEL_STRONG =
  "var(--font-press-start-2p), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

function HeroDoodle() {
  return (
    <svg
      viewBox="16 155 384 424"
      aria-hidden
      className="tspy-float hidden h-[23.75rem] w-[21.5rem] shrink-0 text-muted-foreground lg:block"
      style={{ animationDuration: "10s" }}
      fill="none"
    >
      <defs>
        <filter
          id="doodle-rough"
          x="-12%"
          y="-12%"
          width="124%"
          height="124%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.026"
            numOctaves="2"
            seed="9"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </defs>

      <g filter="url(#doodle-rough)">
        <g transform="rotate(-5 86 266)">
          <rect
            x="30"
            y="210"
            width="112"
            height="112"
            rx="18"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <rect
            x="37"
            y="217"
            width="112"
            height="112"
            rx="16"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          <text
            x="86"
            y="287"
            textAnchor="middle"
            fontFamily={DOODLE_PIXEL_STRONG}
            fontSize="46"
            fontWeight="700"
            fill="currentColor"
          >
            ts
          </text>
        </g>

        <path
          d="M 140 236 C 156 220 172 218 188 214"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 144 268 C 162 268 180 266 196 266"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 140 298 C 152 314 170 332 188 348"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <g transform="rotate(-3 244 216)">
          <rect
            x="188"
            y="190"
            width="112"
            height="52"
            rx="13"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <circle cx="210" cy="216" r="4" fill="currentColor" />
          <text
            x="226"
            y="222"
            fontFamily={DOODLE_PIXEL}
            fontSize="18"
            fill="currentColor"
          >
            auth
          </text>
        </g>
        <g transform="rotate(2 250 288)">
          <rect
            x="196"
            y="262"
            width="108"
            height="52"
            rx="13"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <circle cx="218" cy="288" r="4" fill="currentColor" />
          <text
            x="234"
            y="294"
            fontFamily={DOODLE_PIXEL}
            fontSize="18"
            fill="currentColor"
          >
            db
          </text>
        </g>
        <g transform="rotate(-4 244 360)">
          <rect
            x="188"
            y="334"
            width="112"
            height="52"
            rx="13"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <circle cx="210" cy="360" r="4" fill="currentColor" />
          <text
            x="226"
            y="366"
            fontFamily={DOODLE_PIXEL}
            fontSize="18"
            fill="currentColor"
          >
            orm
          </text>
        </g>

        <path
          d="M 246 396 C 270 414 300 428 322 440"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 318 448 l 18 3 -12 14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        <g transform="rotate(5 331 478)">
          <rect
            x="275"
            y="420"
            width="112"
            height="112"
            rx="18"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <rect
            x="282"
            y="427"
            width="112"
            height="112"
            rx="16"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          <text
            x="331"
            y="497"
            textAnchor="middle"
            fontFamily={DOODLE_PIXEL_STRONG}
            fontSize="46"
            fontWeight="700"
            fill="currentColor"
          >
            py
          </text>
        </g>

        <path
          d="M 272 460 C 250 452 232 462 216 470"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 322 534 C 286 528 246 516 206 514"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <g transform="rotate(-3 202 458)">
          <rect
            x="150"
            y="432"
            width="104"
            height="52"
            rx="13"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <circle cx="170" cy="458" r="4" fill="currentColor" />
          <text
            x="186"
            y="464"
            fontFamily={DOODLE_PIXEL}
            fontSize="18"
            fill="currentColor"
          >
            ai
          </text>
        </g>
        <g transform="rotate(3 187 536)">
          <rect
            x="120"
            y="510"
            width="134"
            height="52"
            rx="13"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <circle cx="144" cy="536" r="4" fill="currentColor" />
          <text
            x="160"
            y="542"
            fontFamily={DOODLE_PIXEL}
            fontSize="18"
            fill="currentColor"
          >
            jobs
          </text>
        </g>

        <path
          d="M 352 186 l 9 2 M 356 180 l 2 9 M 349 184 l 10 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M 66 184 C 60 178 70 172 76 178 C 82 184 74 192 66 187 C 57 182 62 172 72 174"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M 356 300 l 10 10 M 366 300 l -10 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}

const FEATURES: {
  label: string;
  status: "ships" | "direction";
  copy: string;
  icon: ReactNode;
}[] = [
  {
    label: "One command",
    status: "ships",
    icon: <TerminalIcon className="size-5" />,
    copy: "create-tspy my-app scaffolds the whole project. Arrow-key menus and checklists when you want to choose, flags when you already know.",
  },
  {
    label: "Drop-in auth",
    status: "ships",
    icon: <KeyIcon className="size-5" />,
    copy: "Better Auth, Clerk, Firebase, Supabase, or WorkOS. Server code and client wiring land ready, waiting only for your keys.",
  },
  {
    label: "Database, wired",
    status: "ships",
    icon: <DatabaseIcon className="size-5" />,
    copy: "SQLite or PostgreSQL behind Prisma, Drizzle, Kysely, or the raw driver you prefer - a working client and schema from day one.",
  },
  {
    label: "AI, ready in a module",
    status: "ships",
    icon: <SparkleIcon className="size-5" />,
    copy: "OpenAI, Anthropic, Google Gemini, or Ollama as flat modules that hand you the official SDK client - plus agents, RAG, tools, prompts, and MCP.",
  },
  {
    label: "Jobs, first task ready",
    status: "ships",
    icon: <JobsIcon className="size-5" />,
    copy: "Celery, RQ, or Dramatiq with a Redis or RabbitMQ broker. You get a queue and a task that already connects.",
  },
  {
    label: "One dev server",
    status: "ships",
    icon: <ServerIcon className="size-5" />,
    copy: "npm run dev starts the client and the API together, /api proxied to Nitro for you. No two-terminal dance.",
  },
  {
    label: "Composable templates",
    status: "ships",
    icon: <CopyIcon className="size-5" />,
    copy: "One base project, then exactly what you pick. No baked-in combinations, no unused files to delete later.",
  },
  {
    label: "Tools you already know",
    status: "ships",
    icon: <ViteLogo className="size-5" />,
    copy: "React, Vite, Nitro, h3, Prisma, Drizzle, Kysely, Celery, RQ, Dramatiq. The real libraries, wired up - not abstracted away.",
  },
  {
    label: "Python where it belongs",
    status: "ships",
    icon: <PythonLogo className="size-5" />,
    copy: "AI and jobs live at the top level - ai/ and jobs/ - never buried under the server, never an afterthought.",
  },
];

const INTEGRATIONS: { name: string; icon?: string; url: string }[] = [
  { name: "Better Auth", url: "https://better-auth.com" },
  { name: "Clerk", icon: "clerk", url: "https://clerk.com" },
  { name: "Firebase", icon: "firebase", url: "https://firebase.google.com" },
  { name: "Supabase", icon: "supabase", url: "https://supabase.com" },
  { name: "WorkOS", icon: "workos", url: "https://workos.com" },
  { name: "Prisma", icon: "prisma", url: "https://prisma.io" },
  { name: "Drizzle", icon: "drizzle", url: "https://orm.drizzle.team" },
  { name: "Kysely", icon: "kysely", url: "https://kysely.dev" },
  { name: "SQLite", icon: "sqlite", url: "https://sqlite.org" },
  { name: "PostgreSQL", icon: "postgresql", url: "https://postgresql.org" },
  { name: "OpenAI", icon: "openai", url: "https://openai.com" },
  { name: "Anthropic", icon: "anthropic", url: "https://anthropic.com" },
  { name: "Gemini", icon: "googlegemini", url: "https://ai.google.dev" },
  { name: "Ollama", icon: "ollama", url: "https://ollama.com" },
  { name: "Celery", icon: "celery", url: "https://docs.celeryq.dev" },
  { name: "RQ", url: "https://python-rq.org" },
  { name: "Dramatiq", url: "https://dramatiq.io" },
  { name: "Redis", icon: "redis", url: "https://redis.io" },
  { name: "RabbitMQ", icon: "rabbitmq", url: "https://rabbitmq.com" },
];

function CommandButton() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-label={`Copy ${CREATE_COMMAND} to clipboard`}
      onClick={() => {
        void navigator.clipboard?.writeText(CREATE_COMMAND);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
      className="inline-flex items-center gap-2.5 rounded-xl border border-border px-4 py-2.5 font-pixel text-lg text-foreground transition-colors hover:text-muted-foreground"
    >
      <span aria-hidden className="text-muted-foreground">
        $
      </span>
      {CREATE_COMMAND}
      <span
        aria-hidden
        className="ml-1 inline-flex text-muted-foreground"
      >
        {copied ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
      </span>
    </button>
  );
}





export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="relative flex-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-6xl -translate-x-1/2 border-x border-dashed border-border lg:block"
        />
        <section>
          <div className="relative flex min-h-[calc(100dvh-6rem)] flex-col">
            <div
              aria-hidden
              className="hero-grain pointer-events-none absolute inset-0"
            />
            <div
              aria-hidden
              className="hero-beam pointer-events-none absolute inset-0"
            />
            <div
              aria-hidden
              className="hero-fade pointer-events-none absolute inset-0"
            />
            <div className="mx-auto relative flex w-full max-w-6xl flex-1 flex-col px-4 pt-32 sm:px-6 sm:pt-40 lg:px-8">
              <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                <div className="w-full max-w-xl">
                  <p className="relative inline-block px-3 py-2 font-pixel text-lg uppercase leading-none text-muted-foreground">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-0.5 -top-0.5 h-3 w-3 border-l border-t border-foreground/20"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-0.5 -top-0.5 h-3 w-3 border-r border-t border-foreground/20"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-0.5 -left-0.5 h-3 w-3 border-b border-l border-foreground/20"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-0.5 -right-0.5 h-3 w-3 border-b border-r border-foreground/20"
                    />
                    TypeScript web · Python intelligence · one framework
                  </p>

                  <h1 className="mt-8 max-w-xl text-3xl font-semibold leading-tight tracking-tight">
                    The fullstack framework for the web and its intelligence.
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                    One framework. One dev server. Filesystem routing, auth, database,
                    AI, and jobs — wired together from a single config.
                  </p>                    <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/docs/introduction"
                      className="inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
                    >
                      Read the docs
                    </Link>
                    <CommandButton />
                  </div>
                </div>

                <HeroDoodle />
              </div>

              <div aria-hidden className="min-h-24 sm:min-h-32 lg:min-h-40 flex-1" />
              <div className="mb-12 sm:mb-20 -mx-4 border-y border-dashed border-border px-4 py-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="flex items-center gap-6">
                  <p className="shrink-0 font-pixel text-sm uppercase leading-snug text-muted-foreground">
                    The stack,<br />
                    <span className="text-foreground">connected</span>
                  </p>
                  <div
                    className="marquee-mask min-w-0 flex-1 overflow-hidden"
                    role="region"
                    aria-label="Integration partners"
                  >
                  <div className="animate-marquee flex w-max gap-2">
                    {INTEGRATIONS.map((integration) => (
                      <a
                        key={integration.name}
                        href={integration.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                      >
                        <IntegrationMark
                          name={integration.name}
                          icon={integration.icon}
                        />
                        {integration.name}
                      </a>
                    ))}
                    {INTEGRATIONS.map((integration) => (
                      <a
                        key={`dup-${integration.name}`}
                        href={integration.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-hidden
                        tabIndex={-1}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                      >
                        <IntegrationMark
                          name={integration.name}
                          icon={integration.icon}
                        />
                        {integration.name}
                      </a>
                    ))}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="reveal grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                What&apos;s in tspy?
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Everything you need to build great products on the web.
              </p>
            </div>
            <VercelCodeBlock
              code={CONFIG_EXAMPLE}
              filename="tspy.config.ts"
            />
          </div>
        </section>

        <section className="mx-auto max-w-6xl border-t border-dashed border-border px-4 py-24 sm:px-6 lg:px-8">
          <div className="reveal">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              What you get
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything wired, nothing invented.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Real libraries, composed through one config. Each capability is a
              thin plugin package - pick what your project needs, ignore the
              rest.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature.label}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-5 transition-colors duration-200 hover:border-foreground/20 hover:bg-muted/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      aria-hidden
                      className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors duration-200 group-hover:border-foreground/20 group-hover:text-foreground"
                    >
                      {feature.icon}
                    </span>
                    <StatusChip status={feature.status} />
                  </div>
                  <h3 className="mt-1 text-sm font-semibold tracking-tight">
                    {feature.label}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {feature.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-dashed border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <LogoIcon className="size-8" />
                <span className="text-[17px] font-semibold tracking-tight">
                  tspy
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
                The fullstack framework for the web and its intelligence.
              </p>
            </div>
            <FooterColumn
              title="Get started"
              links={[
                { label: "Docs", href: "/docs/introduction" },
                { label: "Quick start", href: "/docs/quick-start" },
              ]}
            />
            <FooterColumn
              title="Templates"
              links={[
                { label: "Auth", href: "/docs/auth" },
                { label: "Database", href: "/docs/database" },
                { label: "AI (Python)", href: "/docs/ai" },
                { label: "Jobs (Python)", href: "/docs/jobs" },
              ]}
            />
            <FooterColumn
              title="Project"
              external
              links={[{ label: "GitHub", href: GITHUB_URL }]}
            />
          </div>
        </div>
        <div className="border-t border-dashed border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} tspy · MIT License</p>
            <a
              href="https://github.com/Atnatewoss"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <LogoIcon className="size-4" />
              Built by Atnatewos
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatusChip({ status }: { status: "ships" | "direction" }) {
  const ships = status === "ships";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
        ships
          ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          : "border-amber-500/30 text-amber-600 dark:text-amber-400"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${
          ships ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      {ships ? "ships" : "direction"}
    </span>
  );
}

function FooterColumn({
  title,
  links,
  external,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="font-pixel text-sm uppercase text-muted-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IntegrationMark({
  name,
  icon,
}: {
  name: string;
  icon?: string;
}) {
  if (icon) {
    return (
      <Image
        src={`https://cdn.simpleicons.org/${icon}/9ca3af`}
        alt=""
        width="14"
        height="14"
        unoptimized
        className="size-3.5 shrink-0"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="grid size-3.5 shrink-0 place-items-center rounded-full border border-border text-[8px] font-medium leading-none"
    >
      {name[0]}
    </span>
  );
}

function VercelCodeBlock({
  code,
  filename,
}: {
  code: string;
  filename: string;
}) {
  return (
    <div className="overflow-clip rounded-xl border" style={{ background: "var(--code-bg)", borderColor: "var(--code-border)", color: "var(--code-fg)" }}>
      <div className="flex items-center gap-2 border-b px-4 py-2.5 font-mono text-[11px]" style={{ borderColor: "var(--code-border)", color: "var(--code-header-fg)" }}>
        {filename}
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.7]">
        <code dangerouslySetInnerHTML={{ __html: highlightVercel(code) }} />
      </pre>
    </div>
  );
}

const VERCEL_KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "const",
]);

function highlightVercel(code: string): string {
  const out: string[] = [];
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i]!;

    if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1;
      while (j < len && code[j] !== ch) j++;
      j++;
      out.push(`<span style="color:var(--code-string)">${escHtml(code.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i;
      while (j < len && /[a-zA-Z0-9_$]/.test(code[j]!)) j++;
      const word = code.slice(i, j);

      let k = j;
      while (k < len && code[k] === " ") k++;
      let m = j;
      while (m < len && code[m] === " ") m++;

      if (VERCEL_KEYWORDS.has(word)) {
        out.push(`<span style="color:var(--code-keyword)">${word}</span>`);
      } else if (code[k] === "(") {
        out.push(`<span style="color:var(--code-fn)">${word}</span>`);
      } else if (code[m] === ":") {
        out.push(`<span style="color:var(--code-type)">${word}</span>`);
      } else {
        out.push(`<span style="color:var(--code-fg)">${word}</span>`);
      }
      i = j;
      continue;
    }

    if ("{}[]()".includes(ch)) {
      out.push(`<span style="color:var(--code-punct)">${ch}</span>`);
      i++;
      continue;
    }

    if (",;:".includes(ch)) {
      out.push(`<span style="color:var(--code-punct)">${ch}</span>`);
      i++;
      continue;
    }

    out.push(escHtml(ch));
    i++;
  }

  return out.join("");
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
