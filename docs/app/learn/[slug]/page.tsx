import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs-shell";
import { SectionContent } from "@/components/section-content";
import { SectionPrevNext } from "@/components/section-prev-next";
import { LEARN_NAV, getAdjacent, getSection, sectionsFor } from "@/lib/sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionsFor("learn")
    .map((s) => ({ slug: s.slug.replace("learn/", "") }));
}

export async function generateMetadata({
  params,
}: PageProps<"/learn/[slug]">): Promise<Metadata> {
  const rawSlug = `learn/${(await params).slug}`;
  const section = getSection(rawSlug);
  if (!section) return {};
  return { title: `${section.title} · TSPY Guidebook` };
}

export default async function LearnPage({ params }: PageProps<"/learn/[slug]">) {
  const rawSlug = `learn/${(await params).slug}`;
  const section = getSection(rawSlug);
  if (!section) notFound();

  const { prev, next } = getAdjacent(rawSlug, "learn");
  const prevAdj = prev
    ? { ...prev, slug: prev.slug.startsWith("learn/") ? prev.slug.replace("learn/", "") : prev.slug }
    : undefined;
  const nextAdj = next
    ? { ...next, slug: next.slug.startsWith("learn/") ? next.slug.replace("learn/", "") : next.slug }
    : undefined;

  return (
    <DocsShell nav={LEARN_NAV} toc={section.subsections}>
      <article className="py-8 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          TSPY Guidebook · {section.group}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {section.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          {section.intro}
        </p>
        <div className="mt-6">
          <SectionContent slug={rawSlug} />
        </div>
        <SectionPrevNext prev={prevAdj} next={nextAdj} />
      </article>
    </DocsShell>
  );
}
