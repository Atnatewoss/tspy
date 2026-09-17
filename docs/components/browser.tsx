"use client";

import type { ReactNode } from "react";

interface BrowserProps {
  address?: string;
  url?: string;
  children: ReactNode;
  className?: string;
}

export function Browser({ address, url, children, className }: BrowserProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-background ${className ?? ""}`}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
        </div>
        {address && (
          <div className="ml-2 flex-1 truncate rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {address}
              </a>
            ) : (
              address
            )}
          </div>
        )}
      </div>
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
