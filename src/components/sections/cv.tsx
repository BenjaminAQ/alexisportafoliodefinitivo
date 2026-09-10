"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import { FilePreviewModal } from "@/components/admin/file-viewer";
import { renderRichText } from "@/lib/richtext";
import type { CvData } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export function CvSection({ tone = "light" }: { tone?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<CvData>("cv");
  const [preview, setPreview] = React.useState<{ url: string; name: string } | null>(null);
  const isDark = tone === "dark";

  return (
    <Section id="cv" tone={tone}>
      {loading || !data ? (
        <SectionSkeleton tone={tone} />
      ) : (
        <>
          <DynamicSectionHeader header={data.header} tone={tone} />

          {/* Layout: 2 columnas en PC (izquierda: contenido, derecha: timeline) */}
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            {/* Columna izquierda: descargas + secciones */}
            <div className="lg:col-span-7" style={{ minWidth: 0 }}>
              {/* Download buttons — más estéticos */}
              {data.downloads && data.downloads.length > 0 && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  {data.downloads.map((dl) => {
                    const mode = dl.viewMode || "download";
                    if (mode === "none" || !dl.file) return null;
                    return (
                      <div key={dl.id} className="flex items-center gap-2">
                        {mode === "view" && (
                          <button
                            onClick={() => setPreview({ url: dl.file!, name: dl.label || "Document", downloadable: false })}
                            className={cn(
                              "inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all",
                              isDark
                                ? "bg-white/10 text-white ring-1 ring-inset ring-brand/30 hover:bg-white/20"
                                : "bg-white text-ink ring-1 ring-inset ring-ink/20 hover:ring-brand hover:text-brand"
                            )}
                          >
                            <PortfolioIcon name="play" width={16} height={16} />
                            {dl.label || "View"}
                          </button>
                        )}
                        {mode === "download" && (
                          <>
                            <button
                              onClick={() => setPreview({ url: dl.file!, name: dl.label || "Document", downloadable: true })}
                              className={cn(
                                "inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all",
                                isDark
                                  ? "bg-white/10 text-white ring-1 ring-inset ring-brand/30 hover:bg-white/20"
                                  : "bg-white text-ink ring-1 ring-inset ring-ink/20 hover:ring-brand hover:text-brand"
                              )}
                            >
                              <PortfolioIcon name="play" width={16} height={16} />
                              View
                            </button>
                            <a
                              href={dl.file}
                              download={dl.label || "document"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-2.5 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_-8px_rgba(0,180,216,0.6)] hover:bg-brand-light hover:text-ink transition-all"
                            >
                              <PortfolioIcon name="download" width={16} height={16} />
                              {dl.label || "Download"}
                            </a>
                          </>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* Secciones del CV */}
              {data.sections.length > 0 ? (
                <motion.div
                  initial={reduce ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {data.sections.map((sec, i) => (
                    <motion.div
                      key={sec.id}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                      }}
                      className={cn(
                        "relative rounded-2xl p-5 sm:p-6 ring-1 ring-inset hover:ring-brand/30 transition-all overflow-hidden",
                        isDark ? "bg-ink-soft/60 ring-brand/20" : "bg-white ring-ink/10"
                      )}
                    >
                      <div className="absolute top-3 right-4 font-mono-code text-[10px] opacity-40">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-px w-5 bg-brand" />
                        <h3 className={cn(
                          "font-display text-sm font-semibold uppercase tracking-wide",
                          isDark ? "text-white" : "text-ink"
                        )}>{sec.title}</h3>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {sec.items.map((it, j) => (
                          <li key={j} className={cn(
                            "flex items-start gap-2 text-sm leading-snug",
                            isDark ? "text-brand-light/80" : "text-ink/75"
                          )}>
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
            </div>

            {/* Columna derecha: Timeline */}
            {data.timeline && data.timeline.length > 0 && (
              <div className="lg:col-span-5">
                <motion.div
                  initial={reduce ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                  className="lg:sticky lg:top-24"
                >
                  <h3 className={cn(
                    "font-display text-xl font-bold mb-8 flex items-center gap-3",
                    isDark ? "text-white" : "text-ink"
                  )}>
                    <span className="h-1 w-6 rounded-full bg-brand" />
                    {data.timelineTitle || "Timeline"}
                  </h3>
                  <div className="relative pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-brand/50 to-transparent" />

                    {data.timeline.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                        }}
                        className="relative mb-8 last:mb-0"
                      >
                        {/* Node */}
                        <div className="absolute -left-8 top-1 flex items-center justify-center">
                          <div className="h-4 w-4 rounded-full bg-brand shadow-[0_0_12px_rgba(0,180,216,0.6)] ring-4 ring-brand/10" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-1">
                          {item.date && (
                            <span className="font-mono-code text-[11px] uppercase tracking-[0.15em] text-brand">
                              {item.date}
                            </span>
                          )}
                          <h4 className={cn(
                            "font-display text-base font-bold",
                            isDark ? "text-white" : "text-ink"
                          )} style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                            {renderRichText(item.title)}
                          </h4>
                          {item.description && (
                            <p className={cn(
                              "text-sm leading-relaxed",
                              isDark ? "text-brand-light/70" : "text-muted"
                            )} style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                              {renderRichText(item.description)}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </>
      )}
      <FilePreviewModal preview={preview} onClose={() => setPreview(null)} />
    </Section>
  );
}
