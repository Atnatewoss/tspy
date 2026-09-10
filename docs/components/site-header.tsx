"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, LogoIcon } from "@/components/icons";
import { GITHUB_URL } from "@/lib/sections";

const NAV_ITEMS: { href: string; label: string; key: string }[] = [
  { href: "/docs/introduction", label: "Docs", key: "docs" },
  { href: "/learn/why-a-meta-framework", label: "Learn", key: "learn" },
  { href: "/changelog", label: "Changelog", key: "changelog" },
];

export function SiteHeader({
  active,
}: {
  active?: "docs" | "learn" | "changelog";
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <header
      className={`sticky top-0 z-40 -mb-16 transition-colors duration-300 md:border-transparent md:bg-transparent md:backdrop-blur-none ${
        scrolled ? "border-b border-border bg-background/50 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-x-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-2 transition-transform duration-500 ease-out ${
            scrolled ? "md:-translate-x-20 lg:-translate-x-32" : ""
          }`}
        >
          <LogoIcon className="size-8" />
          <span className="text-[17px] font-semibold tracking-tight">
            tspy
          </span>
        </Link>

        {/* Desktop pill nav — centered, theme-aware bg */}
        <nav
          aria-label="Site sections"
          className="hidden items-center gap-1.5 rounded-full border border-foreground/15 bg-background/45 p-1.5 shadow-[0_10px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl md:flex md:absolute md:left-1/2 md:top-[calc(50%+12px)] md:-translate-x-1/2 md:-translate-y-1/2 dark:border-white/10 dark:bg-background/55 dark:shadow-[0_10px_32px_rgba(0,0,0,0.35)]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          className={`flex items-center gap-2 transition-transform duration-500 ease-out sm:gap-3 ${
            scrolled ? "md:translate-x-20 lg:translate-x-32" : ""
          }`}
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="tspy on GitHub - 0 stars"
            title="tspy on GitHub"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <GithubIcon className="size-[18px]" />
            <span aria-hidden className="hidden h-3.5 w-px bg-border sm:inline" />
            <span className="hidden sm:inline">0</span>
          </a>
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted md:hidden"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile pill nav (dropdown) */}
      {mobileOpen && (
        <nav
          aria-label="Site sections"
          className="mx-auto max-w-6xl border-t border-border px-4 pb-4 pt-2 md:hidden"
        >
          <div className="flex flex-col gap-1 rounded-xl border border-border bg-muted/50 p-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
