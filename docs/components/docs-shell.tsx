"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CloseIcon,
  GithubIcon,
  LogoIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { TableOfContents } from "@/components/table-of-contents";
import {
  DOCS_NAV,
  GITHUB_URL,
  type NavGroup,
  type TocItem,
} from "@/lib/sections";

function isTyping(target: EventTarget | null) {
  const node = target as HTMLElement | null;
  return (
    node?.tagName === "INPUT" ||
    node?.tagName === "TEXTAREA" ||
    node?.isContentEditable
  );
}

function SidebarNav({
  groups,
  activeHref,
  onNavigate,
}: {
  groups: NavGroup[];
  activeHref: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-7">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </h3>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "true" : undefined}
                    className={
                      active
                        ? "block rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
                        : "block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsShell({
  toc,
  nav,
  children,
}: {
  toc?: TocItem[];
  nav: NavGroup[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(toc?.[0]?.id ?? "");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "/" && !isTyping(e.target)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toc || toc.length === 0) return;
    const ids = toc.map((t) => t.id);
    function onScroll() {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveId(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nav;
    return nav.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          group.title.toLowerCase().includes(q)
      ),
    })).filter((group) => group.items.length > 0);
  }, [query, nav]);

  const activeHref = pathname === "/" ? "/" : pathname;

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-background/80 backdrop-blur transition-[shadow,border-color] ${
          scrolled
            ? "border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            : "border-b border-transparent"
        }`}
      >
        <div className="relative flex h-16 items-center gap-2 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          >
            <MenuIcon className="size-4" />
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2">
            <LogoIcon className="size-8" />
            <span className="text-[17px] font-semibold tracking-tight">
              tspy
            </span>
          </Link>

          <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="relative hidden w-full max-w-md md:block">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search docs…"
                aria-label="Search docs"
                className="h-9 w-full rounded-lg border border-border bg-muted pl-9 pr-12 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/25 focus:bg-background"
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
                /
              </kbd>
            </div>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="tspy on GitHub"
              title="GitHub"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <GithubIcon className="size-[18px]" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex lg:px-8">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-[260px] shrink-0 overflow-y-auto border-border py-8 pr-6 lg:block lg:border-r">
          <SidebarNav groups={filtered} activeHref={activeHref} />
        </aside>

        <div className="min-w-0 flex-1 px-4 pb-24 pt-3 sm:px-8 lg:px-12">
          <main id="docs-main" className="mx-auto max-w-4xl">
            {children}
          </main>
        </div>

        {toc !== undefined && (
          <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-[260px] shrink-0 overflow-y-auto pl-6 pr-2 py-8 xl:block">
            <TableOfContents items={toc} activeId={activeId} />
          </aside>
        )}
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-[300px] max-w-[85vw] flex-col border-r border-border bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 h-16">
              <span className="text-[17px] font-semibold tracking-tight">
                tspy
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto border-border px-3 py-6">
              <SidebarNav
                groups={filtered}
                activeHref={activeHref}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}