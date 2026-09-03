import * as React from "react";
import { cn } from "@/lib/utils";
import type { Level } from "@/data/content";

// ── Level badge ──────────────────────────────────────────────
const LEVEL_STYLES: Record<Level, string> = {
  Beginner:
    "bg-emerald/15 text-emerald-light ring-1 ring-inset ring-emerald/30",
  Intermediate:
    "bg-brand/15 text-brand ring-1 ring-inset ring-brand/35",
  Advanced:
    "bg-ink text-brand-light ring-1 ring-inset ring-brand/40",
  "Research-oriented":
    "bg-purple/15 text-purple-light ring-1 ring-inset ring-purple/35",
};

export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
        LEVEL_STYLES[level],
        className
      )}
    >
      {level}
    </span>
  );
}

// ── Technology tag ───────────────────────────────────────────
export function TechTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-ink-soft px-2 py-0.5 font-mono-code text-[11px] font-medium text-brand-light",
        "ring-1 ring-inset ring-brand/25 hover:ring-brand/50 transition-colors",
        className
      )}
    >
      {children}
    </span>
  );
}

// ── Pill filter button ───────────────────────────────────────
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
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
        "ring-1 ring-inset",
        active
          ? "bg-brand text-white ring-brand shadow-[0_6px_20px_-8px_rgba(0,201,232,0.8)] scale-[1.03]"
          : "bg-white/70 text-ink hover:bg-white hover:text-brand hover:ring-brand/40 ring-ink/12",
        className
      )}
    >
      {children}
    </button>
  );
}

// ── Eyebrow label ────────────────────────────────────────────
export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Left accent — two lines with glow */}
      <div className="flex flex-col gap-[3px]">
        <span className="h-[2px] w-8 rounded-full bg-brand shadow-[0_0_8px_rgba(0,201,232,0.6)]" />
        <span className="h-[2px] w-4 rounded-full bg-purple/70" />
      </div>
      <span
        className={cn(
          "font-mono-code text-[11px] font-bold uppercase tracking-[0.22em]",
          dark ? "text-brand-light" : "text-brand"
        )}
      >
        {children}
      </span>
    </div>
  );
}

// ── Stat card (used in About) ─────────────────────────────────
export function StatCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white",
        "ring-1 ring-inset ring-brand/25 glow-brand",
        className
      )}
    >
      <div className="absolute inset-0 wire-mesh opacity-25" />
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-brand/15 blur-2xl" />
      <p className="relative stat-number text-brand-light drop-shadow-[0_0_16px_rgba(0,201,232,0.5)]">{value}</p>
      <p className="relative mt-2 text-sm text-brand-light/70 leading-snug font-medium">{label}</p>
    </div>
  );
}
