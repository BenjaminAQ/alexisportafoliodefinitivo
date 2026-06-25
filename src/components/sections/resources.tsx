"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { LevelBadge, Pill } from "../portfolio/primitives";
import { RESOURCES, RESOURCE_CATEGORIES, RESOURCE_TYPES, type Resource } from "@/data/content";

function typeIcon(type: string) {
  switch (type) {
    case "video":
      return "video";
    case "PDF":
      return "pdf";
    case "code":
      return "code";
    case "template":
      return "template";
    case "manual":
      return "manual";
    default:
      return "example";
  }
}

function ResourceCard({ r }: { r: Resource }) {
  return (
    <motion.article
      layout
      variants={fadeUpItem}
      className="group relative flex flex-col rounded-2xl bg-white p-5 ring-1 ring-inset ring-ink/10 hover:ring-brand/40 hover:shadow-[0_18px_40px_-20px_rgba(0,187,212,0.4)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-2 py-1 text-[11px] font-semibold text-brand ring-1 ring-inset ring-brand/20">
          <PortfolioIcon name={typeIcon(r.type)} width={12} height={12} />
          {r.type}
        </span>
        <LevelBadge level={r.level} />
      </div>

      <h3 className="mt-4 font-display text-base font-semibold text-ink leading-snug">
        {r.title}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{r.description}</p>

      <div className="mt-4 space-y-1.5 border-t border-ink/10 pt-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-mono-code uppercase tracking-wider text-muted">Category</span>
          <span className="text-ink/80 text-right max-w-[60%]">{r.category}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-mono-code uppercase tracking-wider text-muted">Duration</span>
          <span className="text-ink/80 inline-flex items-center gap-1">
            <PortfolioIcon name="clock" width={11} height={11} className="text-brand" />
            {r.duration}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-mono-code uppercase tracking-wider text-muted">Prerequisites</span>
          <span className="text-ink/80 text-right max-w-[60%]">{r.prerequisites}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
        >
          <PortfolioIcon name="download" width={12} height={12} />
          Open resource
        </button>
        <span className="text-[11px] text-muted">Free · Open access</span>
      </div>
    </motion.article>
  );
}

export function ResourcesSection() {
  const reduce = useReducedMotion();
  const [cat, setCat] = React.useState<string>("All");
  const [type, setType] = React.useState<string>("All");
  const [query, setQuery] = React.useState("");

  const filtered = RESOURCES.filter((r) => {
    const matchCat = cat === "All" || r.category === cat;
    const matchType = type === "All" || r.type === type;
    const q = query.trim().toLowerCase();
    const matchQ = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    return matchCat && matchType && matchQ;
  });

  return (
    <Section id="resources" tone="light">
      <SectionHeader
        eyebrow="Open Academic Resources"
        title={
          <>
            A free library for{" "}
            <span className="text-brand">engineering education and capacity building</span>
          </>
        }
        description="This platform provides open academic resources in structural engineering, earthquake engineering, computational modeling, and seismic risk assessment, with the goal of supporting engineering education and technical capacity building."
      />

      {/* Search */}
      <div className="mt-8 relative max-w-md">
        <PortfolioIcon
          name="search"
          width={16}
          height={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources..."
          aria-label="Search resources"
          className="w-full rounded-lg bg-white py-2.5 pl-9 pr-4 text-sm text-ink ring-1 ring-inset ring-ink/15 placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-brand/60"
        />
      </div>

      {/* Category filter */}
      <div className="mt-6">
        <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-muted mb-2.5">Category</p>
        <div className="flex flex-wrap gap-2">
          <Pill active={cat === "All"} onClick={() => setCat("All")}>All ({RESOURCES.length})</Pill>
          {RESOURCE_CATEGORIES.map((c) => {
            const count = RESOURCES.filter((r) => r.category === c).length;
            return (
              <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
                {c} ({count})
              </Pill>
            );
          })}
        </div>
      </div>

      {/* Type filter */}
      <div className="mt-4">
        <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-muted mb-2.5">Type</p>
        <div className="flex flex-wrap gap-2">
          <Pill active={type === "All"} onClick={() => setType("All")}>All</Pill>
          {RESOURCE_TYPES.map((t) => (
            <Pill key={t} active={type === t} onClick={() => setType(t)}>
              <span className="inline-flex items-center gap-1">
                <PortfolioIcon name={typeIcon(t)} width={11} height={11} />
                {t}
              </span>
            </Pill>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="mt-6 text-sm text-muted">
        Showing <span className="font-semibold text-ink">{filtered.length}</span> of {RESOURCES.length} resources
      </p>

      {/* Grid */}
      <motion.div
        layout
        variants={fadeUpContainer}
        initial={reduce ? false : "hidden"}
        animate="visible"
        className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => (
            <ResourceCard key={r.id} r={r} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl bg-white p-10 text-center ring-1 ring-inset ring-ink/10">
          <p className="text-muted">No resources match your filters. Try clearing them.</p>
        </div>
      )}
    </Section>
  );
}
