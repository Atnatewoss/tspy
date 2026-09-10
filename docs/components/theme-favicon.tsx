"use client";

import { useEffect, useState } from "react";

export function ThemeFavicon() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <link
      rel="icon"
      type="image/svg+xml"
      href={dark ? "/icon-dark.svg" : "/icon-light.svg"}
    />
  );
}