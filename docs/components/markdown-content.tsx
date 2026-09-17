"use client";

export function MarkdownContent({ html }: { html: string }) {
  if (!html) return null;

  return (
    <div
      className="docs-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
