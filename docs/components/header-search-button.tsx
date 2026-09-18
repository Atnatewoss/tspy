"use client";

import { SearchIcon } from "@/components/icons";

export function HeaderSearchButton({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 text-label-14 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground ${className}`}
    >
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
      <span className="hidden lg:inline">Search</span>
      <kbd className="hidden rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-label-12-mono text-muted-foreground lg:inline">
        ⌘K
      </kbd>
    </button>
  );
}