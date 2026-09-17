"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CloseIcon,
  GithubIcon,
  LogoIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/icons";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TableOfContents } from "@/components/table-of-contents";
import { SearchInput } from "@/components/search-input";
import {
  GITHUB_URL,
  type NavGroup,
  type NavItem,
  type TocItem,
} from "@/lib/sections";

const GROUP_ICONS: Record<string, string> = {
  "Get Started": "M13 10V3L4 14h7v7l9-11h-7z",
  Concepts:
    "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  "Build & Dev":
    "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  Integrations:
    "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
  Runtime: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  Deployment:
    "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  "CI/CD":
    "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9",
  "Agentic Integration":
    "M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z",
  Reference:
    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
};

const SUBCATEGORY_ICONS: Record<string, string> = {
  Core: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  "Data & APIs":
    "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
  Integrations:
    "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
};

// Subcategory headings use SimpleIcons CDN for brand icons
const SUBCATEGORY_BRAND_ICONS: Record<string, string> = {
  Auth: "betterauth",
  Database: "prisma",
  AI: "openai",
  Jobs: "celery",
};
// Per-item brand icons for sidebar links
const ITEM_BRAND_ICONS: Record<string, string> = {
  // Auth providers
  "Better Auth": "betterauth",
  "Clerk": "clerk",
  "Firebase": "firebase",
  "Supabase": "supabase",
  "WorkOS": "workos",
  // Database
  "Prisma": "prisma",
  "Drizzle": "drizzle",
  "Kysely": "kysely",
  // AI
  "Agents": "openai",
  "LLM": "anthropic",
  "MCP": "claude",
  "Prompts": "openai",
  "RAG": "langchain",
  // Jobs
  "Celery": "celery",
  "RQ": "redis",
  "Dramatiq": "rabbitmq",
};


