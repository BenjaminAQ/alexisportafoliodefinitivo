"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import { renderRichText } from "@/lib/richtext";
import type { AboutData } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export function AboutSection({ tone = "light" }: { tone?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<AboutData>("about");
  const isDark = tone === "dark";

  const hasContent = data?.bio || (data?.highlights && data.highlights.length > 0) || (data?.factSections && data.factSections.length > 0);

  return (
    <Section id="about" tone={tone}>
      {loading || !data ? (
        <SectionSkeleton tone={tone} />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} tone={tone} />

          {hasContent ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-12">
              {/* ===== CUADRO IZQUIERDO: toda la info ===== */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7"
                style={{ minWidth: 0 }}
              >
                <div className={cn(
                  "rounded-2xl p-6 sm:p-8 ring-1 ring-inset shadow-sm",
                  isDark ? "bg-ink-soft/60 ring-brand/20" : "bg-white ring-ink/10"
                )}>
                  {data.bio && (
                    <div
                      className={cn(
                        "text-base sm:text-lg leading-relaxed whitespace-pre-line",
                        isDark ? "text-brand-light/85" : "text-ink/85"
                      )}
                      style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                    >
                      {renderRichText(data.bio)}
                    </div>
                  )}

                  {data.highlights.length > 0 && (
                    <ul className="mt-6 grid gap-2.5">
                      {data.highlights.map((h, i) => (
                        <motion.li
                          key={i}
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                          className={cn(
                            "flex items-start gap-2.5 rounded-lg p-3 ring-1 ring-inset",
                            isDark ? "bg-white/5 ring-brand/15" : "bg-surface ring-ink/10"
                          )}
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                            <PortfolioIcon name="check" width={12} height={12} />
                          </span>
                          <span
                            className={cn("text-sm leading-snug", isDark ? "text-brand-light/80" : "text-ink/80")}
                            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                          >
                            {renderRichText(h)}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>

              {/* ===== LADO DERECHO: secciones con emojis ===== */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5"
                style={{ minWidth: 0 }}
              >
                <div className={cn(
                  "rounded-2xl p-6 ring-1 ring-inset shadow-sm space-y-6",
                  isDark ? "bg-ink-soft/60 ring-brand/20" : "bg-white ring-ink/10"
                )}>
                  {data.factSections && data.factSections.length > 0 ? (
                    data.factSections.map((section) => (
                      <div key={section.id}>
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brand/10">
                          {section.emoji && (
                            <span className="text-xl">{section.emoji}</span>
                          )}
                          <h3 className={cn(
                            "font-display text-sm font-bold uppercase tracking-wide",
                            isDark ? "text-white" : "text-ink"
                          )}>
                            {section.title}
                          </h3>
                        </div>
                        <ul className="space-y-1.5">
                          {section.items.map((item, j) => (
                            <li
                              key={j}
                              className={cn(
                                "flex items-start gap-2 text-sm leading-snug",
                                isDark ? "text-brand-light/75" : "text-ink/75"
                              )}
                              style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : null}

                  {/* Quick Facts — emoji and title editable */}
                  {data.quickFacts && data.quickFacts.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brand/10">
                        <span className="text-xl">{data.quickFacts[0]?.emoji || "ℹ️"}</span>
                        <h3 className={cn(
                          "font-display text-sm font-bold uppercase tracking-wide",
                          isDark ? "text-white" : "text-ink"
                        )}>
                          {data.quickFacts[0]?.title || "Quick Facts"}
                        </h3>
                      </div>
                      <dl className="space-y-3">
                        {data.quickFacts.map((fact) => (
                          <div key={fact.id}>
                            <dt className={cn(
                              "font-mono-code text-[10px] uppercase tracking-[0.15em] mb-0.5",
                              isDark ? "text-brand-light/50" : "text-muted"
                            )}>
                              {fact.label}
                            </dt>
                            <dd className={cn(
                              "text-sm font-medium",
                              isDark ? "text-white" : "text-ink"
                            )} style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                              {renderRichText(fact.value)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            <EmptyState sectionId="about" />
          )}

          {/* Stats */}
          {data.stats.length > 0 && (
            <motion.dl
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {data.stats.map((s) => (
                <div key={s.id} className="relative overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white ring-1 ring-inset ring-brand/30">
                  <div className="absolute inset-0 wire-mesh opacity-30" />
                  <dt className="relative font-display text-4xl sm:text-5xl font-bold text-brand-light">{s.value}</dt>
                  <dd className="relative mt-2 text-sm text-brand-light/75 leading-snug">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          )}
        </>
      )}
    </Section>
  );
}
