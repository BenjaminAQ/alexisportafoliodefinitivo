"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./primitives";

type Tone = "light" | "dark";

export function useInViewT<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px", ...options }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: Tone;
  align?: "left" | "center";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={containerVariants}
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}
    >
      <motion.div variants={itemVariants} className={cn(align === "center" && "flex justify-center")}>
        <Eyebrow dark={tone === "dark"}>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className={cn(
          "mt-5 font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-balance leading-[1.1]",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={itemVariants}
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed text-pretty",
            tone === "dark" ? "text-brand-light/70" : "text-muted"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

export function Section({
  id,
  tone = "light",
  children,
  className,
  containerClassName,
}: {
  id: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 py-20 sm:py-24 lg:py-28 overflow-hidden",
        tone === "dark"
          ? "bg-brand-gradient text-white"
          : "bg-section-light text-ink",
        className
      )}
    >
      {/* Decorative background layer */}
      {tone === "dark" ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <div className="absolute inset-0 wire-mesh opacity-40" />
          <div className="absolute inset-0 scan-lines opacity-30" />
          {/* Ambient glow orbs */}
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand/10 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple/10 blur-[64px]" />
        </div>
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-purple/4 blur-3xl" />
        </div>
      )}

      {/* Top divider line */}
      <div className={cn("absolute top-0 inset-x-0", tone === "dark" ? "section-divider-dark" : "section-divider-light")} />

      <div className={cn("relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export const fadeUpItem = itemVariants;
export const fadeUpContainer = containerVariants;
