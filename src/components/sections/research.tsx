"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon as Icon } from "../portfolio/icons";
import { RESEARCH_TOPICS, RESEARCH_CATEGORIES } from "@/data/content";

export function ResearchSection() {
  const reduce = useReducedMotion();
  return (
    <Section id="research" tone="dark" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 wire-mesh opacity-20" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="Research and Manuscripts"
          title={
            <>
              Moving toward{" "}
              <span className="text-brand-gradient">formal research</span> in structural & earthquake engineering
            </>
          }
          description="A working transition from applied technical work to documented research — covering manuscripts in preparation, technical reports, literature reviews and numerical studies."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Topics */}
          <motion.div
            variants={fadeUpContainer}
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="lg:col-span-7"
          >
            <h3 className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-brand-light/60 mb-3">
              Potential research topics
            </h3>
            <div className="space-y-2.5">
              {RESEARCH_TOPICS.map((t, i) => (
                <motion.div
                  key={t}
                  variants={fadeUpItem}
                  className="group flex items-start gap-4 rounded-xl bg-ink-deep/50 p-4 ring-1 ring-inset ring-brand/15 hover:ring-brand/45 transition-all"
                >
                  <span className="font-display text-2xl font-bold text-brand/60 group-hover:text-brand transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="flex-1 text-sm sm:text-base text-brand-light/85 leading-snug pt-1">{t}</p>
                  <Icon name="arrow" width={14} height={14} className="text-brand-light/40 group-hover:text-brand group-hover:translate-x-0.5 transition-all mt-2" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            variants={fadeUpContainer}
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="lg:col-span-5"
          >
            <h3 className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-brand-light/60 mb-3">
              Output categories
            </h3>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {RESEARCH_CATEGORIES.map((c, i) => (
                <motion.div
                  key={c}
                  variants={fadeUpItem}
                  className="relative rounded-xl bg-ink-deep/50 p-4 ring-1 ring-inset ring-brand/15 hover:ring-brand/45 transition-all overflow-hidden"
                >
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-brand/10 blur-xl" />
                  <span className="relative font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="relative mt-1.5 font-display text-sm font-semibold text-white leading-snug">{c}</p>
                </motion.div>
              ))}
            </div>

            {/* Status banner */}
            <motion.div
              variants={fadeUpItem}
              className="mt-4 rounded-xl bg-brand/10 p-5 ring-1 ring-inset ring-brand/30"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                  <Icon name="research" width={16} height={16} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-white">Currently in preparation</p>
                  <p className="mt-1 text-xs text-brand-light/75 leading-relaxed">
                    Manuscripts and technical reports on modal identification, nonlinear dynamic
                    analysis and seismic risk of building portfolios.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
