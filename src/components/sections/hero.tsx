"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PortfolioIcon } from "../portfolio/icons";
import { Eyebrow } from "../portfolio/primitives";
import { useSectionData } from "@/components/admin/use-section-data";
import type { HomeData } from "@/lib/content-types";

function scrollTo(target: string) {
  if (target.startsWith("#")) {
    document.getElementById(target.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.open(target, "_blank", "noopener,noreferrer");
  }
}

// Parse {accent}word{/accent} markup into gradient spans
function renderTitle(title: string) {
  if (!title) return null;
  const parts = title.split(/(\{accent\}.*?\{\/accent\})/g);
  return parts.map((part, i) => {
    const m = part.match(/^\{accent\}(.*)\{\/accent\}$/);
    if (m) {
      return (
        <span key={i} className="text-brand-gradient">{m[1]}</span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<HomeData>("home");

  const fadeUp = (delay = 0) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  // Use defaults while loading
  const eyebrow = data?.eyebrow ?? "Academic Portfolio · Civil Engineer";
  const title = data?.title ?? "Structural Engineering, {accent}Earthquake Engineering{/accent} and {accent}Computational Tools{/accent}";
  const subtitle = data?.subtitle ?? "Civil engineer focused on matrix structural analysis, finite element modeling, nonlinear structural analysis, structural dynamics, seismic design of concrete and steel structures, performance-based earthquake engineering, and seismic risk assessment.";
  const profileImage = data?.profileImage ?? "";
  const profileName = data?.profileName ?? "Alexis";
  const profileRole = data?.profileRole ?? "Civil Engineer";
  const ctaButtons = data?.ctaButtons ?? [
    { id: "b1", label: "View Projects", target: "#projects", primary: true },
    { id: "b2", label: "Explore Open Resources", target: "#resources", primary: false },
    { id: "b3", label: "Download CV", target: "#cv", primary: false },
    { id: "b4", label: "Contact", target: "#contact", primary: false },
  ];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-brand-gradient text-white scroll-mt-20"
    >
      {/* Wire-mesh decorative layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 wire-mesh opacity-60" />
        <div className="absolute inset-0 wire-mesh-fine opacity-40" />

        <svg
          className="absolute -right-32 -top-24 h-[640px] w-[640px] text-brand-light/20 animate-mesh-float"
          viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="0.7"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={`h-${i}`} cx="300" cy="300" rx={300 - i * 20} ry={150 - i * 10} opacity={0.5 - i * 0.025} />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={`v-${i}`} cx="300" cy="300" rx={150 - i * 10} ry={300 - i * 20} opacity={0.5 - i * 0.025} />
          ))}
        </svg>

        <svg
          className="absolute -left-40 bottom-0 h-[520px] w-[520px] text-brand/25 animate-slow-spin"
          viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="0.6"
        >
          <circle cx="200" cy="200" r="190" />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return (
              <line key={i} x1="200" y1="200" x2={200 + Math.cos(a) * 190} y2={200 + Math.sin(a) * 190} opacity="0.4" />
            );
          })}
          {[60, 120, 180].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} opacity="0.5" />
          ))}
        </svg>

        <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-deep/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-32">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Text column */}
          <div className="lg:col-span-8 max-w-4xl">
            <motion.div {...fadeUp(0)}>
              <Eyebrow dark>{eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05]"
            >
              {renderTitle(title)}
            </motion.h1>

            <motion.p
              {...fadeUp(0.18)}
              className="mt-7 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-brand-light/80 text-pretty"
            >
              {subtitle}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.28)} className="mt-9 flex flex-wrap gap-3">
              {ctaButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => scrollTo(btn.target)}
                  className={
                    btn.primary
                      ? "group inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,187,212,0.8)] hover:bg-brand-light hover:text-ink transition-all"
                      : "inline-flex items-center gap-2 rounded-lg bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-brand/40 hover:bg-white/10 hover:ring-brand transition-all"
                  }
                >
                  {btn.label}
                  {btn.primary && (
                    <PortfolioIcon name="arrow" width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Profile image column (circular) */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full bg-brand/20 blur-2xl animate-pulse-dot" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-light/40 to-brand/20 blur-md" />

              {/* Circular image container */}
              <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-full overflow-hidden bg-brand-gradient ring-4 ring-brand/30 shadow-[0_0_60px_-10px_rgba(0,187,212,0.6)]">
                <div className="absolute inset-0 wire-mesh opacity-20" />
                {profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileImage}
                    alt={`${profileName} — ${profileRole}`}
                    className="relative h-full w-full object-cover"
                  />
                ) : (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <span className="font-display text-[8rem] sm:text-[10rem] font-bold text-white/95 drop-shadow-[0_4px_24px_rgba(0,187,212,0.4)]">
                      {profileName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Floating name badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-ink-deep/90 backdrop-blur-md px-5 py-2 ring-1 ring-inset ring-brand/40 shadow-lg whitespace-nowrap">
                <p className="font-display text-sm font-bold text-white">{profileName}</p>
                <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/70 text-center">
                  {profileRole}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
