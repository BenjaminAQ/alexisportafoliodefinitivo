"use client";

import * as React from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/data/content";
import { PortfolioIcon } from "./icons";
import { useSectionData } from "@/components/admin/use-section-data";
import type { NavLabels, FooterData } from "@/lib/content-types";

export function Footer() {
  const year = new Date().getFullYear();
  const { data: navLabels } = useSectionData<NavLabels>("nav");
  const { data: footerData } = useSectionData<FooterData>("footer");

  const getLabel = (id: string): string => {
    if (navLabels && (navLabels as unknown as Record<string, string>)[id]) {
      return (navLabels as unknown as Record<string, string>)[id];
    }
    const item = NAV_ITEMS.find((n) => n.id === id);
    return item ? item.label : id;
  };

  const brandName  = footerData?.brandName  || "Alexis";
  const tagline    = footerData?.tagline    || "Structural engineering, earthquake engineering and computational tools for engineering education and practice.";
  const statement  = footerData?.statement  || "Structural Engineering, Earthquake Engineering and Computational Tools";
  const copyright  = footerData?.copyright  || "All rights reserved.";
  const socials    = footerData?.socials    || [
    { id: "s1", icon: "github",   label: "GitHub",   href: "https://github.com" },
    { id: "s2", icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com" },
    { id: "s3", icon: "mail",     label: "Email",    href: "mailto:alexis@example.com" },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden bg-brand-gradient text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 wire-mesh opacity-30 pointer-events-none" />
      <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-brand/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-purple/8 blur-3xl pointer-events-none" />

      {/* Top shimmer divider */}
      <div className="shimmer-line h-px opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid gap-12 md:grid-cols-12">

          {/* ── Brand column ── */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient-soft ring-1 ring-inset ring-brand/40 shadow-[0_0_20px_rgba(0,201,232,0.25)]">
                <span className="font-display text-xl font-black text-white">A</span>
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_rgba(0,201,232,0.8)] animate-pulse-dot" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                {brandName}<span className="text-brand">.</span>
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm text-brand-light/65 leading-relaxed">
              {tagline}
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-brand-light/75 ring-1 ring-inset ring-brand/20 hover:bg-brand hover:text-white hover:ring-brand hover:shadow-[0_0_16px_rgba(0,201,232,0.4)] transition-all duration-200"
                >
                  <PortfolioIcon name={s.icon || "book"} width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Sitemap columns ── */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8">
            {[
              { title: "Secciones", items: NAV_ITEMS.slice(0, 5) },
              { title: "Más",       items: NAV_ITEMS.slice(5, 9) },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="font-mono-code text-[10px] font-bold uppercase tracking-[0.22em] text-brand-light/50 mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`#${item.id}`}
                        className="group flex items-center gap-2 text-sm text-brand-light/70 hover:text-white transition-colors duration-150"
                      >
                        <span className="h-px w-3 rounded-full bg-brand/40 group-hover:w-4 group-hover:bg-brand transition-all duration-200" />
                        {getLabel(item.id)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Statement column ── */}
          <div className="md:col-span-3">
            <h3 className="font-mono-code text-[10px] font-bold uppercase tracking-[0.22em] text-brand-light/50 mb-4">
              Statement
            </h3>
            <div className="rounded-xl bg-white/4 ring-1 ring-inset ring-brand/15 p-4">
              <p className="text-sm leading-relaxed text-white/80 italic">
                &ldquo;{statement}&rdquo;
              </p>
              <a
                href="#contact"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-light transition-colors"
              >
                Get in touch
                <PortfolioIcon name="arrow" width={12} height={12} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-brand/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-brand-light/45">
            &copy; {year} {brandName}. {copyright}
          </p>
          <p className="text-xs text-brand-light/45 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
            Built with Next.js · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
