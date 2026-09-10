import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Changelog · TSPY",
  description:
    "Every change to TSPY - new templates, routing upgrades, and fixes, newest first.",
};

const ENTRIES: {
  version: string;
  date: string;
  title: string;
  tag: "release" | "improvement" | "fix";
  items: string[];
}[] = [
  {
    version: "v0.4.0",
    date: "September 15, 2026",
    title: "Landing refresh",
    tag: "release",
    items: [
      "New centered pill navigation with Docs, Learn, and Changelog.",
      "Hero rebuilt: film grain, light beam, and a bottom fade that pools into darkness.",
      "Feature grid redesigned as a sticky-left, scrollable-right layout.",
      "Global focus-visible rings, selection colors, and hover states in both themes.",
    ],
  },
  {
    version: "v0.3.0",
    date: "August 30, 2026",
    title: "Learn guidebook",
    tag: "release",
    items: [
      "New /learn section explaining the routing engine, layout adaptation, and dev server lifecycle.",
      "Build-time route discovery documented end to end, from parser to virtual module.",
    ],
  },
  {
    version: "v0.2.0",
    date: "August 12, 2026",
    title: "AI and jobs templates",
    tag: "release",
    items: [
      "@tspy/anthropic, @tspy/google, and @tspy/ollama plugin packages.",
      "Celery, RQ, and Dramatiq job templates with a Redis or RabbitMQ broker.",
      "ai/ and jobs/ now scaffold at the project top level, never under the server.",
    ],
  },
  {
    version: "v0.1.0",
    date: "July 21, 2026",
    title: "Initial public scaffold",
    tag: "release",
    items: [
      "create-tspy with arrow-key menus, checklists, and flags.",
      "Vite + Nitro dev server, /api proxied automatically.",
      "Auth and database templates for Better Auth, Clerk, Prisma, and Drizzle.",
    ],
  },
];

const TAG_STYLES: Record<(typeof ENTRIES)[number]["tag"], string> = {
  release: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  improvement: "border-sky-500/30 text-sky-600 dark:text-sky-400",
  fix: "border-amber-500/30 text-amber-600 dark:text-amber-400",
};

export default function ChangelogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="changelog" />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-14">
          <p className="font-pixel text-xs uppercase tracking-wider text-muted-foreground">
            TSPY
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Changelog
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Every change to the framework - new templates, routing upgrades,
            and fixes. Newest first.
          </p>
        </div>

        <ol className="relative space-y-14 border-l border-dashed border-border pl-8">
          {ENTRIES.map((entry) => (
            <li key={entry.version} className="relative">
              <span
                aria-hidden
                className="absolute -left-[38px] top-1.5 size-2.5 rounded-full border border-border bg-background"
              />
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-mono text-sm font-semibold tracking-tight">
                  {entry.version}
                </h2>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${TAG_STYLES[entry.tag]}`}
                >
                  {entry.tag}
                </span>
                <time className="ml-auto font-mono text-xs text-muted-foreground">
                  {entry.date}
                </time>
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                {entry.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {entry.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-6 text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-[11px] size-1 shrink-0 rounded-full bg-muted-foreground/60"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
