"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import type { TeachingData } from "@/lib/content-types";

export function TeachingSection() {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<TeachingData>("teaching");

  return (
    <Section id="teaching" tone="dark" className="overflow-hidden">
      {loading || !data ? (
        <SectionSkeleton tone="dark" />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} tone="dark" />

          {data.items.length > 0 ? (
            <motion.div
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="group rounded-2xl bg-ink-soft/60 p-6 ring-1 ring-inset ring-brand/20 hover:ring-brand/50 hover:shadow-[0_18px_40px_-20px_rgba(0,180,216,0.35)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                    <PortfolioIcon name={item.icon || "book"} width={20} height={20} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-white leading-snug">{item.title}</h3>
                  <p className="mt-2 text-sm text-brand-light/70 leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState sectionId="teaching" />
          )}

          {/* Línea de tiempo de actividades (sin recuadros) */}
          {data.activities && data.activities.length > 0 && (
            <motion.div
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="mt-16"
            >
              <h3 className="font-display text-xl font-bold text-white mb-10 flex items-center gap-3">
                <span className="h-1 w-6 rounded-full bg-brand" />
                Actividades
              </h3>
              <div className="relative pl-8">
                {/* Línea vertical */}
                <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-brand/50 to-transparent" />

                {data.activities.map((act, i) => (
                  <motion.div
                    key={act.id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                    }}
                    className="relative mb-10 last:mb-0"
                  >
                    {/* Nodo */}
                    <div className="absolute -left-8 top-1 flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-brand shadow-[0_0_12px_rgba(0,180,216,0.6)] ring-4 ring-brand/10" />
                    </div>

                    {/* Contenido sin recuadro */}
                    <div className="flex flex-col gap-1">
                      {act.date && (
                        <span className="font-mono-code text-[11px] uppercase tracking-[0.15em] text-brand">
                          {act.date}
                        </span>
                      )}
                      <h4 className="font-display text-lg font-bold text-white" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                        {act.title}
                      </h4>
                      {act.description && (
                        <p className="text-sm text-brand-light/70 leading-relaxed max-w-2xl" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                          {act.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </Section>
  );
}
