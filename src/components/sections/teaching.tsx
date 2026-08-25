"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import { FileBadge } from "@/components/admin/file-viewer";
import type { TeachingData } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export function TeachingSection({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<TeachingData>("teaching");
  const isDark = tone === "dark";

  return (
    <Section id="teaching" tone={tone} className="overflow-hidden">
      {loading || !data ? (
        <SectionSkeleton tone={tone} />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} tone={tone} />

          {/* Items grid */}
          {data.items.length > 0 && (
            <motion.div
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className={cn(
                    "group rounded-2xl overflow-hidden ring-1 ring-inset hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                    isDark ? "bg-ink-soft/60 ring-brand/20 hover:ring-brand/50" : "bg-white ring-ink/10 hover:ring-brand/40"
                  )}
                >
                  {/* Image (if exists) */}
                  {item.image && (
                    <div className="relative h-40 overflow-hidden bg-brand-gradient shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-inset ring-brand/30 mb-3",
                      isDark ? "bg-brand/15 text-brand-light" : "bg-brand/10 text-brand"
                    )}>
                      <PortfolioIcon name={item.icon || "book"} width={18} height={18} />
                    </div>
                    <h3 className={cn(
                      "font-display text-base font-bold leading-snug",
                      isDark ? "text-white" : "text-ink"
                    )} style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                      {item.title}
                    </h3>
                    <p className={cn(
                      "mt-2 text-sm leading-relaxed",
                      isDark ? "text-brand-light/70" : "text-muted"
                    )} style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Activities: imagen izquierda + texto derecha */}
          {data.activities && data.activities.length > 0 && (
            <motion.div
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="mt-16"
            >
              <h3 className={cn(
                "font-display text-2xl font-bold mb-10 flex items-center gap-3",
                isDark ? "text-white" : "text-ink"
              )}>
                <span className="h-1 w-8 rounded-full bg-brand" />
                Activities
              </h3>

              <div className="space-y-8">
                {data.activities.map((act) => (
                  <motion.div
                    key={act.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className={cn(
                      "flex flex-col sm:flex-row gap-5 rounded-2xl overflow-hidden ring-1 ring-inset",
                      isDark ? "bg-ink-soft/40 ring-brand/15" : "bg-white ring-ink/10"
                    )}
                  >
                    {/* Imagen izquierda */}
                    {act.image && (
                      <div className="sm:w-48 sm:shrink-0 h-40 sm:h-auto overflow-hidden bg-brand-gradient">
                        <img
                          src={act.image}
                          alt={act.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    {/* Texto derecha */}
                    <div className="flex-1 p-5 sm:py-6 sm:pr-6" style={{ minWidth: 0 }}>
                      {act.date && (
                        <span className="font-mono-code text-xs uppercase tracking-[0.15em] text-brand mb-2 block">
                          {act.date}
                        </span>
                      )}
                      <h4 className={cn(
                        "font-display text-lg font-bold mb-2",
                        isDark ? "text-white" : "text-ink"
                      )} style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                        {act.title}
                      </h4>
                      {act.description && (
                        <p className={cn(
                          "text-sm leading-relaxed",
                          isDark ? "text-brand-light/70" : "text-muted"
                        )} style={{ overflowWrap: "break-word", wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
                          {act.description}
                        </p>
                      )}

                      {/* Archivos */}
                      {act.files && act.files.filter(f => f.url && f.viewMode && f.viewMode !== "none").length > 0 && (
                        <div className="mt-4 space-y-2">
                          {act.files.filter(f => f.url && f.viewMode && f.viewMode !== "none").map((f) => (
                            <FileBadge key={f.id || f.url} name={f.name} url={f.url} viewMode={f.viewMode} />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {!data.items.length && !(data.activities && data.activities.length > 0) && (
            <EmptyState sectionId="teaching" />
          )}
        </>
      )}
    </Section>
  );
}
