import * as React from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/data/content";
import { PortfolioIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-brand-gradient text-white">
      {/* Top accent line */}
      <div className="h-px shimmer-line" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
                <span className="font-display text-lg font-bold">A</span>
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                Alexis<span className="text-brand-light">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-brand-light/70 leading-relaxed">
              Structural engineering, earthquake engineering and computational tools for engineering education and practice.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: "github", href: "https://github.com", label: "GitHub" },
                { icon: "linkedin", href: "https://www.linkedin.com", label: "LinkedIn" },
                { icon: "scholar", href: "#", label: "Google Scholar" },
                { icon: "research", href: "#", label: "ResearchGate" },
                { icon: "mail", href: "mailto:alexis@example.com", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-brand-light/80 ring-1 ring-inset ring-brand/20 hover:bg-brand hover:text-white hover:ring-brand transition-all"
                >
                  <PortfolioIcon name={s.icon} width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap columns */}
          <div className="md:col-span-5 grid grid-cols-2 gap-6">
            {[
              { title: "Secciones", items: NAV_ITEMS.slice(0, 5) },
              { title: "Más", items: NAV_ITEMS.slice(5, 9) },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="font-mono-code text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-light/60">
                  {col.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {col.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`#${item.id}`}
                        className="text-sm text-brand-light/80 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tagline / closing */}
          <div className="md:col-span-3">
            <h3 className="font-mono-code text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-light/60">
              Statement
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/90 italic">
              &ldquo;Structural Engineering, Earthquake Engineering and Computational Tools&rdquo;
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light hover:text-white"
            >
              Get in touch
              <PortfolioIcon name="arrow" width={14} height={14} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-brand/15 pt-6">
          <p className="text-xs text-brand-light/60">
            &copy; {year} Alexis. All rights reserved.
          </p>
          <p className="text-xs text-brand-light/60">
            Built with Next.js · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
