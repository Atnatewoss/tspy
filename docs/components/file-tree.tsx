import type { ReactNode } from "react";
import { ChevronRightIcon } from "@/components/icons";

interface TreeProps {
  children: ReactNode;
  className?: string;
}

interface FolderProps {
  name: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}

interface FileProps {
  name: string;
  type?: string;
  href?: string;
}

export function Tree({ children, className }: TreeProps) {
  return (
    <div
      className={`font-mono text-sm text-foreground ${className ?? ""}`}
      role="tree"
    >
      {children}
    </div>
  );
}

export function Folder({ name, defaultOpen = false, children }: FolderProps) {
  return (
    <details open={defaultOpen} role="treeitem">
      <summary className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
        <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground [[open]>&]:rotate-90" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        <span>{name}</span>
      </summary>
      <div className="ml-4 border-l border-border pl-2">{children}</div>
    </details>
  );
}

export function File({ name, type, href }: FileProps) {
  const content = (
    <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
      <span className="ml-5" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 shrink-0 text-muted-foreground"
        aria-hidden
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
      <span>{name}</span>
      {type && (
        <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
          {type}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block" role="treeitem">
        {content}
      </a>
    );
  }

  return <div role="treeitem">{content}</div>;
}
