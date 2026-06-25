"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { LevelBadge, TechTag, Pill } from "../portfolio/primitives";
import { PROJECTS, type Project } from "@/data/content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const FILTERS = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.area)))];

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.button
      variants={fadeUpItem}
      onClick={onOpen}
      className="group relative flex flex-col text-left rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-inset ring-ink/10 shadow-[0_2px_10px_-4px_rgba(51,78,104,0.10)] hover:ring-brand/40 hover:shadow-[0_18px_40px_-20px_rgba(0,187,212,0.45)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Preview gradient band */}
      <div className="relative h-28 sm:h-32 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5 overflow-hidden bg-brand-gradient">
        <div className="absolute inset-0 wire-mesh opacity-40" />
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand/25 blur-2xl" />
        <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between">
          <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-brand-light/70">
            {project.area}
          </span>
          <LevelBadge level={project.level} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
            View details
          </span>
        </div>
      </div>

      <h3 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-brand transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3 flex-1">
        {project.abstract}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <TechTag key={t}>{t}</TechTag>
        ))}
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand">
        Read project brief
        <PortfolioIcon name="arrow" width={12} height={12} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </motion.button>
  );
}

function ProjectDetailDialog({ project, open, onOpenChange }: { project: Project | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!project) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[88vh] p-0 gap-0 overflow-hidden bg-surface">
        <div className="relative bg-brand-gradient px-6 py-8 sm:px-8">
          <div className="absolute inset-0 wire-mesh opacity-30" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-brand-light/70">
                {project.area}
              </span>
              <LevelBadge level={project.level} />
            </div>
            <DialogHeader className="mt-2">
              <DialogTitle className="font-display text-2xl sm:text-3xl font-bold text-white text-left">
                {project.title}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="mt-2 text-sm sm:text-base text-brand-light/80 text-left max-w-2xl">
              {project.abstract}
            </DialogDescription>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <TechTag key={t}>{t}</TechTag>
              ))}
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[55vh]">
          <div className="px-6 py-6 sm:px-8 space-y-6">
            {project.sections.map((s) => (
              <div key={s.heading}>
                <h3 className="font-display text-base font-semibold text-ink flex items-center gap-2">
                  <span className="h-1 w-5 rounded-full bg-brand" />
                  {s.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{s.body}</p>
              </div>
            ))}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-4 ring-1 ring-inset ring-ink/10">
                <h4 className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-muted">Files available</h4>
                <ul className="mt-2 space-y-1.5">
                  {project.files.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink/80">
                      <PortfolioIcon name="code" width={14} height={14} className="text-brand" />
                      <span className="font-mono-code text-xs">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-white p-4 ring-1 ring-inset ring-ink/10">
                <h4 className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-muted">References</h4>
                <ul className="mt-2 space-y-1.5">
                  {project.references.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-ink/80">
                      <PortfolioIcon name="book" width={14} height={14} className="mt-0.5 text-brand shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = React.useState("All");
  const [selected, setSelected] = React.useState<Project | null>(null);
  const reduce = useReducedMotion();

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.area === filter);

  return (
    <Section id="projects" tone="light">
      <SectionHeader
        eyebrow="Projects"
        title={
          <>
            Documented work bridging{" "}
            <span className="text-brand">theory, modeling and code</span>
          </>
        }
        description="Each project combines a clear problem statement, methodology, theoretical background, computational implementation and reproducible results."
      />

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Pill active={filter === "All"} onClick={() => setFilter("All")}>
          All ({PROJECTS.length})
        </Pill>
        {FILTERS.slice(1).map((f) => (
          <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Pill>
        ))}
      </div>

      <motion.div
        key={filter}
        variants={fadeUpContainer}
        initial={reduce ? false : "hidden"}
        animate="visible"
        className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectDetailDialog
        project={selected}
        open={!!selected}
        onOpenChange={(v) => !v && setSelected(null)}
      />
    </Section>
  );
}
