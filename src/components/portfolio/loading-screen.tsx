"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionData } from "@/components/admin/use-section-data";
import type { LoadingData } from "@/lib/content-types";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const { data } = useSectionData<LoadingData>("loading");
  const subtitle = data?.subtitle || "Structural Engineering";

  React.useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 400);
          }, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-gradient overflow-hidden"
        >
          {/* Wire mesh background */}
          <div className="absolute inset-0 wire-mesh opacity-30" />

          {/* Animated glow orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-brand/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated rotating ring */}
          <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
              <circle cx="120" cy="120" r="100" stroke="rgba(0,180,216,0.15)" strokeWidth="1" />
              <circle
                cx="120" cy="120" r="100"
                stroke="rgba(0,180,216,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="60 560"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Counter-rotating ring */}
          <motion.div
            className="absolute"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="70" stroke="rgba(93,214,230,0.1)" strokeWidth="1" />
              <circle
                cx="90" cy="90" r="70"
                stroke="rgba(93,214,230,0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="40 400"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Logo + text */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo with pulse glow */}
            <div className="relative mb-6">
              <motion.div
                className="absolute -inset-3 rounded-2xl bg-brand/30 blur-2xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_0_40px_-5px_rgba(0,180,216,0.8)]">
                <span className="font-display text-3xl font-bold">A</span>
              </div>
            </div>

            {/* Name */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-2xl font-bold text-white mb-1"
            >
              Alexis<span className="text-brand">.</span>
            </motion.h1>

            {/* Subtitle (editable from admin) */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-mono-code text-xs uppercase tracking-[0.2em] text-brand-light/60 mb-8"
            >
              {subtitle}
            </motion.p>

            {/* Progress bar */}
            <div className="w-56 max-w-[75vw]">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-light to-brand"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="font-mono-code text-[10px] text-brand-light/50">
                  Loading...
                </span>
                <span className="font-mono-code text-[10px] text-brand-light/50">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
