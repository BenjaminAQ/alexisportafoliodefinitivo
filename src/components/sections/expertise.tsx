"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ExpertiseData } from "@/lib/content-types";

export function ExpertiseSection() {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<ExpertiseData>("expertise");

  return (
    <Section id="expertise" tone="dark" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 wire-mesh opacity-25" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative">
        {loading || !data ? (
          <SectionSkeleton tone="dark" />
        ) : (
          <>
            <DynamicSectionHeader header={data.header} tone="dark" />

            {data.areas.length > 0 ? (
              <motion.div
                initial={reduce ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {data.areas.map((area) => (
                  <motion.div
                    key={area.id}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="group relative rounded-2xl bg-brand-gradient p-6 sm:p-7 ring-1 ring-inset ring-brand/25 overflow-hidden hover:ring-brand/60 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 wire-mesh opacity-25" aria-hidden />
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />

                    <div className="relative flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                        <PortfolioIcon name={area.icon || "matrix"} width={22} height={22} />
                      </div>
                      <span className="font-mono-code text-xs font-semibold text-brand-light/60 tracking-wider">
                        AREA {area.number}
                      </span>
                    </div>

                    <h3 className="relative mt-5 font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                      {area.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-brand-light/75 line-clamp-3">
                      {area.description}
                    </p>

                    {area.topics.length > 0 && (
                      <Accordion type="single" collapsible className="relative mt-4">
                        <AccordionItem value="topics" className="border-brand/15">
                          <AccordionTrigger className="py-2 text-sm font-semibold text-brand-light hover:no-underline hover:text-brand">
                            <span className="flex items-center gap-2">
                              <PortfolioIcon name="layers" width={14} height={14} />
                              View {area.topics.length} topics
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-1">
                            <ul className="grid gap-1.5 pt-2">
                              {area.topics.map((t, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-brand-light/80">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    {area.materials && (
                      <div className="relative mt-4 border-t border-brand/15 pt-3">
                        <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/55">
                          Available material
                        </p>
                        <p className="mt-1.5 text-sm text-brand-light/75 leading-relaxed">{area.materials}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState sectionId="expertise" />
            )}
          </>
        )}
      </div>
    </Section>
  );
}
