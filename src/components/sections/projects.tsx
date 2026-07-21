"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { LevelBadge, TechTag } from "../portfolio/primitives";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import { FileBadge } from "@/components/admin/file-viewer";
import type { ProjectsData, ProjectItem } from "@/lib/content-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

function ProjectCard({ project, onOpen }: { project: ProjectItem; onOpen: () => void }) {
  return (
    <motion.button
      layout
      onClick={onOpen}
      className="group relative flex flex-col text-left rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-inset ring-ink/10 shadow-[0_2px_10px_-4px_rgba(51,78,104,0.10)] hover:ring-brand/40 hover:shadow-[0_18px_40px_-20px_rgba(0,187,212,0.45)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-28 sm:h-32 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5 overflow-hidden bg-brand-gradient">
        <div className="absolute inset-0 wire-mesh opacity-40" />
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand/25 blur-2xl" />
        <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between">
          <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-brand-light/70">
            {project.area}
          </span>
          {project.level && <LevelBadge level={project.level as any} />}
        </div>
      </div>

      <h3 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-brand transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3 flex-1">
        {project.abstract}
      </p>

      {project.tech.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <TechTag key={t}>{t}</TechTag>
          ))}
        </div>
      )}

      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand">
        Read project brief
        <PortfolioIcon name="arrow" width={12} height={12} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </motion.button>
  );
}

function ProjectDetailDialog({ project, open, onOpenChange }: { project: ProjectItem | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!project) return null;
  // Filtrar archivos visibles (viewMode !== "none" y con url)
  const visibleFiles = project.files.filter((f) => f.url && f.viewMode && f.viewMode !== "none");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 gap-0 overflow-hidden bg-surface">
        <div className="relative bg-brand-gradient px-6 py-8 sm:px-10">
          <div className="absolute inset-0 wire-mesh opacity-30" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              {project.area && (
                <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-brand-light/70">
                  {project.area}
                </span>
              )}
              {project.level && <LevelBadge level={project.level as any} />}
            </div>
            <DialogHeader className="mt-2">
              <DialogTitle className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-left">
                {project.title}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="mt-3 text-sm sm:text-base lg:text-lg text-brand-light/80 text-left max-w-4xl">
              {project.abstract}
            </DialogDescription>
            {project.tech.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            )}
          </div>
        </div>

        <ScrollArea className="max-h-[75vh]">
          <div className="px-6 py-6 sm:px-10 space-y-6">
            {project.sections.map((s, i) => (
              <div key={i}>
                <h3 className="font-display text-xl font-semibold text-ink flex items-center gap-2">
                  <span className="h-1 w-5 rounded-full bg-brand" />
                  {s.heading}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink/80">{s.body}</p>
              </div>
            ))}

            {visibleFiles.length > 0 && (
              <div className="rounded-xl bg-white p-5 ring-1 ring-inset ring-ink/10">
                <h4 className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-muted mb-3">Archivos</h4>
                <div className="space-y-2">
                  {visibleFiles.map((f) => (
                    <FileBadge
                      key={f.id || f.url}
                      name={f.name}
                      url={f.url}
                      viewMode={f.viewMode}
                    />
                  ))}
                </div>
              </div>
            )}

            {project.references.length > 0 && (
              <div className="rounded-xl bg-white p-5 ring-1 ring-inset ring-ink/10">
                <h4 className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-muted mb-3">Referencias</h4>
                <ul className="space-y-1.5">
                  {project.references.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink/80">
                      <PortfolioIcon name="book" width={14} height={14} className="mt-0.5 text-brand shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectsSection() {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<ProjectsData>("projects");
  const [selected, setSelected] = React.useState<ProjectItem | null>(null);

  return (
    <Section id="projects" tone="light">
      {loading || !data ? (
        <SectionSkeleton />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} />

          {data.projects.length > 0 ? (
            <motion.div
              layout
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {data.projects.map((p) => (
                  <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState sectionId="projects" />
          )}

          <ProjectDetailDialog
            project={selected}
            open={!!selected}
            onOpenChange={(v) => !v && setSelected(null)}
          />
        </>
      )}
    </Section>
  );
}
