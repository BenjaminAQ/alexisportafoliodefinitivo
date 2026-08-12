"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
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
                  className={cn(
                    "group rounded-2xl p-6 ring-1 ring-inset hover:shadow-[0_18px_40px_-20px_rgba(0,180,216,0.35)] hover:-translate-y-1 transition-all duration-300",
                    isDark
                      ? "bg-ink-soft/60 ring-brand/20 hover:ring-brand/50 backdrop-blur-sm"
                      : "bg-white ring-ink/10 hover:ring-brand/40"
                  )}
                >
                  <div className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-lg ring-1 ring-inset ring-brand/30",
                    isDark ? "bg-brand/15 text-brand-light" : "bg-brand/10 text-brand"
                  )}>
                    <PortfolioIcon name={item.icon || "book"} width={20} height={20} />
                  </div>
                  <h3 className={cn(
                    "mt-4 font-display text-base font-semibold leading-snug",
                    isDark ? "text-white" : "text-ink"
                  )}>{item.title}</h3>
                  <p className={cn(
                    "mt-2 text-sm leading-relaxed",
                    isDark ? "text-brand-light/70" : "text-muted"
                  )}>{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState sectionId="teaching" />
          )}

          {/* Activities timeline — centered, larger */}
          {data.activities && data.activities.length > 0 && (
            <motion.div
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="mt-20 max-w-4xl mx-auto"
            >
              <h3 className={cn(
                "font-display text-2xl font-bold mb-12 flex items-center gap-3 justify-center",
                isDark ? "text-white" : "text-ink"
              )}>
                <span className="h-1 w-8 rounded-full bg-brand" />
                Activities
                <span className="h-1 w-8 rounded-full bg-brand" />
              </h3>
              <div className="relative pl-10">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-brand/50 to-transparent" />

                {data.activities.map((act) => (
                  <motion.div
                    key={act.id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                    }}
                    className="relative mb-12 last:mb-0"
                  >
                    {/* Node */}
                    <div className="absolute -left-10 top-1 flex items-center justify-center">
                      <div className="h-5 w-5 rounded-full bg-brand shadow-[0_0_16px_rgba(0,180,216,0.7)] ring-4 ring-brand/10" />
                    </div>

                    {/* Content without box */}
                    <div className="flex flex-col gap-1.5">
                      {act.date && (
                        <span className="font-mono-code text-xs uppercase tracking-[0.15em] text-brand">
                          {act.date}
                        </span>
                      )}
                      <h4 className={cn(
                        "font-display text-xl font-bold",
                        isDark ? "text-white" : "text-ink"
                      )} style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                        {act.title}
                      </h4>
                      {act.description && (
                        <p className={cn(
                          "text-base leading-relaxed max-w-2xl",
                          isDark ? "text-brand-light/70" : "text-muted"
                        )} style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
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
