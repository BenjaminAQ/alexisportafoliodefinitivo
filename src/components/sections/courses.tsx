"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { LevelBadge, Pill } from "../portfolio/primitives";
import { COURSES, type Course } from "@/data/content";
import { Progress } from "@/components/ui/progress";

function CourseCard({ course, index, progress }: { course: Course; index: number; progress: number }) {
  return (
    <motion.article
      variants={fadeUpItem}
      className="group relative flex flex-col rounded-2xl bg-brand-gradient p-5 sm:p-6 ring-1 ring-inset ring-brand/25 hover:ring-brand/55 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 wire-mesh opacity-25" aria-hidden />
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />

      <div className="relative flex items-center justify-between">
        <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-brand-light/60">
          Course {String(index + 1).padStart(2, "0")}
        </span>
        <LevelBadge level={course.level} />
      </div>

      <h3 className="relative mt-3 font-display text-lg sm:text-xl font-bold text-white leading-snug">
        {course.title}
      </h3>
      <p className="relative mt-2 text-sm text-brand-light/75 leading-relaxed flex-1">
        {course.description}
      </p>

      {/* Meta */}
      <div className="relative mt-4 flex items-center gap-4 text-[11px] text-brand-light/70">
        <span className="inline-flex items-center gap-1">
          <PortfolioIcon name="book" width={12} height={12} className="text-brand" />
          {course.lessons.length} lessons
        </span>
        <span className="inline-flex items-center gap-1">
          <PortfolioIcon name="clock" width={12} height={12} className="text-brand" />
          {course.duration}
        </span>
      </div>

      {/* Objectives */}
      <div className="relative mt-4 border-t border-brand/15 pt-3">
        <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/55">
          Learning objectives
        </p>
        <ul className="mt-2 space-y-1">
          {course.objectives.map((o) => (
            <li key={o} className="flex items-start gap-1.5 text-[12px] text-brand-light/80">
              <PortfolioIcon name="check" width={11} height={11} className="mt-0.5 text-brand shrink-0" />
              {o}
            </li>
          ))}
        </ul>
      </div>

      {/* Progress bar */}
      <div className="relative mt-4">
        <div className="flex items-center justify-between text-[11px] text-brand-light/70 mb-1.5">
          <span className="font-mono-code uppercase tracking-wider">Progress</span>
          <span className="font-semibold text-brand-light">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-ink-deep/60 [&>div]:bg-brand" />
      </div>

      {/* Lessons list (toggle) */}
      <details className="relative mt-4 group/details">
        <summary className="cursor-pointer list-none">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-light hover:text-brand transition-colors">
            <PortfolioIcon name="layers" width={12} height={12} />
            View {course.lessons.length} lessons
            <PortfolioIcon name="chevron" width={12} height={12} className="transition-transform group-open/details:rotate-180" />
          </span>
        </summary>
        <ol className="mt-3 space-y-1.5">
          {course.lessons.map((l, i) => (
            <li key={l} className="flex items-start gap-2 text-[12px] text-brand-light/75">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[9px] font-mono-code text-brand-light">
                {i + 1}
              </span>
              {l}
            </li>
          ))}
        </ol>
      </details>

      <button
        onClick={(e) => e.preventDefault()}
        className="relative mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
      >
        <PortfolioIcon name="play" width={13} height={13} />
        Start course
      </button>
    </motion.article>
  );
}

export function CoursesSection() {
  const reduce = useReducedMotion();
  const [level, setLevel] = React.useState("All");
  const levels = ["All", "Beginner", "Intermediate", "Advanced", "Research-oriented"];
  const filtered = level === "All" ? COURSES : COURSES.filter((c) => c.level === level);

  // Decorative progress values per course
  const progressMap = React.useMemo(() => {
    return COURSES.reduce<Record<string, number>>((acc, c, i) => {
      acc[c.id] = [0, 20, 35, 50, 75, 100][i % 6];
      return acc;
    }, {});
  }, []);

  return (
    <Section id="courses" tone="dark" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 wire-mesh opacity-20" />
      <div aria-hidden className="pointer-events-none absolute left-1/3 -top-20 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="Courses and Mini-Courses"
          title={
            <>
              Twelve small, sequential{" "}
              <span className="text-brand-gradient">learning paths</span>
            </>
          }
          description="Each mini-course has clear objectives, ordered lessons, downloadable material and a small final project — designed for self-paced technical study."
        />

        {/* Level filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {levels.map((l) => (
            <Pill key={l} active={level === l} onClick={() => setLevel(l)}>
              {l}
            </Pill>
          ))}
        </div>

        <motion.div
          key={level}
          variants={fadeUpContainer}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} progress={progressMap[c.id] ?? 0} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
