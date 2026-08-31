"use client";

import * as React from "react";

// Render text with {bold}text{/bold} markup → <strong className="font-bold text-black dark:text-white">
// Works on ALL sections. Bold renders in black (light mode) or white (dark mode).
export function renderRichText(text: string): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/(\{bold\}.*?\{\/bold\})/g);
  return parts.map((part, i) => {
    const m = part.match(/^\{bold\}(.*)\{\/bold\}$/);
    if (m) {
      return <strong key={i} className="font-bold text-black dark:text-white">{m[1]}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
