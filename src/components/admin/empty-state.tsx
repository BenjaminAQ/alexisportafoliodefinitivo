"use client";

import { motion } from "framer-motion";
import { PortfolioIcon } from "../portfolio/icons";
import { useAuth } from "./auth-provider";
import Link from "next/link";

export function EmptyState({ sectionId }: { sectionId: string }) {
  const { user } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5 }}
      className="mt-8 rounded-2xl border border-dashed border-brand/30 bg-white/40 dark:bg-white/5 p-10 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-inset ring-brand/25">
        <PortfolioIcon name="layers" width={24} height={24} />
      </div>
      <p className="mt-4 font-display text-base font-semibold text-ink dark:text-white">
        No content yet
      </p>
      <p className="mt-1.5 text-sm text-muted max-w-md mx-auto">
        This section is empty. {user ? "Add content from the editor below or in the admin panel." : "Content will appear here once it is added through the admin panel."}
      </p>
      {user ? (
        <p className="mt-3 text-xs text-brand font-mono-code">
          Editing as {user.email}
        </p>
      ) : (
        <Link
          href="/admin"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
        >
          <PortfolioIcon name="arrow" width={14} height={14} />
          Go to admin panel
        </Link>
      )}
    </motion.div>
  );
}
