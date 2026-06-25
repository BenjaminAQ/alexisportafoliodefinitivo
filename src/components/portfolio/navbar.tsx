"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/data/content";
import { PortfolioIcon } from "./icons";
import { useTheme } from "next-themes";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Spy on sections to set active link
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
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-ink/85 backdrop-blur-xl border-b border-brand/20 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]"
            : "bg-ink/40 backdrop-blur-md border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNav("home");
            }}
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient-soft text-white shadow-[0_0_0_1px_rgba(0,187,212,0.4)]">
              <span className="font-display text-lg font-bold">A</span>
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand-light animate-pulse-dot" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Alexis<span className="text-brand">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active === item.id
                    ? "text-white"
                    : "text-brand-light/70 hover:text-white"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand transition-transform duration-300",
                    active === item.id ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </button>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-brand-light/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <PortfolioIcon name={theme === "dark" ? "sun" : "moon"} className="h-4.5 w-4.5" width={18} height={18} />
              </button>
            )}
            <button
              onClick={() => handleNav("contact")}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(0,187,212,0.7)] hover:bg-brand-light hover:text-ink transition-all"
            >
              Contact
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10"
            >
              <PortfolioIcon name="menu" width={20} height={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-ink-deep/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[88%] max-w-sm bg-brand-gradient shadow-2xl transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-brand/20 px-5 py-4">
            <span className="font-display text-lg font-bold text-white">
              Alexis<span className="text-brand">.</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10"
            >
              <PortfolioIcon name="close" width={20} height={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-0.5 overflow-y-auto p-3" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors",
                  active === item.id
                    ? "bg-brand text-white"
                    : "text-brand-light/80 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
                <PortfolioIcon name="arrow" width={14} height={14} className="opacity-50" />
              </button>
            ))}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mt-2 flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-brand-light/80 hover:bg-white/5 hover:text-white"
              >
                <PortfolioIcon name={theme === "dark" ? "sun" : "moon"} width={16} height={16} />
                Toggle {theme === "dark" ? "light" : "dark"} mode
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
