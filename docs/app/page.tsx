"use client";

import { useState } from "react";
import type { ReactNode, SVGProps } from "react";

import Link from "next/link";
import Image from "next/image";

import { SiteHeader } from "@/components/site-header";
import { Browser } from "@/components/browser";
import {
  LogoIcon,
  PythonLogo,
  SparkleIcon,
  JobsIcon,
  KeyIcon,
  DatabaseIcon,
  CloudIcon,
} from "@/components/icons";
import { GITHUB_URL } from "@/lib/sections";
import { Next as NextIcon, Nuxt as NuxtIcon, Svelte as SvelteIcon } from "@react-symbols/icons";

const CREATE_COMMAND = "npx create-tspy-app@latest";

const DOODLE_PIXEL =
  "var(--font-vt323), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const DOODLE_PIXEL_STRONG =
  "var(--font-press-start-2p), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

function HeroDoodle() {
  return (
    <svg
      viewBox="16 155 384 424"
      aria-hidden
      className="tspy-float hidden h-[18rem] w-[16rem] shrink-0 text-muted-foreground lg:block"
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
      label: "Python where it belongs",
      status: "ships",
      icon: <PythonLogo className="size-5" />,
      copy: "AI and jobs live at the top level - ai/ and jobs/ - never buried under the server, never an afterthought.",
    },
    {
      label: "Deploy anywhere",
      status: "direction",
      icon: <CloudIcon className="size-5" />,
      copy: "Nitro presets for Node.js, Cloudflare Workers, Vercel, Deno, and Bun. One config, one build, deploy where you want.",
    },
  ];

