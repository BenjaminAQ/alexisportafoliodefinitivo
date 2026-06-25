"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { AREAS, type Area } from "@/data/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

function AreaCard({ area, index }: { area: Area; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={fadeUpItem}
      className="group relative rounded-2xl bg-brand-gradient p-6 sm:p-7 ring-1 ring-inset ring-brand/25 overflow-hidden hover:ring-brand/60 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="absolute inset-0 wire-mesh opacity-25" aria-hidden />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
            <PortfolioIcon name={area.icon} width={22} height={22} />
          </div>
          <span className="font-mono-code text-xs font-semibold text-brand-light/60 tracking-wider">
            AREA {area.number}
          </span>
        </div>
      </div>

      <h3 className="relative mt-5 font-display text-xl sm:text-2xl font-bold text-white leading-snug">
        {area.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-brand-light/75 line-clamp-3">
        {area.description}
      </p>

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
              {area.topics.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-brand-light/80">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="materials" className="border-brand/15">
          <AccordionTrigger className="py-2 text-sm font-semibold text-brand-light hover:no-underline hover:text-brand">
            <span className="flex items-center gap-2">
              <PortfolioIcon name="book" width={14} height={14} />
              Available material
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-1">
            <p className="pt-2 text-sm text-brand-light/75 leading-relaxed">{area.materials}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}

export function ExpertiseSection() {
  return (
    <Section id="expertise" tone="dark" className="overflow-hidden">
      {/* Decorative mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0 wire-mesh opacity-25" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="Areas of Expertise"
          title={
            <>
              Seven domains covering the full spectrum of{" "}
              <span className="text-brand-gradient">modern structural engineering</span>
            </>
          }
          description="From matrix formulation and finite elements to nonlinear dynamics, performance-based design and seismic risk — each area links theory, computation and engineering practice."
        />

        <motion.div
          variants={fadeUpContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {AREAS.map((area, i) => (
            <AreaCard key={area.id} area={area} index={i} />
          ))}

          {/* CTA card filling the 8th slot */}
          <motion.div
            variants={fadeUpItem}
            className={cn(
              "relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 ring-1 ring-inset ring-brand/30 overflow-hidden",
              "bg-transparent bg-[linear-gradient(135deg,rgba(0,187,212,0.08),rgba(93,214,230,0.04))]"
            )}
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                <PortfolioIcon name="arrow" width={22} height={22} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white leading-snug">
                Explore the projects behind these areas
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-light/70">
                Each domain is backed by documented computational tools, examples and open academic
                resources you can read, run and adapt.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
              >
                View projects <PortfolioIcon name="arrow" width={14} height={14} />
              </button>
              <button
                onClick={() => document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-brand-light ring-1 ring-inset ring-brand/30 hover:bg-white/10 transition-all"
              >
                Open resources
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
