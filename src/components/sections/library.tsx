"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { LevelBadge, Pill } from "../portfolio/primitives";
import { LIBRARY_DOCS } from "@/data/content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AREAS = [
  "Matrix Structural Analysis",
  "Finite Element Method",
  "Nonlinear Structural Analysis",
  "Structural Dynamics",
  "Seismic Design of Concrete Structures",
  "Seismic Design of Steel Structures",
  "Performance-Based Earthquake Engineering",
  "Seismic Risk Assessment",
];

const TYPES = [
  "Lecture notes",
  "Technical reports",
  "Calculation reports",
  "Design examples",
  "Software manuals",
  "Literature summaries",
  "Code documentation",
  "Research notes",
];

const SOFTWARES = ["—", "MATLAB", "Python", "OpenSees", "ETABS", "CRISIS"];
const LANGUAGES = ["English", "Spanish"];
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Research-oriented"];

export function LibrarySection() {
  const reduce = useReducedMotion();
  const [area, setArea] = React.useState("All");
  const [level, setLevel] = React.useState("All");
  const [type, setType] = React.useState("All");
  const [software, setSoftware] = React.useState("All");
  const [language, setLanguage] = React.useState("All");
  const [sortDate, setSortDate] = React.useState<"new" | "old">("new");

  const filtered = LIBRARY_DOCS.filter((d) => {
    return (
      (area === "All" || d.area === area) &&
      (level === "All" || d.level === level) &&
      (type === "All" || d.type === type) &&
      (software === "All" || d.software === software) &&
      (language === "All" || d.language === language)
    );
  }).sort((a, b) =>
    sortDate === "new" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
  );

  return (
    <Section id="library" tone="light">
      <SectionHeader
        eyebrow="Technical Library"
        title={
          <>
            An ordered repository of{" "}
            <span className="text-brand">documents, notes and references</span>
          </>
        }
        description="Filter by area, level, type, software, language and date. Every document links to a downloadable file (placeholders until uploaded)."
      />

      {/* Filters */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <FilterSelect label="Area" value={area} onChange={setArea} options={AREAS} />
        <FilterSelect label="Level" value={level} onChange={setLevel} options={LEVELS} />
        <FilterSelect label="Type" value={type} onChange={setType} options={TYPES} />
        <FilterSelect label="Software" value={software} onChange={setSoftware} options={SOFTWARES} />
        <FilterSelect label="Language" value={language} onChange={setLanguage} options={LANGUAGES} />
        <div>
          <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Date</p>
          <div className="flex gap-2">
            <Pill active={sortDate === "new"} onClick={() => setSortDate("new")}>Newest first</Pill>
            <Pill active={sortDate === "old"} onClick={() => setSortDate("old")}>Oldest first</Pill>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted">
          Showing <span className="font-semibold text-ink">{filtered.length}</span> of {LIBRARY_DOCS.length} documents
        </p>
        <button
          onClick={() => {
            setArea("All"); setLevel("All"); setType("All");
            setSoftware("All"); setLanguage("All"); setSortDate("new");
          }}
          className="text-xs font-semibold text-brand hover:text-brand-light transition-colors"
        >
          Reset filters
        </button>
      </div>

      {/* List */}
      <motion.div
        layout
        variants={fadeUpContainer}
        initial={reduce ? false : "hidden"}
        animate="visible"
        className="mt-5 space-y-2.5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((d) => (
            <motion.div
              key={d.id}
              layout
              variants={fadeUpItem}
              className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-xl bg-white p-4 ring-1 ring-inset ring-ink/10 hover:ring-brand/40 hover:shadow-[0_12px_28px_-18px_rgba(0,187,212,0.45)] transition-all"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-inset ring-brand/25">
                <PortfolioIcon name="pdf" width={18} height={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-ink leading-snug">
                  {d.title}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                  <span className="font-mono-code uppercase tracking-wider">{d.type}</span>
                  <span className="text-ink/30">·</span>
                  <span>{d.area}</span>
                  <span className="text-ink/30">·</span>
                  <span>{d.software}</span>
                  <span className="text-ink/30">·</span>
                  <span>{d.language}</span>
                  <span className="text-ink/30">·</span>
                  <time dateTime={d.date}>{d.date}</time>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LevelBadge level={d.level} />
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-brand-light ring-1 ring-inset ring-brand/30 hover:bg-brand hover:text-white transition-all"
                >
                  <PortfolioIcon name="download" width={12} height={12} />
                  PDF
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl bg-white p-10 text-center ring-1 ring-inset ring-ink/10">
          <p className="text-muted">No documents match the current filters.</p>
        </div>
      )}
    </Section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div>
      <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">{label}</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>{o}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
