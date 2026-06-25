"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";

const TEACHING_ITEMS = [
  { icon: "book", title: "Courses taught", body: "Structural analysis, earthquake engineering, computational tools workshops and LaTeX seminars for undergraduate and graduate students." },
  { icon: "layers", title: "Topics covered", body: "Matrix structural analysis, FEM, nonlinear analysis, structural dynamics, seismic design of RC and steel, performance-based engineering and seismic risk." },
  { icon: "code", title: "Educational material developed", body: "Lecture notes, commented code, worked examples, calculation templates, software manuals and short explanatory videos." },
  { icon: "pdf", title: "Class notes & solved problems", body: "Step-by-step notes and fully solved problems covering the core topics of each course." },
  { icon: "users", title: "Teaching philosophy", body: "Make advanced structural engineering accessible through rigorous explanations, transparent computational tools and professionally documented material." },
  { icon: "target", title: "Educational impact", body: "Open resources that students can read, run and adapt — supporting self-paced technical learning beyond the classroom." },
];

export function TeachingSection() {
  const reduce = useReducedMotion();
  return (
    <Section id="teaching" tone="light">
      <SectionHeader
        eyebrow="Teaching Portfolio"
        title={
          <>
            Teaching that makes advanced engineering{" "}
            <span className="text-brand">accessible and rigorous</span>
          </>
        }
        description="My teaching work focuses on making advanced structural engineering concepts accessible through rigorous explanations, step-by-step examples, computational tools, and professionally documented technical material."
      />

      <motion.div
        variants={fadeUpContainer}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TEACHING_ITEMS.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUpItem}
            className="group rounded-2xl bg-white p-6 ring-1 ring-inset ring-ink/10 hover:ring-brand/40 hover:shadow-[0_18px_40px_-20px_rgba(0,187,212,0.35)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-inset ring-brand/25">
              <PortfolioIcon name={item.icon} width={20} height={20} />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-ink leading-snug">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">{item.body}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Sample class notes preview */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
        className="mt-10 grid gap-4 lg:grid-cols-3"
      >
        {[
          { tag: "Lecture notes", title: "Direct stiffness method — full derivation", meta: "Matrix Structural Analysis · 24 pages" },
          { tag: "Solved problem", title: "Pushover of a 4-story RC frame", meta: "Nonlinear Analysis · 8 pages" },
          { tag: "Workshop", title: "Building your first OpenSees model", meta: "Computational Tools · 90 min" },
        ].map((n) => (
          <a
            key={n.title}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group flex items-start gap-3 rounded-xl bg-brand-gradient p-5 ring-1 ring-inset ring-brand/25 hover:ring-brand/55 transition-all overflow-hidden relative"
          >
            <div className="absolute inset-0 wire-mesh opacity-25" aria-hidden />
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand/20 text-brand-light ring-1 ring-inset ring-brand/30">
              <PortfolioIcon name="pdf" width={18} height={18} />
            </div>
            <div className="relative flex-1">
              <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/60">{n.tag}</p>
              <h4 className="mt-1 font-display text-sm font-semibold text-white leading-snug">{n.title}</h4>
              <p className="mt-1 text-[11px] text-brand-light/60">{n.meta}</p>
            </div>
            <PortfolioIcon name="download" width={14} height={14} className="relative text-brand-light/60 group-hover:text-brand transition-colors" />
          </a>
        ))}
      </motion.div>
    </Section>
  );
}
