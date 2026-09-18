import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs-shell";
import { MarkdownContent } from "@/components/markdown-content";
import { SectionPrevNext } from "@/components/section-prev-next";
import { DOCS_NAV, DOCS_SECTION_DEFS, getAdjacent, getSection, sectionsFor } from "@/lib/sections";
import { markdownToHtml, extractHeadings } from "@/lib/markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionsFor("docs").map((s) => ({ slug: s.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolved = await params;
  const slugStr = Array.isArray(resolved.slug) ? resolved.slug.join("/") : resolved.slug;
  const section = getSection(slugStr);
  if (!section) return {};
  return { title: section.title };
}

export default async function DocsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolved = await params;
  const slugStr = Array.isArray(resolved.slug) ? resolved.slug.join("/") : resolved.slug;
  const section = getSection(slugStr);
  if (!section) notFound();

  const { prev, next } = getAdjacent(section.slug);
  const html = markdownToHtml(section.slug);

  // Curated subsections win; anything else gets a TOC derived from headings.
  const autoToc = section.subsections.length > 0 ? [] : extractHeadings(section.slug);
  const toc =
    section.subsections.length > 0
      ? section.subsections
      : autoToc.length > 0
        ? autoToc
        : undefined;

  // Breadcrumb: only for pages nested deeper than one level (e.g. AI / Providers / OpenAI).
  // Parent pages show their group; flat children show nothing.
  const isChild = !DOCS_SECTION_DEFS.some((s) => s.slug === section.slug);
  const breadcrumbs: string[] = isChild
    ? section.subcategory
      ? [section.subcategory, section.title]
      : []
    : [section.group];

  return (
    <DocsShell nav={DOCS_NAV} toc={toc}>
      <article className="py-8 sm:py-12">
        <div className="flex items-center gap-1.5 text-label-12 text-muted-foreground">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-1.5">
              {i > 0 && <span className="opacity-40">/</span>}
              <span>{crumb}</span>
            </span>
          ))}
        </div>
        <h1 className="text-heading-40 mt-3">
          {section.title}
        </h1>
        {section.intro && (
          <p className="text-copy-16 mt-5 text-muted-foreground">
            {section.intro}
          </p>
        )}
        <div className="mt-6">
          <MarkdownContent html={html} />
        </div>
        <SectionPrevNext prev={prev} next={next} />
      </article>
    </DocsShell>
  );
}
