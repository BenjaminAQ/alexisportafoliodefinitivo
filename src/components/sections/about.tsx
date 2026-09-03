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

  const hasContent =
    data?.bio ||
    (data?.highlights && data.highlights.length > 0) ||
    (data?.factSections && data.factSections.length > 0);

  return (
    <Section id="about" tone={tone}>
      {loading || !data ? (
        <SectionSkeleton tone={tone} />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} tone={tone} />

          {hasContent ? (
            <div className="mt-12 grid gap-8 lg:grid-cols-12">

              {/* ── Bio + Highlights ── */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7"
                style={{ minWidth: 0 }}
              >
                <div className={cn(
                  "rounded-2xl p-7 sm:p-8 ring-1 ring-inset shadow-sm relative overflow-hidden",
                  isDark
                    ? "bg-ink-soft/70 ring-brand/20 backdrop-blur-sm"
                    : "bg-white ring-ink/8 shadow-sm"
                )}>
                  {/* Corner accent */}
                  {isDark && (
                    <>
                      <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-brand/8 blur-2xl" />
                      <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-purple/8 blur-xl" />
                    </>
                  )}

                  {/* Top bar */}
                  <div className="relative flex items-center gap-2 mb-5 pb-4 border-b border-brand/10">
                    <span className="h-[2px] w-5 rounded-full bg-brand shadow-[0_0_6px_rgba(0,201,232,0.5)]" />
                    <span className={cn(
                      "font-mono-code text-[10px] font-bold uppercase tracking-[0.2em]",
                      isDark ? "text-brand-light/60" : "text-brand"
                    )}>
                      Bio
                    </span>
                  </div>

                  {data.bio && (
                    <div
                      className={cn(
                        "relative text-base sm:text-lg leading-relaxed whitespace-pre-line",
                        isDark ? "text-brand-light/82" : "text-ink/82"
                      )}
                      style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                    >
                      {renderRichText(data.bio)}
                    </div>
                  )}

                  {data.highlights.length > 0 && (
                    <ul className="relative mt-6 grid gap-2">
                      {data.highlights.map((h, i) => (
                        <motion.li
                          key={i}
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                          className={cn(
                            "flex items-start gap-3 rounded-xl p-3 ring-1 ring-inset transition-all duration-200",
                            isDark
                              ? "bg-white/4 ring-brand/12 hover:bg-white/6 hover:ring-brand/25"
                              : "bg-surface ring-ink/8 hover:ring-brand/20"
                          )}
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/25">
                            <PortfolioIcon name="check" width={11} height={11} />
                          </span>
                          <span
                            className={cn("text-sm leading-relaxed", isDark ? "text-brand-light/78" : "text-ink/80")}
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

              {/* ── Fact sections + Quick facts ── */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5"
                style={{ minWidth: 0 }}
              >
                <div className={cn(
                  "rounded-2xl p-6 ring-1 ring-inset shadow-sm space-y-6 relative overflow-hidden h-full",
                  isDark
                    ? "bg-ink-soft/70 ring-brand/20 backdrop-blur-sm"
                    : "bg-white ring-ink/8"
                )}>
                  {isDark && (
                    <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-purple/8 blur-2xl pointer-events-none" />
                  )}

                  {data.factSections && data.factSections.length > 0 &&
                    data.factSections.map((section) => (
                      <div key={section.id} className="relative">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brand/10">
                          {section.emoji && <span className="text-lg">{section.emoji}</span>}
                          <h3 className={cn(
                            "font-display text-sm font-bold uppercase tracking-wide",
                            isDark ? "text-white" : "text-ink"
                          )}>
                            {section.title}
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {section.items.map((item, j) => (
                            <li
                              key={j}
                              className={cn(
                                "flex items-start gap-2.5 text-sm leading-snug",
                                isDark ? "text-brand-light/72" : "text-ink/72"
                              )}
                              style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand shadow-[0_0_4px_rgba(0,201,232,0.4)]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  }

                  {data.quickFacts && data.quickFacts.length > 0 && (
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brand/10">
                        <span className="text-lg">{data.quickFacts[0]?.emoji || "ℹ️"}</span>
                        <h3 className={cn(
                          "font-display text-sm font-bold uppercase tracking-wide",
                          isDark ? "text-white" : "text-ink"
                        )}>
                          {data.quickFacts[0]?.title || "Quick Facts"}
                        </h3>
                      </div>
                      <dl className="space-y-3.5">
                        {data.quickFacts.map((fact) => (
                          <div key={fact.id} className={cn(
                            "rounded-lg px-3 py-2 ring-1 ring-inset",
                            isDark ? "bg-white/3 ring-brand/10" : "bg-surface ring-ink/6"
                          )}>
                            <dt className={cn(
                              "font-mono-code text-[9px] uppercase tracking-[0.18em] mb-1",
                              isDark ? "text-brand-light/45" : "text-muted"
                            )}>
                              {fact.label}
                            </dt>
                            <dd className={cn(
                              "text-sm font-semibold",
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

          {/* Stats row */}
          {data.stats.length > 0 && (
            <motion.dl
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {data.stats.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.07 }}
                  className="relative overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white ring-1 ring-inset ring-brand/25 hover:ring-brand/50 hover:shadow-[0_0_40px_rgba(0,201,232,0.2)] transition-all duration-300 cursor-default"
                >
                  <div className="absolute inset-0 wire-mesh opacity-20" />
                  <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-brand/15 blur-xl" />
                  <dt className="relative font-display text-4xl sm:text-5xl font-black text-brand-light drop-shadow-[0_0_16px_rgba(0,201,232,0.4)]">
                    {s.value}
                  </dt>
                  <dd className="relative mt-2 text-sm text-brand-light/68 leading-snug font-medium">
                    {s.label}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          )}
        </>
      )}
    </Section>
  );
}
