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
        </>
      )}
    </Section>
  );
}
