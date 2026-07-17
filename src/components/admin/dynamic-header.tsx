"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SectionHeader as SectionHeaderType } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export function DynamicSectionHeader({
  header,
  tone = "light",
  align = "left",
}: {
  header: SectionHeaderType;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.5 }}
        className={cn(align === "center" && "flex justify-center")}
      >
        <div className="flex items-center gap-2.5">
          <span className="h-px w-8 bg-brand" />
          <span
            className={cn(
              "font-mono-code text-xs font-semibold uppercase tracking-[0.2em]",
              tone === "dark" ? "text-brand-light" : "text-brand"
            )}
          >
            {header.eyebrow}
          </span>
        </div>
      </motion.div>
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={cn(
          "mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-balance",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {header.title}
      </motion.h2>
      {header.description && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed text-pretty",
            tone === "dark" ? "text-brand-light/75" : "text-muted"
          )}
        >
          {header.description}
        </motion.p>
      )}
    </div>
  );
}

export function SectionSkeleton({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className="animate-pulse">
      <div className={cn("h-4 w-32 rounded", tone === "dark" ? "bg-white/10" : "bg-ink/10")} />
      <div className={cn("mt-4 h-10 w-3/4 rounded", tone === "dark" ? "bg-white/10" : "bg-ink/10")} />
      <div className={cn("mt-4 h-6 w-full rounded", tone === "dark" ? "bg-white/5" : "bg-ink/5")} />
      <div className={cn("mt-8 h-48 rounded-2xl", tone === "dark" ? "bg-white/5" : "bg-ink/5")} />
    </div>
  );
}