function GroupIcon({ title }: { title: string }) {
  const d = GROUP_ICONS[title];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0 text-muted-foreground"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

type SidebarEntry =
  | { kind: "item"; item: NavItem }
  | { kind: "subcategory"; item: NavItem; items: NavItem[] }
  | { kind: "children"; items: NavItem[] };

function groupItems(items: NavItem[]): SidebarEntry[] {
  const entries: SidebarEntry[] = [];
  let i = 0;
  while (i < items.length) {
    if (items[i].isChild) {
      const children: NavItem[] = [];
      while (i < items.length && items[i].isChild) {
        children.push(items[i]);
        i++;
      }
      entries.push({ kind: "children", items: children });
    } else if (items[i].children && items[i].children!.length > 0) {
      entries.push({ kind: "subcategory", item: items[i], items: items[i].children! });
      i++;
    } else {
      entries.push({ kind: "item", item: items[i] });
      i++;
    }
  }
  return entries;
}

function SidebarChildItem({
  item,
  activeHref,
  onNavigate,
}: {
  item: NavItem;
  activeHref: string;
  onNavigate?: () => void;
}) {
  // Item with its own sub-children (e.g. Auth > Overview, Better Auth)
  if (item.children && item.children.length > 0) {
    return (
      <li className="relative ml-3">
        <div aria-hidden className="absolute left-[-1px] top-0 bottom-0 w-px bg-border" />
        {/* Section title */}
        <div className="flex items-center gap-2 py-1.5 pl-5">
          <div aria-hidden className="absolute left-[-4.5px] top-[9px] h-[5px] w-[5px] rounded-full border border-border bg-background" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {item.title}
          </span>
        </div>
        {/* Sub-items */}
        <ul className="flex flex-col gap-0.5 pb-2">
              {item.children.map((child) => {
            const active = activeHref === child.href;
            return (
              <li key={child.href} className="relative">
                <div aria-hidden className="absolute left-[-20px] top-[13px] h-px w-[17px] bg-border" />
                {active && (
                  <div aria-hidden className="absolute -left-[13px] top-0 bottom-0 w-px bg-foreground" />
                )}
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  scroll={false}
                  aria-current={active ? "true" : undefined}
                  className={`block rounded-md px-3 py-1.5 pl-5 text-[13px] transition-colors ${
                    active
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  // Simple child item (no sub-children)
  const active = activeHref === item.href;
  return (
    <li key={item.href} className="relative">
      <div aria-hidden className="absolute left-[-1px] top-[13px] h-px w-[12px] bg-border" />
      {active && (
        <div aria-hidden className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-foreground" />
      )}
      <Link
        href={item.href}
        onClick={onNavigate}
        scroll={false}
        aria-current={active ? "true" : undefined}
        className={`flex items-center gap-2 rounded-md px-3 py-1.5 pl-5 text-[13px] transition-colors ${
          active
            ? "bg-muted font-medium text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        {ITEM_BRAND_ICONS[item.title] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.simpleicons.org/${ITEM_BRAND_ICONS[item.title]}/a1a1aa`}
            alt=""
            aria-hidden
            width={14}
            height={14}
            className="size-3.5 shrink-0 opacity-80"
          />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3.5 shrink-0 opacity-50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        )}
        {item.title}
      </Link>
    </li>
  );
}

const SidebarNav = memo(function SidebarNav({
  groups,
  activeHref,
  onNavigate,
}: {
  groups: NavGroup[];
  activeHref: string;
  onNavigate?: () => void;
}) {
  // Determine which group contains the active href
  const activeGroupTitle = useMemo(() => {
    for (const group of groups) {
      for (const item of group.items) {
        if (item.href === activeHref) return group.title;
        if (item.children) {
          for (const child of item.children) {
            if (child.href === activeHref) return group.title;
          }
        }
      }
    }
    return null;
  }, [groups, activeHref]);

  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    return new Set(["Get Started"]);
  });

  // Auto-open the group containing the active item on navigation
  // but don't toggle if user manually opened another group
  useEffect(() => {
    if (activeGroupTitle && !openGroups.has(activeGroupTitle)) {
      setOpenGroups(new Set([activeGroupTitle]));
    }
  // Only re-run when the active group changes, not on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGroupTitle]);

  function toggleGroup(title: string) {
    setOpenGroups((prev) => {
      // If clicking the open group, collapse it (allow fully closed)
      if (prev.has(title)) return new Set();
      // Otherwise open only this group
      return new Set([title]);
    });
  }

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-0.5">
      {groups.map((group) => {
        const entries = groupItems(group.items);
        const isOpen = openGroups.has(group.title);
        const groupHasActive = entries.some((e) => {
          if (e.kind === "item") return activeHref === e.item.href;
          if (e.kind === "subcategory")
            return e.items.some((c) => activeHref === c.href);
          return e.items.some((c) => activeHref === c.href);
        });
        // We use a useEffect below to handle auto-expanding groups when activeHref changes,
        // so we shouldn't mutate openGroups directly during render.
        return (
          <div key={group.title}>
            {/* Group title — clickable toggle */}
            <button
              type="button"
              onClick={() => toggleGroup(group.title)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left cursor-pointer transition-colors hover:bg-muted"
              aria-expanded={isOpen}
            >
              <GroupIcon title={group.title} />
              <span className="text-label-12 flex-1 text-muted-foreground">
                {group.title}
              </span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`size-3.5 shrink-0 text-muted-foreground transition-transform duration-150 ${
                  isOpen ? "" : "-rotate-90"
                }`}
                aria-hidden
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            {/* Collapsible content — grid-rows trick enables smooth simultaneous open/close */}
            <div
              className="grid transition-all duration-200 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
              {/* Items — vertical line runs alongside them */}
              <div className="relative ml-5 border-l border-border pl-5 pt-0.5 pb-2">
                <ul className="flex flex-col gap-0.5">
                {entries.map((entry, idx) => {
                  if (entry.kind === "item") {
                    const active = activeHref === entry.item.href;
                    return (
                      <li key={entry.item.href} className="relative">
                        {/* Horizontal branch from vertical line */}
                        <div aria-hidden className="absolute left-[-20px] top-[13px] h-px w-[17px] bg-border" />
                        {active && (
                          <div aria-hidden className="absolute -left-[20px] top-0 bottom-0 w-px bg-foreground" />
                        )}
                        <Link
                          href={entry.item.href}
                          onClick={onNavigate}
                          scroll={false}
                          aria-current={active ? "true" : undefined}
                          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                            entry.item.isChild ? "pl-8 text-[13px]" : ""
                          } ${
                            active
                              ? "bg-muted font-medium text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {ITEM_BRAND_ICONS[entry.item.title] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={`https://cdn.simpleicons.org/${ITEM_BRAND_ICONS[entry.item.title]}/a1a1aa`}
                              alt=""
                              aria-hidden
                              width={14}
                              height={14}
                              className="size-3.5 shrink-0 opacity-80"
                            />
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3.5 shrink-0 opacity-50">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                          )}
                          {entry.item.title}
                        </Link>
                      </li>
                    );
                  }

                  if (entry.kind === "subcategory") {
                    const subIcon = SUBCATEGORY_ICONS[entry.item.title];
                    const brandIcon = SUBCATEGORY_BRAND_ICONS[entry.item.title];
                    const isActive = activeHref === entry.item.href;
                    return (
                      <li key={`sub-${entry.item.title}-${idx}`} className="relative mt-3 first:mt-0">
                        {/* Horizontal branch connecting title to parent vertical line */}
                        <div aria-hidden className="absolute left-[-20px] top-[11px] h-px w-[17px] bg-border" />
                        {/* Subcategory title — clickable link */}
                        <Link
                          href={entry.item.href}
                          onClick={onNavigate}
                          scroll={false}
                          className={`relative flex items-center gap-2 py-1.5 transition-colors ${
                            isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {brandIcon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={`https://cdn.simpleicons.org/${brandIcon}/a1a1aa`}
                              alt=""
                              aria-hidden
                              width={14}
                              height={14}
                              className="size-3.5 shrink-0 opacity-80"
                            />
                          ) : subIcon ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-3.5 shrink-0 text-muted-foreground"
                              aria-hidden
                            >
                              <path d={subIcon} />
                            </svg>
                          ) : null}
                          <span className="text-label-12">
                            {entry.item.title}
                          </span>
                        </Link>
                        {/* Nested items always visible when group is open */}
                        <div className="relative ml-3 border-l border-border pl-5">
                          <ul className="flex flex-col gap-0.5">
                            {entry.items.map((child) => {
                              const active = activeHref === child.href;
                              return (
                                <li key={child.href} className="relative">
                                  <div aria-hidden className="absolute left-[-1px] top-[13px] h-px w-[12px] bg-border" />
                                  {active && (
                                    <div aria-hidden className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-foreground" />
                                  )}
                                  <Link
                                    href={child.href}
                                    onClick={onNavigate}
                                    scroll={false}
                                    aria-current={active ? "true" : undefined}
                                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 pl-5 text-[13px] transition-colors ${
                                      active
                                        ? "bg-muted font-medium text-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                                  >
                                    {ITEM_BRAND_ICONS[child.title] ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        src={`https://cdn.simpleicons.org/${ITEM_BRAND_ICONS[child.title]}/a1a1aa`}
                                        alt=""
                                        aria-hidden
                                        width={14}
                                        height={14}
                                        className="size-3.5 shrink-0 opacity-80"
                                      />
                                    ) : (
                                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3.5 shrink-0 opacity-50">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                      </svg>
                                    )}
                                    {child.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                    );
                  }

                  // Children group — nested vertical line to the right
                  return (
                    <li key={`children-${idx}`} className="relative ml-3">
                      <div aria-hidden className="absolute left-[-1px] top-0 bottom-0 w-px bg-border" />
                      <ul className="flex flex-col gap-0.5">
                        {entry.items.map((child) => (
                          <SidebarChildItem
                            key={child.href}
                            item={child}
                            activeHref={activeHref}
                            onNavigate={onNavigate}
                          />
                        ))}
                      </ul>
                    </li>
                  );
                })}
                </ul>
              </div>
            </div>{/* end overflow-hidden */}
            </div>{/* end grid wrapper */}
          </div>
        );
      })}
    </nav>
  );
});

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(toc?.[0]?.id ?? "");
  const sidebarRef = useRef<HTMLElement>(null);

  // Stable nav reference — prevent re-renders when nav data hasn't changed
  const stableNav = useMemo(() => nav, [nav]);

  // Sidebar scroll restoration (Farm.js approach: sessionStorage + ensureActiveVisible)
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const storageKey = "tspy-docs-sidebar-scroll";

    // Read saved position
    function readSaved(): { path: string; scrollTop: number } | null {
      try {
        const raw = sessionStorage.getItem(storageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : null;
      } catch {
        return null;
      }
    }

    // Save current position
    function save(targetPath?: string) {
      if (!sidebar) return;
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            path: targetPath ?? location.pathname,
            scrollTop: sidebar.scrollTop,
          })
        );
      } catch {
        // Ignore storage errors
      }
    }

    // Restore on navigation
    const saved = readSaved();
    if (saved?.path === pathname && Number.isFinite(saved.scrollTop)) {
      sidebar.scrollTop = saved.scrollTop;
    } else {
      // New page — scroll active link into view
      const active = sidebar.querySelector('a[aria-current="true"]');
      if (active instanceof HTMLElement) {
        const activeRect = active.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        if (
          activeRect.top < sidebarRect.top ||
          activeRect.bottom > sidebarRect.bottom
        ) {
          sidebar.scrollTop +=
            activeRect.top -
            sidebarRect.top -
            (sidebar.clientHeight - activeRect.height) / 2;
        }
      }
    }

    // Persist on scroll
    sidebar.addEventListener("scroll", () => save(), { passive: true });

    // Save target path on link click
    sidebar.addEventListener("click", (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (!target) return;
      try {
        save(new URL(target.getAttribute("href") ?? "", location.href).pathname);
      } catch {
        save();
      }
    });

    // Save on page unload
    window.addEventListener("beforeunload", () => save());

    return () => {
      sidebar.removeEventListener("scroll", () => save());
      window.removeEventListener("beforeunload", () => save());
    };
  }, [pathname]);

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
        setMenuOpen((o) => !o);
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

  const activeHref = pathname === "/" ? "/" : pathname;

  return (
    <>
      <SearchInput nav={stableNav} open={menuOpen} onOpenChange={setMenuOpen} />
      <header
        className={`sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : ""
        }`}
      >
        <div className="relative flex h-14 items-center gap-2 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          >
            <MenuIcon className="size-4" />
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2">
            <LogoIcon className="size-6" />
            <span className="text-[16px] font-semibold tracking-tight">
              tspy
            </span>
          </Link>

          <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="hidden h-9 w-full max-w-md cursor-pointer items-center gap-2 rounded-lg border border-border bg-muted pl-3 pr-12 text-sm text-muted-foreground transition-colors hover:bg-muted/80 md:flex"
            >
              <SearchIcon className="size-4 shrink-0" />
              <span>Search docs…</span>
              <kbd className="pointer-events-none ml-auto rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>

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
            <ThemeSwitcher small />
          </div>
        </div>
      </header>

      <div className="flex lg:pl-4">
        <aside ref={sidebarRef} className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-[260px] shrink-0 overflow-y-auto overscroll-contain border-border py-8 pr-4 lg:block lg:border-r">
          <SidebarNav groups={stableNav} activeHref={activeHref} />
        </aside>

        <div className="min-w-0 flex-1 px-6 pb-24 pt-3 sm:px-12 lg:px-20">
          <main id="docs-main" className="mx-auto max-w-3xl">
            {children}
          </main>
        </div>

        {toc !== undefined && (
          <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-[260px] shrink-0 overflow-y-auto pl-6 pr-2 py-8 xl:block">
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
            <div className="flex items-center justify-between border-b border-border px-4 h-14">
              <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMobileOpen(false)}>
                <LogoIcon className="size-6" />
                <span className="text-[16px] font-semibold tracking-tight">
                  tspy
                </span>
              </Link>
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
                groups={stableNav}
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
