"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioIcon } from "./icons";
import { FileBadge } from "@/components/admin/file-viewer";
import { cn } from "@/lib/utils";

export interface GenericFile {
  id: string;
  name: string;
  url: string;
  viewMode?: string;
}

export interface GenericFolder {
  id: string;
  name: string;
  files: GenericFile[];
}

export function FolderItem({
  folder,
  isDark = false,
}: {
  folder: GenericFolder;
  isDark?: boolean;
}) {
  const [open, setOpen] = React.useState(true);
  const visibleFiles = (folder.files || []).filter(
    (f) => f.url && f.viewMode && f.viewMode !== "none"
  );

  if (visibleFiles.length === 0) return null;

  return (
    <div
      className={cn(
        "group/folder rounded-2xl overflow-hidden ring-1 transition-all duration-300 shadow-sm hover:shadow-md",
        isDark
          ? "bg-ink-soft/40 ring-brand/30 hover:ring-brand/50 hover:bg-ink-soft/60"
          : "bg-white ring-ink/10 hover:ring-brand/40 hover:bg-surface/60"
      )}
    >
      {/* Folder Header Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 select-none",
          isDark
            ? "hover:bg-brand/10"
            : "bg-gradient-to-r from-brand/5 via-transparent to-brand/5 hover:from-brand/10 hover:to-brand/10"
        )}
      >
        {/* Animated Modern Folder Icon Container */}
        <div
          className={cn(
            "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 shadow-sm transition-transform duration-300 group-hover/folder:scale-105",
            isDark
              ? "bg-brand/20 text-brand-light ring-brand/40"
              : "bg-brand/15 text-brand ring-brand/30"
          )}
        >
          {/* Subtle Glow Behind Icon */}
          <div className="absolute inset-0 rounded-xl bg-brand/20 blur-md opacity-0 group-hover/folder:opacity-100 transition-opacity duration-300" />
          
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10"
          >
            {open ? (
              // Open folder icon
              <>
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z" />
                <path d="M2 10h20" className="stroke-brand opacity-60" />
              </>
            ) : (
              // Closed folder icon
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            )}
          </svg>
        </div>

        {/* Title & Item Counter */}
        <div className="flex-1 min-w-0">
          <span
            className={cn(
              "block font-display text-base font-bold truncate transition-colors",
              isDark ? "text-white group-hover/folder:text-brand-light" : "text-ink group-hover/folder:text-brand"
            )}
          >
            {folder.name || "Folder"}
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono-code text-[11px] font-semibold",
                isDark
                  ? "bg-brand/20 text-brand-light"
                  : "bg-brand/10 text-brand"
              )}
            >
              <PortfolioIcon name="layers" width={11} height={11} />
              {visibleFiles.length} {visibleFiles.length === 1 ? "file" : "files"}
            </span>
          </div>
        </div>

        {/* Animated Chevron Indicator */}
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
            isDark
              ? "bg-brand/15 text-brand-light group-hover/folder:bg-brand/30"
              : "bg-brand/10 text-brand group-hover/folder:bg-brand/20"
          )}
        >
          <PortfolioIcon
            name="chevron"
            width={18}
            height={18}
            className="transition-transform duration-300"
            style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
          />
        </div>
      </button>

      {/* Collapsible Folder Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "relative px-5 pb-4 pt-2 space-y-2 border-t",
                isDark
                  ? "border-brand/20 bg-ink-deep/50"
                  : "border-brand/10 bg-surface/50"
              )}
            >
              {/* Tree Connector Line */}
              <div
                className={cn(
                  "absolute left-9 top-0 bottom-4 w-0.5 rounded-full",
                  isDark ? "bg-brand/30" : "bg-brand/20"
                )}
              />

              {visibleFiles.map((f) => (
                <div key={f.id || f.url} className="relative pl-7">
                  {/* Branch Line */}
                  <div
                    className={cn(
                      "absolute left-4 top-1/2 w-3 h-0.5 -translate-y-1/2 rounded-full",
                      isDark ? "bg-brand/30" : "bg-brand/20"
                    )}
                  />
                  <FileBadge
                    name={f.name}
                    url={f.url}
                    viewMode={f.viewMode}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
