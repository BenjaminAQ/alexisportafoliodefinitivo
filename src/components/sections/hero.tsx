"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PortfolioIcon } from "../portfolio/icons";
import { Eyebrow } from "../portfolio/primitives";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const fadeUp = (delay = 0) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

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
          viewBox="0 0 600 600"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
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
          viewBox="0 0 400 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
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
        <div className="max-w-4xl">
          <motion.div {...fadeUp(0)}>
            <Eyebrow dark>Academic Portfolio · Civil Engineer</Eyebrow>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05]"
          >
            Structural Engineering,{" "}
            <span className="text-brand-gradient">Earthquake Engineering</span> and{" "}
            <span className="text-brand-gradient">Computational Tools</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.18)}
            className="mt-7 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-brand-light/80 text-pretty"
          >
            Civil engineer focused on matrix structural analysis, finite element modeling,
            nonlinear structural analysis, structural dynamics, seismic design of concrete and
            steel structures, performance-based earthquake engineering, and seismic risk
            assessment.
          </motion.p>

          <motion.div {...fadeUp(0.28)} className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,187,212,0.8)] hover:bg-brand-light hover:text-ink transition-all"
            >
              View Projects
              <PortfolioIcon name="arrow" width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo("resources")}
              className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-brand/40 hover:bg-white/10 hover:ring-brand transition-all"
            >
              <PortfolioIcon name="book" width={16} height={16} />
              Explore Open Resources
            </button>
            <button
              onClick={() => scrollTo("cv")}
              className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-brand/40 hover:bg-white/10 hover:ring-brand transition-all"
            >
              <PortfolioIcon name="download" width={16} height={16} />
              Download CV
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-lg bg-transparent px-5 py-3 text-sm font-semibold text-brand-light hover:text-white transition-colors"
            >
              <PortfolioIcon name="mail" width={16} height={16} />
              Contact
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
