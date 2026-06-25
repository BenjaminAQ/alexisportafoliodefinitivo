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
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <motion.div variants={itemVariants} className={cn(align === "center" && "flex justify-center")}>
        <Eyebrow dark={tone === "dark"}>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className={cn(
          "mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-balance",
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
            tone === "dark" ? "text-brand-light/75" : "text-muted"
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
        "relative scroll-mt-20 py-16 sm:py-20 lg:py-24",
        tone === "dark"
          ? "bg-ink text-white"
          : "bg-surface text-ink",
        className
      )}
    >
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export const fadeUpItem = itemVariants;
export const fadeUpContainer = containerVariants;
