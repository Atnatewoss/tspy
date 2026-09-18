"use client";

import { Command } from "cmdk";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { type NavGroup, type NavItem } from "@/lib/sections";

function flatten(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [
    ...(item.href ? [item] : []),
    ...(item.children ? flatten(item.children) : []),
  ]);
}

export function CommandMenu({
  nav,
  open,
  onOpenChange,
}: {
  nav: NavGroup[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

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

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search documentation"
      className="fixed inset-0 z-50"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed left-1/2 top-[20%] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex items-center border-b border-border px-4">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <Command.Input
            placeholder="Search docs…"
            className="h-12 w-full bg-transparent pl-3 text-label-14 outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-label-12-mono text-muted-foreground">
            esc
          </kbd>
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-copy-14 text-muted-foreground">
            No results found.
          </Command.Empty>
          {nav.map((group) => (
            <Command.Group
              key={group.title}
              heading={group.title}
              className="mb-2"
            >
              {flatten(group.items).map((item) => (
                <Command.Item
                  key={`${group.title}-${item.href}`}
                  value={`${group.title} ${item.title}`}
                  onSelect={() => {
                    router.push(item.href);
                    onOpenChange(false);
                  }}
                  className="flex cursor-pointer items-center rounded-md px-3 py-2 text-label-14 text-muted-foreground hover:bg-muted hover:text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground"
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
