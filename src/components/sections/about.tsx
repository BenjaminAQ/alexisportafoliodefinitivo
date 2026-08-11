"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import type { AboutData } from "@/lib/content-types";

export function AboutSection() {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<AboutData>("about");

  return (
    <Section id="about" tone="light">
      {loading || !data ? (
        <SectionSkeleton />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} />

          {data.bio || data.highlights.length > 0 || data.stats.length > 0 ? (
            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5"
              >
                <div className="relative mx-auto max-w-sm">
                  <div className="absolute -inset-3 rounded-3xl bg-brand/10 blur-2xl" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-gradient ring-1 ring-inset ring-brand/30 shadow-xl">
                    <div className="absolute inset-0 wire-mesh opacity-30" />
                    <div className="relative flex h-full w-full items-center justify-center">
                      <span className="font-display text-[10rem] font-bold text-white/95 drop-shadow-[0_4px_24px_rgba(0,187,212,0.4)]">
                        A
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-ink-deep/70 backdrop-blur-md px-4 py-2 ring-1 ring-inset ring-brand/30">
                      <p className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-brand-light/70">
                        Civil Engineer
                      </p>
                      <p className="font-display text-sm font-semibold text-white">Alexis</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-4"
                style={{ minWidth: 0 }}
              >
                {data.bio && (
                  <p className="text-base sm:text-lg leading-relaxed text-ink/85 whitespace-pre-line mb-7" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                    {data.bio}
                  </p>
                )}
                {data.highlights.length > 0 && (
                  <ul className="grid gap-2.5">
                    {data.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                        className="flex items-start gap-2.5 rounded-lg bg-white/70 p-3 ring-1 ring-inset ring-ink/10"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                          <PortfolioIcon name="check" width={12} height={12} />
                        </span>
                        <span className="text-sm text-ink/80 leading-snug" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>{h}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>

              {/* Columna derecha: Quick Facts */}
              {data.quickFacts && data.quickFacts.length > 0 && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-3"
                >
                  <div className="rounded-2xl bg-brand-gradient p-6 ring-1 ring-inset ring-brand/30 shadow-lg overflow-hidden relative">
                    <div className="absolute inset-0 wire-mesh opacity-20" />
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-brand/20">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/20 text-brand-light">
                          <PortfolioIcon name="layers" width={16} height={16} />
                        </div>
                        <h3 className="font-display text-base font-bold text-white">Datos rápidos</h3>
                      </div>
                      <dl className="space-y-4">
                        {data.quickFacts.map((fact) => (
                          <div key={fact.id}>
                            <dt className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/60 mb-1" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                              {fact.label}
                            </dt>
                            <dd className="text-sm font-medium text-white" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                              {fact.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <EmptyState sectionId="about" />
          )}

          {data.stats.length > 0 && (
            <motion.dl
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4"
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
