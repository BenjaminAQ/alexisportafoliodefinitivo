"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { ABOUT_STATS } from "@/data/content";

const HIGHLIGHTS = [
  "Formación como ingeniero civil",
  "Experiencia en docencia y formación de estudiantes de ingeniería",
  "Interés en análisis estructural avanzado, dinámica estructural e ingeniería sísmica",
  "Desarrollo de herramientas computacionales, códigos, plantillas y manuales",
  "Interés en investigación aplicada y transferencia de conocimiento técnico",
];

export function AboutSection() {
  const reduce = useReducedMotion();
  return (
    <Section id="about" tone="light">
      <SectionHeader
        eyebrow="About"
        title={
          <>
            Civil engineer building bridges between{" "}
            <span className="text-brand">theory, computation and practice</span>
          </>
        }
        description="A focus on advanced structural engineering, computational tools and engineering education."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
        {/* Portrait placeholder */}
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

        {/* Bio */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-ink/85">
            <p>
              I am a civil engineer focused on structural engineering, earthquake engineering, and
              computational tools for engineering education and practice. My work integrates matrix
              structural analysis, finite element modeling, nonlinear structural analysis,
              structural dynamics, seismic design of reinforced concrete and steel structures,
              performance-based earthquake engineering, and seismic risk assessment.
            </p>
            <p>
              Over the last years, I have developed academic material, computational scripts,
              technical templates, software tools, manuals, and applied examples aimed at improving
              the understanding and application of advanced structural engineering concepts.
            </p>
          </div>

          {/* Highlights */}
          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {HIGHLIGHTS.map((h, i) => (
              <motion.li
                key={h}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                className="flex items-start gap-2.5 rounded-lg bg-white/70 p-3 ring-1 ring-inset ring-ink/10"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <PortfolioIcon name="check" width={12} height={12} />
                </span>
                <span className="text-sm text-ink/80 leading-snug">{h}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.dl
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {ABOUT_STATS.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white ring-1 ring-inset ring-brand/30"
          >
            <div className="absolute inset-0 wire-mesh opacity-30" />
            <dt className="relative font-display text-4xl sm:text-5xl font-bold text-brand-light">
              {s.value}
            </dt>
            <dd className="relative mt-2 text-sm text-brand-light/75 leading-snug">{s.label}</dd>
          </div>
        ))}
      </motion.dl>
    </Section>
  );
}
