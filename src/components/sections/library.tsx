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
import type { LibraryData } from "@/lib/content-types";

export function LibrarySection() {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<LibraryData>("library");

  return (
    <Section id="library" tone="light">
      {loading || !data ? (
        <SectionSkeleton />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} />

          {data.items.length > 0 ? (
            <motion.div
              layout
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              className="mt-8 space-y-2.5"
            >
              <AnimatePresence mode="popLayout">
                {data.items.map((d) => (
                  <motion.div
                    key={d.id}
                    layout
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                    className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-xl bg-white p-4 ring-1 ring-inset ring-ink/10 hover:ring-brand/40 hover:shadow-[0_12px_28px_-18px_rgba(0,180,216,0.45)] transition-all"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-inset ring-brand/25">
                      <PortfolioIcon name="pdf" width={18} height={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base font-semibold text-ink leading-snug">{d.title}</h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                        {d.type && <span className="font-mono-code uppercase tracking-wider">{d.type}</span>}
                        {d.area && <><span className="text-ink/30">·</span><span>{d.area}</span></>}
                        {d.software && <><span className="text-ink/30">·</span><span>{d.software}</span></>}
                        {d.language && <><span className="text-ink/30">·</span><span>{d.language}</span></>}
                        {d.date && <><span className="text-ink/30">·</span><time dateTime={d.date}>{d.date}</time></>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {d.level && <LevelBadge level={d.level as any} />}
                      {d.file && d.viewMode && d.viewMode !== "none" ? (
                        <FileBadge
                          name={d.title}
                          url={d.file}
                          viewMode={d.viewMode}
                        />
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState sectionId="library" />
          )}
        </>
      )}
    </Section>
  );
}
