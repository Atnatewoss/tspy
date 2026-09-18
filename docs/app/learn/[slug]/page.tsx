import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn-shell";
import { LEARN_CONTENT } from "@/components/learn";
import { ArrowLeftIcon, ArrowRightIcon, PencilIcon } from "@/components/icons";
import {
  LEARN_CHAPTERS,
  getLearnAdjacent,
  getLearnChapter,
  learnPartOf,
  type LearnChapter,
} from "@/lib/learn";
import { GITHUB_URL } from "@/lib/sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEARN_CHAPTERS.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getLearnChapter(slug);
  if (!chapter) return {};
  return { title: chapter.title, description: chapter.blurb };
}

function LearnPager({
  prev,
  next,
}: {
  prev?: LearnChapter;
  next?: LearnChapter;
}) {
  return (
    <div className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/learn/${prev.slug}`}
          className="group rounded-xl border border-border p-4 transition-colors hover:bg-muted"
        >
          <span className="flex items-center gap-1.5 text-label-12 text-muted-foreground">
            <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="mt-1.5 block text-label-14 text-foreground">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={`/learn/${next.slug}`}
          className="group rounded-xl border border-border p-4 text-right transition-colors hover:bg-muted"
        >
          <span className="flex items-center justify-end gap-1.5 text-label-12 text-muted-foreground">
            Next
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1.5 block text-label-14 text-foreground">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

export default async function LearnChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getLearnChapter(slug);
  if (!chapter) notFound();

  const part = learnPartOf(slug);
  const { prev, next } = getLearnAdjacent(slug);
  const content = LEARN_CONTENT[slug];

  return (
    <LearnShell>
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-label-12-mono uppercase tracking-[0.12em] text-muted-foreground">
        <span>{part?.title}</span>
        <span className="opacity-40">/</span>
        <span>{chapter.title}</span>
      </div>

      <h1 className="text-heading-40 mt-3">{chapter.title}</h1>
      <p className="text-copy-16 mt-4 text-muted-foreground">{chapter.blurb}</p>

      <div className="mt-6">{content}</div>

      <LearnPager prev={prev} next={next} />

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-dashed border-border pt-6">
        <a
          href={`${GITHUB_URL}/edit/main/docs/components/learn/${slug}.tsx`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-label-13 text-muted-foreground transition-colors hover:text-foreground"
        >
          <PencilIcon className="size-3.5" />
          Edit this chapter
        </a>
        <p className="font-mono text-label-12-mono text-muted-foreground/60">
          {String(
            LEARN_CHAPTERS.findIndex((c) => c.slug === slug) + 1
          ).padStart(2, "0")}{" "}
          / {String(LEARN_CHAPTERS.length).padStart(2, "0")}
        </p>
      </div>
    </LearnShell>
  );
}