"use client";

import { useEffect, useState } from "react";

export function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const cacheKey = "tspy:gh-stars";
    const cacheTtl = 60 * 60 * 1000; // 1 hour
    let cancelled = false;

    async function load() {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { count, ts } = JSON.parse(cached);
          if (Date.now() - ts < cacheTtl) {
            if (!cancelled) setStars(count);
            return;
          }
        }
      } catch {}

      try {
        const res = await fetch("https://api.github.com/repos/Atnatewoss/tspy");
        const data = await res.json();
        if (cancelled) return;
        setStars(data.stargazers_count as number);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ count: data.stargazers_count, ts: Date.now() })
        );
      } catch {}
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return stars;
}