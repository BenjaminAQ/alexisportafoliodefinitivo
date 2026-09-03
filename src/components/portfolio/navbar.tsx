"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/data/content";
import { PortfolioIcon } from "./icons";
import { useSectionData } from "@/components/admin/use-section-data";
import type { NavLabels } from "@/lib/content-types";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("home");
  const { data: navLabels } = useSectionData<NavLabels>("nav");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getLabel = (id: string): string => {
    if (navLabels && (navLabels as unknown as Record<string, string>)[id]) {
      return (navLabels as unknown as Record<string, string>)[id];
    }
    const item = NAV_ITEMS.find((n) => n.id === id);
    return item ? item.label : id;
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ink-deep/92 backdrop-blur-2xl border-b border-brand/15 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,201,232,0.06)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        {/* Top shimmer line when scrolled */}
        {scrolled && (
          <div className="absolute top-0 inset-x-0 h-px shimmer-line opacity-60" />
        )}

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav("home"); }}
            className="group flex items-center gap-3"
          >
            {/* Logo mark */}
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient-soft shadow-[0_0_0_1px_rgba(0,201,232,0.35),0_0_20px_rgba(0,201,232,0.2)] transition-all group-hover:shadow-[0_0_0_1px_rgba(0,201,232,0.6),0_0_28px_rgba(0,201,232,0.4)]">
              <span className="font-display text-lg font-black text-white tracking-tight">A</span>
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand animate-pulse-dot shadow-[0_0_8px_rgba(0,201,232,0.8)]" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Alexis<span className="text-brand">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  active === item.id
                    ? "text-white"
                    : "text-brand-light/60 hover:text-white hover:bg-white/5"
                )}
              >
                {getLabel(item.id)}
                {/* Active indicator */}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-brand transition-all duration-300",
                    "shadow-[0_0_8px_rgba(0,201,232,0.6)]",
                    active === item.id ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  )}
                />
              </button>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <PortfolioIcon name="menu" width={20} height={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink-deep/85 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
        {/* Drawer panel */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[88%] max-w-sm transition-transform duration-300 ease-out",
            "bg-brand-gradient-soft shadow-[-24px_0_80px_rgba(0,0,0,0.5)]",
            "border-l border-brand/15",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer decoration */}
          <div className="absolute inset-0 wire-mesh opacity-20 pointer-events-none" />
          <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand/15 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-brand/15 px-5 py-4">
            <span className="font-display text-lg font-bold text-white">
              Alexis<span className="text-brand">.</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <PortfolioIcon name="close" width={20} height={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="relative flex flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200",
                  active === item.id
                    ? "bg-brand/20 text-white ring-1 ring-inset ring-brand/40 shadow-[0_0_12px_rgba(0,201,232,0.15)]"
                    : "text-brand-light/75 hover:bg-white/5 hover:text-white"
                )}
              >
                {getLabel(item.id)}
                <span className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  active === item.id ? "bg-brand shadow-[0_0_6px_rgba(0,201,232,0.8)]" : "bg-white/20"
                )} />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
