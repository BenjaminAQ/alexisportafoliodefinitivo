"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { LevelBadge } from "../portfolio/primitives";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import type { ResourcesData } from "@/lib/content-types";

function typeIcon(type: string) {
  switch (type) {
    case "video": return "video";
    case "PDF": return "pdf";
    case "code": return "code";
    case "template": return "template";
    case "manual": return "manual";
    default: return "example";
  }
}

export function ResourcesSection() {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<ResourcesData>("resources");

  return (
    <Section id="resources" tone="light">
      {loading || !data ? (
        <SectionSkeleton />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} />

          {data.resources.length > 0 ? (
            <motion.div
              layout
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {data.resources.map((r) => (
                  <motion.article
                    key={r.id}
                    layout
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="group relative flex flex-col rounded-2xl bg-white p-5 ring-1 ring-inset ring-ink/10 hover:ring-brand/40 hover:shadow-[0_18px_40px_-20px_rgba(0,187,212,0.4)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-2 py-1 text-[11px] font-semibold text-brand ring-1 ring-inset ring-brand/20">
                        <PortfolioIcon name={typeIcon(r.type)} width={12} height={12} />
                        {r.type}
                      </span>
                      {r.level && <LevelBadge level={r.level as any} />}
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-ink leading-snug">{r.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{r.description}</p>
                    <div className="mt-4 space-y-1.5 border-t border-ink/10 pt-3">
                      {r.category && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono-code uppercase tracking-wider text-muted">Category</span>
                          <span className="text-ink/80 text-right max-w-[60%]">{r.category}</span>
                        </div>
                      )}
                      {r.duration && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono-code uppercase tracking-wider text-muted">Duration</span>
                          <span className="text-ink/80 inline-flex items-center gap-1">
                            <PortfolioIcon name="clock" width={11} height={11} className="text-brand" />
                            {r.duration}
                          </span>
                        </div>
                      )}
                      {r.prerequisites && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono-code uppercase tracking-wider text-muted">Prerequisites</span>
                          <span className="text-ink/80 text-right max-w-[60%]">{r.prerequisites}</span>
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState sectionId="resources" />
          )}
        </>
      )}
    </Section>
  );
}
