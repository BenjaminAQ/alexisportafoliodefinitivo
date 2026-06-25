"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { CV_SECTIONS } from "@/data/content";

export function CvSection() {
  const reduce = useReducedMotion();
  return (
    <Section id="cv" tone="light">
      <SectionHeader
        eyebrow="CV"
        title={
          <>
            Academic curriculum vitae,{" "}
            <span className="text-brand">available online and as PDF</span>
          </>
        }
        description="A complete overview of education, research interests, teaching, projects, computational tools, software skills and references."
      />

      {/* Download buttons */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex flex-wrap gap-3"
      >
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="group inline-flex items-center gap-2.5 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,187,212,0.7)] hover:bg-brand-light hover:text-ink transition-all"
        >
          <PortfolioIcon name="download" width={16} height={16} />
          Academic CV (PDF)
        </a>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink ring-1 ring-inset ring-ink/20 hover:ring-brand hover:text-brand transition-all"
        >
          <PortfolioIcon name="download" width={16} height={16} />
          One-page resume (PDF)
        </a>
      </motion.div>

      {/* CV grid */}
      <motion.div
        variants={fadeUpContainer}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CV_SECTIONS.map((sec, i) => (
          <motion.div
            key={sec.title}
            variants={fadeUpItem}
            className="relative rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-inset ring-ink/10 hover:ring-brand/30 transition-all overflow-hidden"
          >
            <div className="absolute top-3 right-4 font-mono-code text-[10px] text-muted/60">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex items-center gap-2">
              <span className="h-px w-5 bg-brand" />
              <h3 className="font-display text-sm font-semibold text-ink uppercase tracking-wide">
                {sec.title}
              </h3>
            </div>
            <ul className="mt-3 space-y-1.5">
              {sec.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm text-ink/75 leading-snug">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
