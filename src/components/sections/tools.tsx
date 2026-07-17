"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { LevelBadge, Pill } from "../portfolio/primitives";
import { TOOLS, TOOL_CATEGORIES } from "@/data/content";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function typeIcon(type: string) {
  switch (type) {
    case "video":
      return "video";
    case "PDF":
      return "pdf";
    case "code":
      return "code";
    case "template":
      return "template";
    case "manual":
      return "manual";
    default:
      return "example";
  }
}

export function ToolsSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<string>("All");
  const filters = ["All", ...TOOL_CATEGORIES];
  const filtered = active === "All" ? TOOLS : TOOLS.filter((t) => t.category === active);

  return (
    <Section id="tools" tone="dark" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 wire-mesh opacity-20" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="Computational Tools"
          title={
            <>
              A toolbox of{" "}
              <span className="text-brand-gradient">scripts, models and templates</span>{" "}
              you can read and reuse
            </>
          }
          description="Organized by technology stack. Each tool ships with a clear purpose, level, files and — when available — a tutorial and a manual."
        />

        {/* Categories grid */}
        <motion.div
          variants={fadeUpContainer}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {TOOL_CATEGORIES.map((c, i) => {
            const count = TOOLS.filter((t) => t.category === c).length;
            return (
              <motion.button
                key={c}
                variants={fadeUpItem}
                onClick={() => {
                  setActive(c);
                  document.getElementById("tools-table")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group relative overflow-hidden rounded-xl bg-ink-deep/50 p-4 text-left ring-1 ring-inset ring-brand/20 hover:ring-brand/60 hover:bg-ink-deep/70 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-semibold text-brand-light">
                    {count}
                  </span>
                </div>
                <p className="mt-2 font-display text-sm font-semibold text-white leading-snug">
                  {c}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Filter pills */}
        <div id="tools-table" className="mt-12 flex flex-wrap gap-2 scroll-mt-24">
          {filters.map((f) => (
            <Pill key={f} active={active === f} onClick={() => setActive(f)}>
              {f}
            </Pill>
          ))}
        </div>

        {/* Modern table */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mt-6 overflow-hidden rounded-2xl ring-1 ring-inset ring-brand/25 bg-ink-deep/40"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-brand/20 hover:bg-transparent">
                <TableHead className="text-brand-light/70 font-mono-code text-[11px] uppercase tracking-[0.15em]">Tool</TableHead>
                <TableHead className="text-brand-light/70 font-mono-code text-[11px] uppercase tracking-[0.15em] hidden md:table-cell">Purpose</TableHead>
                <TableHead className="text-brand-light/70 font-mono-code text-[11px] uppercase tracking-[0.15em] hidden lg:table-cell">Tech</TableHead>
                <TableHead className="text-brand-light/70 font-mono-code text-[11px] uppercase tracking-[0.15em]">Level</TableHead>
                <TableHead className="text-brand-light/70 font-mono-code text-[11px] uppercase tracking-[0.15em] hidden sm:table-cell text-right">Resources</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow
                  key={t.id}
                  className="border-brand/10 hover:bg-brand/5 transition-colors group"
                >
                  <TableCell className="font-display font-semibold text-white">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                        <PortfolioIcon name={typeIcon(t.category.includes("Notebook") ? "code" : "code")} width={14} height={14} />
                      </span>
                      <div>
                        <div className="text-sm">{t.name}</div>
                        <div className="text-[11px] text-brand-light/50 font-normal">{t.area}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-brand-light/75 text-sm hidden md:table-cell max-w-xs">
                    {t.problem}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="inline-flex items-center rounded-md bg-ink px-2 py-0.5 font-mono-code text-[11px] text-brand-light ring-1 ring-inset ring-brand/30">
                      {t.tech}
                    </span>
                  </TableCell>
                  <TableCell>
                    <LevelBadge level={t.level} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right">
                    <div className="inline-flex items-center gap-2">
                      {t.video && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-brand-light/70" title="Video tutorial">
                          <PortfolioIcon name="video" width={13} height={13} className="text-brand" />
                          Video
                        </span>
                      )}
                      {t.manual && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-brand-light/70" title="Manual">
                          <PortfolioIcon name="manual" width={13} height={13} className="text-brand" />
                          Manual
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* File chips grid */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div
              key={`files-${t.id}`}
              className="rounded-xl bg-ink-deep/40 p-4 ring-1 ring-inset ring-brand/15"
            >
              <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/60">
                {t.name}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {t.files.map((f) => (
                  <a
                    key={f}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1.5 rounded-md bg-ink px-2 py-1 font-mono-code text-[11px] text-brand-light ring-1 ring-inset ring-brand/25 hover:bg-brand hover:text-white transition-colors"
                  >
                    <PortfolioIcon name="download" width={11} height={11} />
                    {f}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
