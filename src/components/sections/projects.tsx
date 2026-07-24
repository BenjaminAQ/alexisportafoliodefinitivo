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
      className="group relative flex flex-col text-left rounded-2xl bg-white p-0 ring-1 ring-inset ring-ink/10 shadow-[0_2px_10px_-4px_rgba(51,78,104,0.10)] hover:ring-brand/40 hover:shadow-[0_18px_40px_-20px_rgba(0,180,216,0.45)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Imagen de portada (o gradient fallback) */}
      <div className="relative h-40 sm:h-44 overflow-hidden bg-brand-gradient">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <>
            <div className="absolute inset-0 wire-mesh opacity-40" />
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand/25 blur-2xl" />
          </>
        )}
        {/* Overlay gradient para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/80 via-ink-deep/20 to-transparent" />
        {/* Badges sobre la imagen */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          {project.area && (
            <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-white/90">
              {project.area}
            </span>
          )}
          {project.level && <LevelBadge level={project.level as any} />}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-brand transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3 flex-1">
          {project.abstract}
        </p>

        {project.tech.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
            {project.tech.length > 4 && (
              <span className="inline-flex items-center rounded-md bg-ink px-2 py-0.5 font-mono-code text-[11px] text-brand-light">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand">
          Ver proyecto
          <PortfolioIcon name="arrow" width={12} height={12} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}

function ProjectDetailDialog({ project, open, onOpenChange }: { project: ProjectItem | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!project) return null;
  // Filtrar archivos visibles (viewMode !== "none" y con url)
  const visibleFiles = project.files.filter((f) => f.url && f.viewMode && f.viewMode !== "none");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[92vw] max-h-[95vh] p-0 gap-0 overflow-hidden bg-surface">
        {/* Header con imagen de portada */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-brand-gradient shrink-0">
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 wire-mesh opacity-30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {project.category && (
                <span className="inline-flex items-center gap-1 rounded-full bg-brand/30 px-2.5 py-0.5 text-[11px] font-semibold text-white ring-1 ring-inset ring-brand/40 backdrop-blur-sm">
                  {project.category}
                </span>
              )}
              {project.area && (
                <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-brand-light/80">
                  {project.area}
                </span>
              )}
              {project.level && <LevelBadge level={project.level as any} />}
            </div>
            <DialogHeader>
              <DialogTitle className="font-display text-3xl sm:text-4xl font-bold text-white text-left">
                {project.title}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <ScrollArea className="flex-1" style={{ maxHeight: "calc(90vh - 14rem)" }}>
          <div className="px-6 py-6 sm:px-8 space-y-6">
            {project.abstract && (
              <DialogDescription className="text-sm sm:text-base text-ink/80 text-left leading-relaxed">
                {project.abstract}
              </DialogDescription>
            )}

            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            )}

            {project.sections.map((s, i) => (
              <div key={i}>
                <h3 className="font-display text-lg font-semibold text-ink flex items-center gap-2">
                  <span className="h-1 w-5 rounded-full bg-brand" />
                  {s.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{s.body}</p>
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

  // Agrupar proyectos por categoría
  const grouped = React.useMemo(() => {
    if (!data || data.projects.length === 0) return [];
    const groups: { category: string; projects: ProjectItem[] }[] = [];
    for (const p of data.projects) {
      const cat = p.category || "General";
      let group = groups.find((g) => g.category === cat);
      if (!group) {
        group = { category: cat, projects: [] };
        groups.push(group);
      }
      group.projects.push(p);
    }
    return groups;
  }, [data]);

  return (
    <Section id="projects" tone="light">
      {loading || !data ? (
        <SectionSkeleton />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} />

          {data.projects.length > 0 ? (
            <div className="mt-8 space-y-10">
              {grouped.map((group) => (
                <div key={group.category}>
                  {/* Encabezado de categoría */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-px flex-1 bg-brand/30" />
                    <h3 className="font-display text-lg sm:text-xl font-bold text-ink px-3 py-1 rounded-full bg-brand/10 ring-1 ring-inset ring-brand/20">
                      {group.category}
                    </h3>
                    <span className="font-mono-code text-[11px] text-muted">
                      {group.projects.length} {group.projects.length === 1 ? "proyecto" : "proyectos"}
                    </span>
                    <span className="h-px flex-1 bg-brand/30" />
                  </div>

                  {/* Grid de proyectos de esta categoría */}
                  <motion.div
                    layout
                    initial={reduce ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-5%" }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                    className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    <AnimatePresence mode="popLayout">
                      {group.projects.map((p) => (
                        <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>
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
