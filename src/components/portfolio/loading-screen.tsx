"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const duration = 3000; // 3 segundos
    const interval = 30; // update every 30ms
    const increment = (100 / (duration / interval));

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-gradient"
        >
          {/* Wire mesh background */}
          <div className="absolute inset-0 wire-mesh opacity-30" />
          <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl" />

          {/* Logo animado */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="relative mb-8">
              <div className="absolute -inset-4 rounded-full bg-brand/30 blur-2xl animate-pulse-dot" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_0_60px_-10px_rgba(0,180,216,0.8)]">
                <span className="font-display text-4xl font-bold">A</span>
              </div>
            </div>

            {/* Nombre */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-2xl font-bold text-white mb-1"
            >
              Alexis<span className="text-brand">.</span>
            </motion.h1>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-mono-code text-xs uppercase tracking-[0.2em] text-brand-light/60 mb-10"
            >
              Structural Engineering
            </motion.p>

            {/* Barra de progreso */}
            <div className="w-64 max-w-[80vw]">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-light to-brand"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono-code text-[10px] text-brand-light/50">
                  Cargando...
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
