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
import { FolderItem } from "../portfolio/folder-item";
import { renderRichText } from "@/lib/richtext";
import type { ProjectsData, ProjectItem } from "@/lib/content-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

// ============================================================
// PROJECT CARD — tarjeta visible en el grid
// ============================================================
function ProjectCard({ project, onOpen }: { project: ProjectItem; onOpen: () => void }) {
  return (
    <motion.button
      layout
      onClick={onOpen}
      className="group relative flex flex-col text-left rounded-2xl bg-white overflow-hidden ring-1 ring-inset ring-ink/10 shadow-sm hover:ring-brand/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Imagen de portada */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-brand-gradient shrink-0">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <div className="absolute inset-0 wire-mesh opacity-40" />
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand/25 blur-2xl" />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {/* Badges sobre la imagen */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
          {project.area && (
            <span className="font-mono-code text-[10px] uppercase tracking-wider text-white/90 truncate max-w-[60%]">
              {project.area}
            </span>
          )}
          {project.level && <LevelBadge level={project.level as any} />}
        </div>
      </div>

      {/* Contenido textual */}
      <div className="flex flex-col flex-1 p-5" style={{ minWidth: 0 }}>
        <h3
          className="font-display text-lg font-bold text-ink leading-snug group-hover:text-brand transition-colors"
          style={{ overflowWrap: "break-word", wordBreak: "break-word", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {project.title}
        </h3>
        <p
          className="mt-2 text-sm text-muted leading-relaxed flex-1"
          style={{ overflowWrap: "break-word", wordBreak: "break-word", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {renderRichText(project.abstract)}
        </p>

        {project.tech.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
            {project.tech.length > 3 && (
              <span className="inline-flex items-center rounded-md bg-ink px-2 py-0.5 font-mono-code text-[11px] text-brand-light">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand">
          View project
          <PortfolioIcon name="arrow" width={12} height={12} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}

// ============================================================
// PROJECT DETAIL MODAL — casi pantalla completa, sin desbordes
// ============================================================
function ProjectDetailDialog({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectItem | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!project) return null;

  const visibleFiles = project.files.filter(
    (f) => f.url && f.viewMode && f.viewMode !== "none"
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 gap-0 overflow-hidden bg-surface flex flex-col"
        style={{
          maxWidth: "96vw",
          width: "96vw",
          maxHeight: "96vh",
          height: "96vh",
          borderRadius: "16px",
        }}
      >
        {/* ====== HEADER con imagen de portada ====== */}
        <div
          className="relative overflow-hidden bg-brand-gradient shrink-0"
          style={{ height: "220px" }}
        >
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 wire-mesh opacity-30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-transparent" />

          {/* Badges y título sobre la imagen */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8" style={{ minWidth: 0 }}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {project.category && (
                <span
                  className="inline-block rounded-full bg-brand/40 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-inset ring-brand/50 backdrop-blur-sm truncate"
                  style={{ maxWidth: "250px" }}
                >
                  {project.category}
                </span>
              )}
              {project.area && (
                <span className="font-mono-code text-[10px] uppercase tracking-wider text-brand-light/80 truncate" style={{ maxWidth: "200px" }}>
                  {project.area}
                </span>
              )}
              {project.level && <LevelBadge level={project.level as any} />}
            </div>
            <DialogTitle
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-left"
              style={{ overflowWrap: "break-word", wordBreak: "break-word", lineHeight: "1.2" }}
            >
              {project.title}
            </DialogTitle>
          </div>
        </div>

        {/* ====== CONTENIDO SCROLLABLE ====== */}
        <div
          className="flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8"
          style={{ minWidth: 0 }}
        >
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Resumen */}
            {project.abstract && (
              <p
                className="text-base sm:text-lg text-ink/80 leading-relaxed"
                style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                {renderRichText(project.abstract)}
              </p>
            )}

            {/* Tecnologías */}
            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            )}

            {/* Separador */}
            <div className="h-px bg-ink/10" />

            {/* Secciones de detalle */}
            {project.sections.map((s, i) => (
              <div key={i} style={{ minWidth: 0 }}>
                <h3 className="font-display text-xl font-semibold text-ink flex items-center gap-3 mb-3">
                  <span className="h-1 w-6 rounded-full bg-brand shrink-0" />
                  <span style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                    {s.heading}
                  </span>
                </h3>
                <p
                  className="text-base leading-relaxed text-ink/80 pl-9"
                  style={{ overflowWrap: "break-word", wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                >
                  {renderRichText(s.body)}
                </p>
              </div>
            ))}

            {/* Project files — file explorer style */}
            {(visibleFiles.length > 0 || (project.folders && project.folders.some(f => (f.files || []).some(ff => ff.url && ff.viewMode && ff.viewMode !== "none")))) && (
              <div className="rounded-2xl bg-white p-6 ring-1 ring-inset ring-ink/10">
                <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
                  <PortfolioIcon name="layers" width={16} height={16} className="text-brand" />
                  Project files
                </h4>

                <div className="space-y-3">
                  {/* Folders (collapsible, file-explorer style) */}
                  {project.folders && project.folders.map((folder) => {
                    const folderFiles = (folder.files || []).filter(f => f.url && f.viewMode && f.viewMode !== "none");
                    if (folderFiles.length === 0) return null;
                    return (
                      <FolderItem key={folder.id} folder={folder} />
                    );
                  })}

                  {/* Loose files (not inside a folder) */}
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

            {/* References */}
            {project.references.length > 0 && (
              <div className="rounded-2xl bg-white p-6 ring-1 ring-inset ring-ink/10">
                <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
                  <PortfolioIcon name="book" width={16} height={16} className="text-brand" />
                  References
                </h4>
                <ul className="space-y-2">
                  {project.references.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-ink/80"
                      style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                    >
                      <PortfolioIcon name="book" width={14} height={14} className="mt-1 text-brand shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// PROJECTS SECTION — agrupada por categoría
// ============================================================
export function ProjectsSection({ tone = "light" }: { tone?: "light" | "dark" }) {
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
    <Section id="projects" tone={tone}>
      {loading || !data ? (
        <SectionSkeleton />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} />

          {data.projects.length > 0 ? (
            <div className="mt-10 space-y-12">
              {grouped.map((group) => (
                <div key={group.category}>
                  {/* Encabezado de categoría */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="h-px flex-1 bg-brand/30" />
                    <h3
                      className="font-display text-lg sm:text-xl font-bold text-ink px-4 py-1.5 rounded-full bg-brand/10 ring-1 ring-inset ring-brand/20 truncate"
                    >
                      {group.category}
                    </h3>
                    <span className="font-mono-code text-[11px] text-muted shrink-0">
                      {group.projects.length} {group.projects.length === 1 ? "proyecto" : "proyectos"}
                    </span>
                    <span className="h-px flex-1 bg-brand/30" />
                  </div>

                  {/* Grid de proyectos */}
                  <motion.div
                    layout
                    initial={reduce ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-5%" }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
