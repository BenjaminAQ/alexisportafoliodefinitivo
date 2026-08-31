"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { LevelBadge } from "../portfolio/primitives";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import { FileBadge } from "@/components/admin/file-viewer";
import type { LibraryData, LibraryItem } from "@/lib/content-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

function LibraryCard({ item, onOpen }: { item: LibraryItem; onOpen: () => void }) {
  const visibleFiles = (item.files || []).filter(
    (f) => f.url && f.viewMode && f.viewMode !== "none"
  );
  const hasContent = visibleFiles.length > 0;

  return (
    <motion.button
      layout
      onClick={onOpen}
      className="group relative flex flex-col text-left rounded-2xl bg-white overflow-hidden ring-1 ring-inset ring-ink/10 shadow-sm hover:ring-brand/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Imagen de portada */}
      <div className="relative h-36 sm:h-40 overflow-hidden bg-brand-gradient shrink-0">
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <div className="absolute inset-0 wire-mesh opacity-40" />
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand/25 blur-2xl" />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
          {item.type && (
            <span className="font-mono-code text-[10px] uppercase tracking-wider text-white/90 truncate max-w-[60%]">
              {item.type}
            </span>
          )}
          {item.level && <LevelBadge level={item.level as any} />}
        </div>
        {hasContent && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-brand/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            <PortfolioIcon name="layers" width={10} height={10} />
            {visibleFiles.length}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4" style={{ minWidth: 0 }}>
        <h3
          className="font-display text-base font-bold text-ink leading-snug group-hover:text-brand transition-colors"
          style={{ overflowWrap: "break-word", wordBreak: "break-word", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {item.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted">
          {item.area && <span className="truncate max-w-[120px]">{item.area}</span>}
          {item.language && <><span className="text-ink/30">·</span><span>{item.language}</span></>}
          {item.date && <><span className="text-ink/30">·</span><time dateTime={item.date}>{item.date}</time></>}
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand">
          View document
          <PortfolioIcon name="arrow" width={12} height={12} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}

function LibraryDetailDialog({
  item,
  open,
  onOpenChange,
}: {
  item: LibraryItem | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!item) return null;
  const visibleFiles = (item.files || []).filter(
    (f) => f.url && f.viewMode && f.viewMode !== "none"
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 gap-0 overflow-hidden bg-surface flex flex-col"
        style={{ maxWidth: "96vw", width: "96vw", maxHeight: "96vh", height: "96vh", borderRadius: "16px" }}
      >
        {/* Header con imagen */}
        <div className="relative overflow-hidden bg-brand-gradient shrink-0" style={{ height: "200px" }}>
          {item.coverImage ? (
            <img src={item.coverImage} alt={item.title} className="h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 wire-mesh opacity-30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8" style={{ minWidth: 0 }}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {item.type && (
                <span className="inline-block rounded-full bg-brand/40 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-inset ring-brand/50 backdrop-blur-sm truncate" style={{ maxWidth: "200px" }}>
                  {item.type}
                </span>
              )}
              {item.area && (
                <span className="font-mono-code text-[10px] uppercase tracking-wider text-brand-light/80 truncate" style={{ maxWidth: "150px" }}>
                  {item.area}
                </span>
              )}
              {item.level && <LevelBadge level={item.level as any} />}
            </div>
            <DialogTitle
              className="font-display text-2xl sm:text-3xl font-bold text-white text-left"
              style={{ overflowWrap: "break-word", wordBreak: "break-word", lineHeight: "1.2" }}
            >
              {item.title}
            </DialogTitle>
          </div>
        </div>

        {/* Contenido scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8" style={{ minWidth: 0 }}>
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm">
              {item.software && (
                <div><span className="text-muted">Software:</span> <span className="font-medium text-ink">{item.software}</span></div>
              )}
              {item.language && (
                <div><span className="text-muted">Idioma:</span> <span className="font-medium text-ink">{item.language}</span></div>
              )}
              {item.date && (
                <div><span className="text-muted">Fecha:</span> <span className="font-medium text-ink">{item.date}</span></div>
              )}
            </div>

            <div className="h-px bg-ink/10" />

            {/* Archivos */}
            {visibleFiles.length > 0 ? (
              <div className="rounded-2xl bg-white p-6 ring-1 ring-inset ring-ink/10">
                <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
                  <PortfolioIcon name="layers" width={16} height={16} className="text-brand" />
                  Documents ({visibleFiles.length})
                </h4>
                <div className="space-y-3">
                  {visibleFiles.map((f) => (
                    <FileBadge key={f.id || f.url} name={f.name} url={f.url} viewMode={f.viewMode} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted text-center py-8">No files to display.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function LibrarySection({ tone = "light" }: { tone?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<LibraryData>("library");
  const [selected, setSelected] = React.useState<LibraryItem | null>(null);

  // Agrupar por área
  const grouped = React.useMemo(() => {
    if (!data || data.items.length === 0) return [];
    const groups: { area: string; items: LibraryItem[] }[] = [];
    for (const item of data.items) {
      const area = item.area || "General";
      let group = groups.find((g) => g.area === area);
      if (!group) {
        group = { area, items: [] };
        groups.push(group);
      }
      group.items.push(item);
    }
    return groups;
  }, [data]);

  return (
    <Section id="library" tone={tone}>
      {loading || !data ? (
        <SectionSkeleton />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} />

          {data.items.length > 0 ? (
            <div className="mt-10 space-y-12">
              {grouped.map((group) => (
                <div key={group.area}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="h-px flex-1 bg-brand/30" />
                    <h3
                      className="font-display text-lg sm:text-xl font-bold text-ink px-4 py-1.5 rounded-full bg-brand/10 ring-1 ring-inset ring-brand/20"
                    >
                      {group.area}
                    </h3>
                    <span className="font-mono-code text-[11px] text-muted shrink-0">
                      {group.items.length} {group.items.length === 1 ? "documento" : "documentos"}
                    </span>
                    <span className="h-px flex-1 bg-brand/30" />
                  </div>

                  <motion.div
                    layout
                    initial={reduce ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-5%" }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    <AnimatePresence mode="popLayout">
                      {group.items.map((item) => (
                        <LibraryCard key={item.id} item={item} onOpen={() => setSelected(item)} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState sectionId="library" />
          )}

          <LibraryDetailDialog
            item={selected}
            open={!!selected}
            onOpenChange={(v) => !v && setSelected(null)}
          />
        </>
      )}
    </Section>
  );
}
