"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { GithubIcon, LogoIcon } from "@/components/icons";
import { GITHUB_URL } from "@/lib/sections";

const NAV_ITEMS: { href: string; label: string; key: string }[] = [
  { href: "/docs/why-tspy", label: "Docs", key: "docs" },
  { href: "/changelog", label: "Changelog", key: "changelog" },
];

function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const cacheKey = "tspy:gh-stars";
    const cacheTtl = 60 * 60 * 1000; // 1 hour

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { count, ts } = JSON.parse(cached);
        if (Date.now() - ts < cacheTtl) {
          setStars(count);
          return;
        }
      }
    } catch {}

    fetch("https://api.github.com/repos/Atnatewoss/tspy")
      .then((r) => r.json())
      .then((data) => {
        const count = data.stargazers_count as number;
        setStars(count);
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ count, ts: Date.now() }));
        } catch {}
      })
      .catch(() => {});
  }, []);

  return stars;
}

export function SiteHeader({
  active,
}: {
  active?: "docs" | "learn" | "changelog";
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const stars = useGitHubStars();

  return (
    <header className="sticky top-0 z-40 -mb-14 border-b border-border bg-background/80 backdrop-blur">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center gap-x-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <LogoIcon className="size-6" />
          <span className="text-[16px] font-semibold tracking-tight">tspy</span>
        </Link>

        <nav aria-label="Site sections" className="hidden items-center gap-6 md:flex ml-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={`tspy on GitHub - ${stars ?? 0} stars`}
            title="tspy on GitHub"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <GithubIcon className="size-[18px]" />
            <span className="hidden sm:inline">{stars ?? "—"}</span>
          </a>
          <ThemeSwitcher />

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

      {mobileOpen && (
        <nav aria-label="Site sections" className="mx-auto max-w-7xl border-t border-border px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
