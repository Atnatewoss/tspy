import { readFileSync } from "fs";
import { join } from "path";
import { Marked } from "marked";

const marked = new Marked();

export type HeadingItem = {
  id: string;
  title: string;
  children?: HeadingItem[];
};

// Shared heading identity used by both the HTML renderer and the auto TOC.
// Authors can pin an id explicitly with a trailing `{#id}` marker.
function parseHeading(text: string, depth: number): { id: string; clean: string } {
  const match = text.match(/\{#([\w-]+)\}\s*$/);
  const clean = match ? text.replace(/\{#[\w-]+\}\s*$/, "") : text;
  const fallback = clean
    .replace(/<[^>]*>/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return { id: match ? match[1] : fallback || `heading-${depth}`, clean };
}

// Give every heading an id so the right-side "On this page" TOC can anchor to it.
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const { id, clean } = parseHeading(this.parser.parseInline(tokens), depth);
      return `<h${depth} id="${id}">${clean}</h${depth}>`;
    },
  },
});

export function readMarkdown(slug: string): string {
  const candidates = [
    join(process.cwd(), "content", `${slug}.md`),
    join(process.cwd(), "content", slug, "index.md"),
  ];
  for (const filePath of candidates) {
    try {
      return readFileSync(/*turbopackIgnore: true*/ filePath, "utf-8");
    } catch {
      // try next candidate
    }
  }
  return "";
}

export function markdownToHtml(slug: string): string {
  const md = readMarkdown(slug);
  if (!md) return "";
  const result = marked.parse(md);
  if (typeof result === "string") return result;
  return "";
}

// Derive a right-side TOC straight from the markdown headings (h2, plus h3
// nested under their parent h2). Used when a page has no curated subsections.
export function extractHeadings(slug: string): HeadingItem[] {
  const md = readMarkdown(slug);
  if (!md) return [];

  const flat: { id: string; title: string; depth: number }[] = [];
  const collector = new Marked();
  collector.use({
    renderer: {
      heading({ tokens, depth }) {
        const { id, clean } = parseHeading(this.parser.parseInline(tokens), depth);
        flat.push({ id, title: clean, depth });
        return "";
      },
    },
  });
  collector.parse(md);

  const roots: HeadingItem[] = [];
  let current: HeadingItem | undefined;
  for (const heading of flat) {
    if (heading.depth <= 2) {
      current = { id: heading.id, title: heading.title };
      roots.push(current);
    } else if (heading.depth === 3 && current) {
      current.children = [
        ...(current.children ?? []),
        { id: heading.id, title: heading.title },
      ];
    }
  }
  return roots;
}