const INTEGRATIONS: { name: string; icon?: string; url: string }[] = [
  { name: "Better Auth", icon: "betterauth", url: "https://better-auth.com" },
  { name: "Clerk", icon: "clerk", url: "https://clerk.com" },
  { name: "Firebase", icon: "firebase", url: "https://firebase.google.com" },
  { name: "Supabase", icon: "supabase", url: "https://supabase.com" },
  { name: "WorkOS", icon: "workos", url: "https://workos.com" },
  { name: "Prisma", icon: "prisma", url: "https://prisma.io" },
  { name: "Drizzle", icon: "drizzle", url: "https://orm.drizzle.team" },
  { name: "Kysely", url: "https://kysely.dev" },
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
      className="group inline-flex h-8 items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3 font-mono text-sm text-foreground transition-all hover:border-border hover:bg-muted/50"
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
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 border-x border-dashed border-border lg:block"
        />
        <section>
          <div className="relative flex min-h-[calc(100dvh-6rem)] flex-col">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-background"
            />
            <div className="mx-auto relative flex w-full max-w-7xl flex-1 flex-col px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8">
              <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-24">
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

                  <h1 className="text-heading-40 mt-8 max-w-xl">
                    The full-stack framework for building intelligent web apps
                  </h1>
                  <p className="text-copy-16 mt-4 max-w-xl text-muted-foreground">
                    One framework. Filesystem routing, auth, database,
                    AI, and jobs - wired together from a single config.
                  </p>                    <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/docs/why-tspy"
                      className="inline-flex h-8 items-center justify-center rounded-lg bg-foreground px-3 text-button-14 text-background transition hover:bg-foreground/80 active:translate-y-px"
                    >
                      Read the docs
                    </Link>
                    <CommandButton />
                  </div>
                </div>

                <HeroDoodle />
              </div>

              <div aria-hidden className="min-h-8 sm:min-h-12 flex-1" />

              <div className="w-full py-8">
                <ComparisonBlock />
              </div>

              <div className="-mx-4 border-y border-dashed border-border px-4 py-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
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

        <section className="mx-auto max-w-7xl border-t border-dashed border-border px-4 py-24 sm:px-6 lg:px-8">
          <div className="reveal">
            <p className="text-label-12 text-muted-foreground">
              What you get
            </p>
            <h2 className="text-heading-32 mt-3">
              Everything wired.
            </h2>
            <p className="text-copy-16 mt-4 max-w-2xl text-muted-foreground">
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
                  <h3 className="text-label-14 mt-1">
                    {feature.label}
                  </h3>
                  <p className="text-copy-13 text-muted-foreground">
                    {feature.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-dashed border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">
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
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${ships
        ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
        : "border-amber-500/30 text-amber-600 dark:text-amber-400"
        }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${ships ? "bg-emerald-500" : "bg-amber-500"
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

const COMPARISONS = [
  {
    feature: "Everything in one config",
    tspy: {
      file: "tspy.config.ts",
      code: `import { defineConfig } from "tspy";
import { betterAuth } from "@tspy/better-auth";   // auth
import { prisma } from "@tspy/prisma";             // database
import { anthropic } from "@tspy/anthropic";        // ai
import { celery } from "@tspy/celery";              // jobs

export default defineConfig({
  auth: betterAuth({ emailAndPassword: { enabled: true }, socialProviders: { github: { clientId, clientSecret } } }),
  database: prisma({ provider: "postgresql", url: env("DATABASE_URL") }),
  ai: anthropic({ model: "claude-sonnet-4-5", agents: true, rag: true }),
  jobs: celery({ broker: "redis://localhost:6379" }),
});`,
    },
    nextjs: {
      file: "middleware.ts + lib/db.ts",
      code: `// ── auth ──
import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware({
  publicRoutes: ["/", "/sign-in"],
});

// ── database ──
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// ── ai ──
import OpenAI from "openai";
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── jobs ──
// No built-in — manual BullMQ or custom worker`,
    },
    nuxt: {
      file: "nuxt.config.ts + server/utils/db.ts",
      code: `// ── auth ──
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth"],
  auth: {
    provider: {
      type: "authjs",
      providers: { github({ clientId, clientSecret }) {} },
    },
  },
});

// ── database ──
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// ── ai ──
// No built-in — manual OpenAI SDK in server/api/chat.post.ts

// ── jobs ──
// No built-in — custom BullMQ worker`,
    },
    sveltekit: {
      file: "src/hooks.server.ts + src/lib/server/db.ts",
      code: `// ── auth ──
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
export const handle = SvelteKitAuth({
  providers: [GitHub({ clientId, clientSecret })],
});

// ── database ──
import { PrismaClient } from "@prisma/client";
import { env } from "$env/dynamic/private";
const client = new PrismaClient({ datasources: { db: { url: env.DATABASE_URL } } });
export const db = client;

// ── ai ──
// No built-in — manual OpenAI SDK in src/routes/api/chat/+server.ts

// ── jobs ──
// No built-in — custom worker`,
    },
    tanstack: {
      file: "multiple files",
      code: `// ── auth ──
// Manual Better Auth or Auth.js setup
// providers: [GitHub({ clientId, clientSecret })]

// ── database ──
// Manual Prisma or Drizzle client
// import { PrismaClient } from "@prisma/client"

// ── ai ──
// Manual OpenAI / Anthropic SDK
// import OpenAI from "openai"

// ── jobs ──
// No built-in — custom BullMQ or pg-boss`,
    },
    remix: {
      file: "app/root.tsx + app/lib/db.server.ts",
      code: `// ── auth ──
// Manual session + cookie strategy
// import { sessionStorage } from "~/services/session.server";

// ── database ──
import { PrismaClient } from "@prisma/client";
let db: PrismaClient;
declare global { var db: PrismaClient }
if (!global.db) global.db = new PrismaClient();
db = global.db;

// ── ai ──
// No built-in — manual OpenAI SDK calls

// ── jobs ──
// No built-in — custom BullMQ worker`,
    },
    rails: {
      file: "Gemfile + config/database.yml",
      code: `# ── auth ──
gem "devise"

# ── database ──
# ActiveRecord (built-in)
# config/database.yml:
#   development:
#     adapter: sqlite3
#     database: db/development.sqlite3

# ── ai ──
gem "openai"

# ── jobs ──
# Active Job (built-in)
# app/jobs/`,
    },
    adonisjs: {
      file: "start/routes.ts + app/services",
      code: `// ── auth ──
// @adonisjs/auth starter kit
// import router from "@adonisjs/core/services/router";

// ── database ──
// Lucid ORM (built-in)
// import db from "@adonisjs/lucid/services/db";

// ── ai ──
// Manual openai npm package

// ── jobs ──
// @adonisjs/queue
// import { QueueManager } from "@adonisjs/queue";`,
    },
    wasp: {
      file: "main.wasp",
      code: `app myApp {
  auth: {
    userEntity: User,
    methods: [Email],
  },
  dependencies: [ ("@prisma/client", "5.10.0") ],
}

// ── database ──
// Prisma (auto-generated from entities)

// ── ai ──
// No built-in — manual setup

// ── jobs ──
// Built-in task system
// import { Task } from "wasp/server/jobs";`,
    },
  },
];

function TspyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function NextjsLogo(props: SVGProps<SVGSVGElement>) {
  return <NextIcon {...props} />;
}

function NuxtLogo(props: SVGProps<SVGSVGElement>) {
  return <NuxtIcon {...props} />;
}

function SvelteLogo(props: SVGProps<SVGSVGElement>) {
  return <SvelteIcon {...props} />;
}

function TanstackLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c6.627 0 9.166 4.102 9.166 12S18.626 24 12 24s-9.166-4.096-9.166-12c0-7.898 2.54-12 9.166-12m3.031 17.485c-.861 0-1.33.234-1.708.423-.327.164-.582.292-1.148.292-.567 0-.822-.128-1.148-.292-.378-.189-.848-.423-1.71-.423-.86 0-1.33.234-1.708.423-.327.164-.581.292-1.148.292v1.251c.862 0 1.331-.234 1.709-.423.326-.163.581-.292 1.148-.292s.821.129 1.148.292c.378.189.847.423 1.709.423.861 0 1.33-.234 1.709-.423.326-.163.58-.292 1.147-.292s.822.129 1.148.292c.378.189.848.423 1.71.423v-1.25c-.565 0-.822-.13-1.149-.293-.377-.189-.847-.423-1.709-.423m.41-12.536c.65-.586 0-1.648-.813-1.328-.45.18-.873.438-1.251.779a4.2 4.2 0 0 0-1.202 1.94 4.2 4.2 0 0 0-1.203-1.94 4.3 4.3 0 0 0-1.25-.779c-.814-.32-1.463.742-.814 1.328l2.385 2.153a4.86 4.86 0 0 0-2.731-.839c-.552 0-1.082.09-1.58.26-.836.284-.604 1.532.275 1.532h3.326a4.2 4.2 0 0 0-2.012.988 4 4 0 0 0-.9 1.165c-.403.776.588 1.529 1.237.948l2.686-2.42-.2 6.656c0 .08-.047.158-.107.223a5 5 0 0 1-.257-.123c-.378-.189-.848-.423-1.71-.423-.861 0-1.33.234-1.708.423-.327.164-.581.292-1.148.292v1.251c.861 0 1.33-.234 1.709-.423.326-.164.58-.292 1.148-.292.566 0 .821.128 1.148.292.377.189.847.423 1.708.423.862 0 1.332-.234 1.71-.423.326-.164.58-.292 1.147-.292s.822.128 1.148.292c.378.189.848.423 1.71.423v-1.25c-.565 0-.822-.13-1.149-.293v-.005c-.378-.19-.847-.424-1.709-.424-.861 0-1.33.235-1.709.424-.097.045-.189.094-.283.131a.34.34 0 0 1-.12-.232l-.2-6.69 2.722 2.457c.65.587 1.64-.166 1.236-.948a4.11 4.11 0 0 0-2.911-2.153h3.326c.882 0 1.108-1.245.275-1.531a4.88 4.88 0 0 0-4.311.578l2.385-2.152z" />
    </svg>
  );
}

function RemixLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.856 10.303c.086.554.144 1.125.144 1.697 0 4.226-3.372 7.64-7.544 7.64-2.83 0-5.308-1.44-6.83-3.64l7.764-3.326c.036-.015.072-.03.102-.048.12-.072.24-.15.354-.234.018-.012.036-.024.054-.036l.006-.006c.42-.24.72-.582.888-.972.018-.042.03-.084.042-.126.012-.042.018-.09.018-.138 0-.096-.024-.186-.066-.27l-1.566-3.402c-.066-.144-.156-.276-.27-.396a2.13 2.13 0 00-.396-.27l-3.402-1.566c-.084-.042-.174-.066-.27-.066-.048 0-.096.006-.138.018-.042.012-.084.03-.126.042-.39.168-.732.468-.972.888-.012.018-.024.036-.036.054-.072.114-.15.234-.234.354-.015.03-.03.066-.048.102L5.654 18.85c-1.65-2.158-2.628-4.884-2.628-7.746 0-4.226 3.372-7.64 7.544-7.64 2.83 0 5.308 1.44 6.83 3.64l-7.764 3.326c-.552.24-1.008.648-1.308 1.164a2.868 2.868 0 00-.312 1.308c0 .39.096.762.27 1.092l1.566 3.402c.144.336.336.636.576.888.24.24.54.432.888.576l3.402 1.566c.33.174.702.27 1.092.27.456 0 .894-.108 1.308-.312.516-.3.924-.756 1.164-1.308l3.326-7.764c2.2 1.522 3.64 3.996 3.64 6.83 0 2.862-.978 5.586-2.628 7.746L21.856 10.303z" />
    </svg>
  );
}

function RailsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M.741 19.365h8.36s-1.598-7.291 3.693-10.243l.134-.066c1.286-.637 4.907-2.431 10.702 1.854.19-.159.37-.286.37-.286s-5.503-5.492-11.63-4.878c-3.079.275-6.867 3.079-9.09 6.783C1.058 16.233.741 19.365.741 19.365Zm8.804-.783a10.682 10.682 0 0 1-.127-1.333l1.143.412c.063.498.159.963.254 1.376l-1.27-.455Zm-7.799-4.317L.529 13.82c-.201.455-.423.984-.529 1.27l1.217.444c.137-.359.36-.878.529-1.269Zm7.831.296.857.677c.042-.413.116-.825.222-1.238l-.762-.603c-.137.391-.233.783-.317 1.164Zm2.042-2.646-.508-.762c.191-.243.413-.486.656-.709l.476.72a5.958 5.958 0 0 0-.624.751ZM4.19 8.878l.752.656c-.254.265-.498.551-.72.836l-.815-.698c.244-.265.508-.529.783-.794Zm9.799 1.027-.243-.73c.265-.117.571-.233.931-.339l.233.698a6.82 6.82 0 0 0-.921.371Zm3.122-.656.042-.667c.339.021.688.064 1.048.138l-.042.656a5.859 5.859 0 0 0-1.048-.127ZM8.942 6.392l-.476-.731c-.265.138-.54.286-.826.455l.487.741c.275-.169.54-.328.815-.465Zm9.217-.053.042-.709c-.095-.053-.36-.18-1.026-.371l-.043.699c.349.116.688.243 1.027.381ZM13.238 5.28h.106l-.212-.645c-.328 0-.666.021-1.016.063l.201.625a8.87 8.87 0 0 1 .921-.043Z" />
    </svg>
  );
}

function AdonisLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M0 12c0 9.68 2.32 12 12 12s12-2.32 12-12S21.68 0 12 0 0 2.32 0 12Zm4.84 2.492 3.762-8.555C9.238 4.498 10.46 3.716 12 3.716c1.54 0 2.762.781 3.398 2.223l3.762 8.554c.172.418.32.953.32 1.418 0 2.125-1.492 3.617-3.617 3.617-.726 0-1.3-.183-1.883-.37-.597-.192-1.203-.387-1.98-.387-.77 0-1.39.195-1.996.386-.59.188-1.168.371-1.867.371-2.125 0-3.617-1.492-3.617-3.617 0-.465.148-1 .32-1.418ZM12 7.43l-3.715 8.406c1.102-.512 2.371-.758 3.715-.758 1.297 0 2.613.246 3.664.758Z" />
    </svg>
  );
}

function WaspLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.15 3.06c-.55 0-1.1.07-1.64.21-.22.06-.44.13-.65.21C12.66 4.1 11.48 5 10.52 6.14c-1.07 1.28-1.7 2.8-2.08 4.39-.38 1.59-.52 3.26-.52 4.94v.09c0 1.68.14 3.35.52 4.94.38 1.59 1.01 3.11 2.08 4.39.96 1.14 2.14 2.04 3.34 2.87.22.15.44.29.65.44.54.14 1.09.21 1.64.21s1.1-.07 1.64-.21c.22-.15.44-.29.65-.44 1.2-.83 2.38-1.73 3.34-2.87 1.07-1.28 1.7-2.8 2.08-4.39.38-1.59.52-3.26.52-4.94v-.09c0-1.68-.14-3.35-.52-4.94-.38-1.59-1.01-3.11-2.08-4.39C19.93 5 18.75 4.1 17.79 3.27c-.22-.08-.44-.15-.65-.21-.54-.14-1.09-.21-1.64-.21h.65zM12 7.43l-3.715 8.406c1.102-.512 2.371-.758 3.715-.758 1.297 0 2.613.246 3.664.758Z" />
    </svg>
  );
}

