"use client";

import * as React from "react";

// Render text with {bold}text{/bold} markup → <strong> with black color.
// Bold always renders in BLACK (#000000) regardless of theme — even in dark mode.
// This ensures bold text is always readable and matches the user's request.
export function renderRichText(text: string): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/(\{bold\}.*?\{\/bold\})/g);
  return parts.map((part, i) => {
    const m = part.match(/^\{bold\}(.*)\{\/bold\}$/);
    if (m) {
      return (
        <strong key={i} style={{ fontWeight: 700, color: "#000000" }}>
          {m[1]}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
