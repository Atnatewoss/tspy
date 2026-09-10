import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { sectionsFor } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Learn · TSPY Guidebook",
  description:
    "A developer's guide to how TSPY works from the inside out - the decisions, the tradeoffs, and why the framework is built this way.",
};

const CHAPTERS = sectionsFor().filter((s) => s.slug.startsWith("learn/"));

export default function LearnIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="learn" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="font-pixel text-xs uppercase tracking-wider text-muted-foreground">
            TSPY Guidebook
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Learn
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            A developer&apos;s guide to how TSPY works from the inside out - the
            decisions, the tradeoffs, and why the framework is built this way.
            These chapters are not docs; they are explanations.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CHAPTERS.map((chapter, i) => (
            <Link
              key={chapter.slug}
              href={`/learn/${chapter.slug.replace("learn/", "")}`}
              className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/30 hover:bg-muted/40"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                {chapter.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {chapter.intro}
              </p>
              {chapter.subsections.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {chapter.subsections.map((sub) => (
                    <li
                      key={sub.id}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {sub.title}
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