const FRAMEWORKS = [
  { key: "tspy", label: "tspy", url: "https://tspy.vercel.app", Logo: TspyLogo },
  { key: "nextjs", label: "Next.js", url: "https://nextjs.org", Logo: NextjsLogo },
  { key: "nuxt", label: "Nuxt", url: "https://nuxt.com", Logo: NuxtLogo },
  { key: "sveltekit", label: "SvelteKit", url: "https://kit.svelte.dev", Logo: SvelteLogo },
  { key: "tanstack", label: "TanStack Start", url: "https://tanstack.com/start", Logo: TanstackLogo },
  { key: "remix", label: "Remix", url: "https://remix.run", Logo: RemixLogo },
  { key: "rails", label: "Rails", url: "https://rubyonrails.org", Logo: RailsLogo },
  { key: "adonisjs", label: "AdonisJS", url: "https://adonisjs.com", Logo: AdonisLogo },
  { key: "wasp", label: "Wasp", url: "https://wasp-lang.dev", Logo: WaspLogo },
] as const;

type FrameworkKey = (typeof FRAMEWORKS)[number]["key"];

function ComparisonBlock() {
  const [activeFramework, setActiveFramework] = useState<FrameworkKey>("nextjs");

  const comparison = COMPARISONS[0];
  const otherCode = comparison[activeFramework];
  const otherFramework = FRAMEWORKS.find((f) => f.key === activeFramework)!;
  const tspyCode = comparison.tspy;
  const tspyFramework = FRAMEWORKS.find((f) => f.key === "tspy")!;

  return (
    <div className="w-full">
      <Browser address="tspy.dev" url="https://tspy.dev">
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border" style={{ background: "var(--code-bg)" }}>
          {/* Left Pane: TSPY */}
          <div className="flex flex-col overflow-hidden">
            {/* TSPY Tab Header */}
            <div className="flex items-center border-b px-4 py-2" style={{ borderColor: "var(--code-border)", minHeight: "45px" }}>
              <div className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium bg-muted text-foreground">
                <tspyFramework.Logo className="size-3.5" />
                {tspyFramework.label}
              </div>
            </div>

            {/* File Path */}
            <div className="flex items-center px-4 py-2 font-mono text-[11px]" style={{ backgroundColor: "rgba(0,0,0,0.15)", color: "var(--code-header-fg)" }}>
              <span>{tspyCode.file}</span>
            </div>

            <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.7]" style={{ color: "var(--code-fg)", minHeight: "380px" }}>
              <code dangerouslySetInnerHTML={{ __html: highlightVercel(tspyCode.code) }} />
            </pre>
          </div>

          {/* Right Pane: Other Framework */}
          <div className="flex flex-col overflow-hidden">
            {/* Framework Selector Header */}
            <div className="flex items-center gap-1 border-b px-4 py-2 overflow-x-auto" style={{ borderColor: "var(--code-border)", minHeight: "45px" }}>
              {FRAMEWORKS.filter((f) => f.key !== "tspy").map((f) => {
                const Logo = f.Logo;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActiveFramework(f.key)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${activeFramework === f.key
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    title={f.label}
                  >
                    <Logo className="size-3.5" />
                    <span className="hidden sm:inline-block">{f.label}</span>
                  </button>
                );
              })}
            </div>

            {/* File Path */}
            <div className="flex items-center px-4 py-2 font-mono text-[11px]" style={{ backgroundColor: "rgba(0,0,0,0.15)", color: "var(--code-header-fg)" }}>
              <span>{otherCode.file}</span>
            </div>

            <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.7]" style={{ color: "var(--code-fg)", minHeight: "380px" }}>
              <code dangerouslySetInnerHTML={{ __html: highlightVercel(otherCode.code) }} />
            </pre>
          </div>
        </div>
      </Browser>
    </div>
  );
}
