import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs-shell";
import { LogoIcon } from "@/components/icons";
import { SectionContent } from "@/components/section-content";
import { SectionPrevNext } from "@/components/section-prev-next";
import { DOCS_NAV, getAdjacent, getSection, sectionsFor } from "@/lib/sections";

const CREATE_COMMAND = "npx create-tspy-app@latest my-app";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionsFor("docs").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/[slug]">): Promise<Metadata> {
  const section = getSection((await params).slug);
  if (!section) return {};
  return { title: section.title };
}

export default async function DocsPage({ params }: PageProps<"/docs/[slug]">) {
  const section = getSection((await params).slug);
  if (!section) notFound();

  const { prev, next } = getAdjacent(section.slug, "docs");

  return (
    <DocsShell nav={DOCS_NAV} toc={section.subsections}>
      {section.slug === "introduction" && (
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-muted/30 py-10 pl-8 pr-8 sm:py-12 sm:pl-12 sm:pr-12">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
            <LogoIcon className="size-16 shrink-0 text-foreground sm:size-20" />
            <div>
              <p className="font-pixel-strong text-2xl leading-none text-foreground">
                tspy
              </p>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                The fullstack framework for the web and its intelligence -
                TypeScript owns the web, Python owns the AI and the jobs.
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                <span aria-hidden className="text-foreground">$</span>
                {CREATE_COMMAND}
              </p>
            </div>
          </div>
        </div>
      )}
      <article className="py-8 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {section.group}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {section.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          {section.intro}
        </p>
        <div className="mt-6">
          <SectionContent slug={section.slug} />
        </div>
        <SectionPrevNext prev={prev} next={next} />
      </article>
    </DocsShell>
  );
}