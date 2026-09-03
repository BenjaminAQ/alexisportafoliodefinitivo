"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import type { HomeData } from "@/lib/content-types";

function scrollTo(target: string) {
  if (target.startsWith("#")) {
    document.getElementById(target.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.open(target, "_blank", "noopener,noreferrer");
  }
}

function renderTitle(title: string) {
  if (!title) return null;
  const parts = title.split(/(\{accent\}.*?\{\/accent\})/g);
  return parts.map((part, i) => {
    const m = part.match(/^\{accent\}(.*)\{\/accent\}$/);
    if (m) {
      return <span key={i} className="text-brand-gradient">{m[1]}</span>;
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
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const eyebrow       = data?.eyebrow       ?? "Academic Portfolio · Civil Engineer";
  const title         = data?.title         ?? "Structural Engineering, {accent}Earthquake Engineering{/accent} and {accent}Computational Tools{/accent}";
  const subtitle      = data?.subtitle      ?? "Civil engineer focused on matrix structural analysis, finite element modeling, nonlinear structural analysis, structural dynamics, seismic design of concrete and steel structures, performance-based earthquake engineering, and seismic risk assessment.";
  const profileImage  = data?.profileImage  ?? "";
  const profileName   = data?.profileName   ?? "Alexis";
  const profileRole   = data?.profileRole   ?? "Civil Engineer";
  const eyebrowColor  = data?.eyebrowColor  ?? "";
  const titleColor    = data?.titleColor    ?? "";
  const subtitleColor = data?.subtitleColor ?? "";
  const profileNameColor = data?.profileNameColor ?? "";
  const profileRoleColor = data?.profileRoleColor ?? "";
  const ctaButtons    = data?.ctaButtons    ?? [
    { id: "b1", label: "View Projects",          target: "#projects",  primary: true  },
    { id: "b2", label: "Explore Open Resources", target: "#resources", primary: false },
    { id: "b3", label: "Download CV",            target: "#cv",        primary: false },
    { id: "b4", label: "Contact",                target: "#contact",   primary: false },
  ];

  return (
    <section id="home" className="relative isolate overflow-hidden text-white scroll-mt-20 min-h-screen flex items-center">

      {/* ── Deep space background ── */}
      <div aria-hidden className="absolute inset-0 bg-brand-gradient" />

      {/* ── Scan lines overlay ── */}
      <div aria-hidden className="absolute inset-0 scan-lines opacity-20" />

      {/* ── Wire mesh grid ── */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 wire-mesh opacity-50" />
        <div className="absolute inset-0 wire-mesh-fine opacity-25" />
      </div>

      {/* ── Floating geometric decorations ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Rotating ellipse cluster top-right */}
        <svg
          className="absolute -right-40 -top-32 h-[700px] w-[700px] text-brand/18 animate-mesh-float"
          viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="0.6"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={`h-${i}`} cx="300" cy="300" rx={300 - i * 18} ry={140 - i * 8} opacity={0.5 - i * 0.025} />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={`v-${i}`} cx="300" cy="300" rx={140 - i * 8} ry={300 - i * 18} opacity={0.5 - i * 0.025} />
          ))}
        </svg>

        {/* Slowly spinning radial wheel bottom-left */}
        <svg
          className="absolute -left-48 -bottom-16 h-[560px] w-[560px] text-purple/18 animate-slow-spin"
          viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="0.5"
        >
          <circle cx="200" cy="200" r="192" />
          {Array.from({ length: 32 }).map((_, i) => {
            const a = (i / 32) * Math.PI * 2;
            return <line key={i} x1="200" y1="200" x2={200 + Math.cos(a) * 192} y2={200 + Math.sin(a) * 192} opacity="0.35" />;
          })}
          {[50, 100, 150, 192].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} opacity="0.45" />
          ))}
        </svg>

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-brand/12 blur-[100px]" />
        <div className="absolute top-2/3 right-1/4 h-72 w-72 rounded-full bg-purple/14 blur-[80px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-emerald/6 blur-[80px]" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-deep/80 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">

          {/* Text column */}
          <div className="lg:col-span-7 xl:col-span-8 max-w-4xl">

            {/* Eyebrow */}
            <motion.div {...fadeUp(0)}>
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-[3px]">
                  <span className="h-[2px] w-8 rounded-full bg-brand shadow-[0_0_8px_rgba(0,201,232,0.7)]" />
                  <span className="h-[2px] w-4 rounded-full bg-purple/70" />
                </div>
                <span
                  className="font-mono-code text-[11px] font-bold uppercase tracking-[0.22em] text-brand-light"
                  style={eyebrowColor ? { color: eyebrowColor } : undefined}
                >
                  {eyebrow}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              {...fadeUp(0.09)}
              className="mt-7 font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-balance leading-[1.04] text-white"
              style={titleColor ? { color: titleColor } : undefined}
            >
              {renderTitle(title)}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.2)}
              className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-brand-light/72 text-pretty"
              style={subtitleColor ? { color: subtitleColor } : undefined}
            >
              {subtitle}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap gap-3">
              {ctaButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => scrollTo(btn.target)}
                  className={
                    btn.primary
                      ? "group inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-[0_12px_32px_-10px_rgba(0,201,232,0.85)] hover:bg-brand-light hover:text-ink hover:shadow-[0_16px_40px_-10px_rgba(0,201,232,1)] transition-all duration-200"
                      : "inline-flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 ring-1 ring-inset ring-brand/30 hover:bg-white/10 hover:ring-brand/60 hover:text-white transition-all duration-200 backdrop-blur-sm"
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

          {/* Profile image column */}
          <motion.div
            {...fadeUp(0.22)}
            className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Multi-layer glow rings */}
              <div className="absolute -inset-8 rounded-full bg-brand/10 blur-3xl animate-glow-pulse" />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-brand/25 to-purple/20 blur-xl" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand/30 to-purple/25 blur-md" />

              {/* Rotating dashed ring */}
              <svg
                className="absolute -inset-6 h-[calc(100%+48px)] w-[calc(100%+48px)] animate-slow-spin text-brand/30"
                viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5"
                strokeDasharray="4 3"
              >
                <circle cx="50" cy="50" r="48" />
              </svg>

              {/* Profile image */}
              <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-full overflow-hidden bg-brand-gradient ring-[3px] ring-brand/50 shadow-[0_0_60px_-10px_rgba(0,201,232,0.7),0_0_100px_-20px_rgba(109,40,217,0.5)]">
                <div className="absolute inset-0 wire-mesh opacity-15" />
                {profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileImage}
                    alt={`${profileName} — ${profileRole}`}
                    className="relative h-full w-full object-cover"
                  />
                ) : (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <span className="font-display text-[8rem] sm:text-[10rem] font-black text-white/95 drop-shadow-[0_4px_24px_rgba(0,201,232,0.5)]">
                      {profileName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Name badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink-deep/95 backdrop-blur-xl px-5 py-2 ring-1 ring-inset ring-brand/40 shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_20px_rgba(0,201,232,0.15)] whitespace-nowrap">
                <p
                  className="font-display text-sm font-bold text-white text-center"
                  style={profileNameColor ? { color: profileNameColor } : undefined}
                >
                  {profileName}
                </p>
                <p
                  className="font-mono-code text-[10px] uppercase tracking-[0.16em] text-brand-light/65 text-center"
                  style={profileRoleColor ? { color: profileRoleColor } : undefined}
                >
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
