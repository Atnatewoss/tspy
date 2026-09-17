"use client";

import { Command } from "cmdk";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { type NavGroup } from "@/lib/sections";

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function SearchInput({
  nav,
  open,
  onOpenChange,
}: {
  nav: NavGroup[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search documentation"
      className="fixed inset-0 z-50"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="fixed left-1/2 top-[20%] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex items-center border-b border-border px-3">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <Command.Input
            ref={inputRef}
            placeholder="Search docs…"
            className="h-11 w-full bg-transparent pl-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
            esc
          </kbd>
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>
          {nav.map((group) => (
            <Command.Group
              key={group.title}
              heading={group.title}
              className="mb-2"
            >
              {group.items.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.title}
                  onSelect={() => {
                    router.push(item.href);
                    onOpenChange(false);
                  }}
                  className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground"
                >
                  {item.title}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
