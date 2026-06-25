import * as React from "react";
import { cn } from "@/lib/utils";
import type { Level } from "@/data/content";

// Level badge system (Beginner / Intermediate / Advanced / Research-oriented)
const LEVEL_STYLES: Record<Level, string> = {
  Beginner:
    "bg-brand-light text-ink ring-1 ring-inset ring-brand/30",
  Intermediate:
    "bg-brand text-white ring-1 ring-inset ring-brand/40",
  Advanced:
    "bg-ink text-brand ring-1 ring-inset ring-brand",
  "Research-oriented":
    "bg-transparent text-brand ring-1 ring-inset ring-brand",
};

export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        LEVEL_STYLES[level],
        className
      )}
    >
      {level}
    </span>
  );
}

// Technology tag (monospace)
export function TechTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-ink px-2 py-0.5 font-mono-code text-[11px] font-medium text-brand-light",
        "ring-1 ring-inset ring-brand/30",
        className
      )}
    >
      {children}
    </span>
  );
}

// Generic pill-style filter button
export function Pill({
  active,
  children,
  onClick,
  className,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
        "ring-1 ring-inset ring-ink/15",
        active
          ? "bg-brand text-white ring-brand shadow-[0_8px_24px_-12px_rgba(0,187,212,0.7)]"
          : "bg-white/60 text-ink hover:bg-white hover:text-brand hover:ring-brand/40",
        className
      )}
    >
      {children}
    </button>
  );
}

// Section eyebrow label
export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-8 bg-brand" />
      <span
        className={cn(
          "font-mono-code text-xs font-semibold uppercase tracking-[0.2em]",
          dark ? "text-brand-light" : "text-brand"
        )}
      >
        {children}
      </span>
    </div>
  );
}
