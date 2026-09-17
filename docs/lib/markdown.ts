import { readFileSync } from "fs";
import { join } from "path";
import { Marked } from "marked";

const marked = new Marked();

export function readMarkdown(slug: string): string {
  const filePath = join(process.cwd(), "content", `${slug}.md`);
  try {
    return readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

export function markdownToHtml(slug: string): string {
  const md = readMarkdown(slug);
  if (!md) return "";
  const result = marked.parse(md);
  if (typeof result === "string") return result;
  return "";
}
