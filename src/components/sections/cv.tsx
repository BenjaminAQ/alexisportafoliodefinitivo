"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import { FilePreviewModal } from "@/components/admin/file-viewer";
import type { CvData } from "@/lib/content-types";

export function CvSection() {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<CvData>("cv");
  const [preview, setPreview] = React.useState<{ url: string; name: string } | null>(null);

  return (
    <Section id="cv" tone="light">
      {loading || !data ? (
        <SectionSkeleton />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} />

          {/* Download buttons (dynamic from admin) */}
          {data.downloads && data.downloads.length > 0 && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {data.downloads.map((dl) => {
                const mode = dl.viewMode || "download";
                if (mode === "none" || !dl.file) return null;
                return (
                  <div key={dl.id} className="flex items-center gap-2">
                    {mode === "view" && (
                      <button
                        onClick={() => setPreview({ url: dl.file!, name: dl.label || "Documento" })}
                        className="inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink ring-1 ring-inset ring-ink/20 hover:ring-brand hover:text-brand transition-all"
                      >
                        <PortfolioIcon name="play" width={16} height={16} />
                        {dl.label || "Ver documento"}
                      </button>
                    )}
                    {mode === "download" && (
                      <>
                        <button
                          onClick={() => setPreview({ url: dl.file!, name: dl.label || "Documento" })}
                          className="inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink ring-1 ring-inset ring-ink/20 hover:ring-brand hover:text-brand transition-all"
                        >
                          <PortfolioIcon name="play" width={16} height={16} />
                          Ver
                        </button>
                        <a
                          href={dl.file}
                          download={dl.label || "documento"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2.5 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,180,216,0.7)] hover:bg-brand-light hover:text-ink transition-all"
                        >
                          <PortfolioIcon name="download" width={16} height={16} />
                          {dl.label || "Descargar"}
                        </a>
                      </>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

          {data.sections.length > 0 ? (
            <motion.div
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.sections.map((sec, i) => (
                <motion.div
                  key={sec.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="relative rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-inset ring-ink/10 hover:ring-brand/30 transition-all overflow-hidden"
                >
                  <div className="absolute top-3 right-4 font-mono-code text-[10px] text-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-px w-5 bg-brand" />
                    <h3 className="font-display text-sm font-semibold text-ink uppercase tracking-wide">{sec.title}</h3>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {sec.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink/75 leading-snug">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState sectionId="cv" />
          )}
        </>
      )}
      <FilePreviewModal preview={preview} onClose={() => setPreview(null)} />
    </Section>
  );
}
