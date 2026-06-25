"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader, fadeUpContainer, fadeUpItem } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { FORUM_CATEGORIES, FORUM_THREADS } from "@/data/content";
import { cn } from "@/lib/utils";

export function ForumSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<string>("All");
  const [composerOpen, setComposerOpen] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [category, setCategory] = React.useState<string>(FORUM_CATEGORIES[0]);
  const [threads, setThreads] = React.useState(FORUM_THREADS);

  const filtered = active === "All" ? threads : threads.filter((t) => t.category === active);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setThreads((prev) => [
      {
        id: `t-${Date.now()}`,
        category,
        title: question.trim(),
        author: "you",
        replies: 0,
        votes: 0,
        last: "just now",
      },
      ...prev,
    ]);
    setQuestion("");
    setComposerOpen(false);
    setActive(category);
  };

  return (
    <Section id="forum" tone="dark" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 wire-mesh opacity-20" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-0 h-72 w-72 rounded-full bg-brand/12 blur-3xl" />

      <div className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="Forum"
          title={
            <>
              A space for{" "}
              <span className="text-brand-gradient">technical questions and discussion</span>
            </>
          }
          description="Ask questions about any of the open academic resources. Vote useful answers, browse by category, and help others learn."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Categories sidebar */}
          <motion.aside
            variants={fadeUpContainer}
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="lg:col-span-4 xl:col-span-3"
          >
            <div className="rounded-2xl bg-ink-deep/50 p-4 ring-1 ring-inset ring-brand/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-brand-light/60">
                  Categories
                </h3>
                <span className="text-[11px] text-brand-light/60">{FORUM_CATEGORIES.length}</span>
              </div>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActive("All")}
                    className={cn(
                      "w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                      active === "All" ? "bg-brand text-white" : "text-brand-light/80 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span>All categories</span>
                    <span className="text-[11px] opacity-70">{threads.length}</span>
                  </button>
                </li>
                {FORUM_CATEGORIES.map((c) => {
                  const count = threads.filter((t) => t.category === c).length;
                  return (
                    <li key={c}>
                      <button
                        onClick={() => setActive(c)}
                        className={cn(
                          "w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm text-left transition-colors",
                          active === c ? "bg-brand text-white" : "text-brand-light/80 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span className="truncate">{c}</span>
                        <span className="text-[11px] opacity-70 ml-2 shrink-0">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              onClick={() => setComposerOpen((v) => !v)}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
            >
              <PortfolioIcon name="comment" width={14} height={14} />
              {composerOpen ? "Cancel" : "Ask a question"}
            </button>
          </motion.aside>

          {/* Threads list */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Composer */}
            {composerOpen && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={submit}
                className="mb-4 rounded-2xl bg-ink-deep/60 p-4 ring-1 ring-inset ring-brand/30"
              >
                <label className="block text-[11px] font-mono-code uppercase tracking-[0.15em] text-brand-light/60 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mb-3 rounded-md bg-ink px-3 py-2 text-sm text-white ring-1 ring-inset ring-brand/30 focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {FORUM_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <label className="block text-[11px] font-mono-code uppercase tracking-[0.15em] text-brand-light/60 mb-1.5">
                  Question
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  placeholder="Describe your technical question..."
                  className="w-full rounded-md bg-ink px-3 py-2 text-sm text-white ring-1 ring-inset ring-brand/30 placeholder:text-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
                  >
                    <PortfolioIcon name="send" width={13} height={13} />
                    Post question
                  </button>
                </div>
              </motion.form>
            )}

            <motion.div
              variants={fadeUpContainer}
              initial={reduce ? false : "hidden"}
              animate="visible"
              className="space-y-2.5"
            >
              {filtered.map((t) => (
                <motion.article
                  key={t.id}
                  layout
                  variants={fadeUpItem}
                  className="group flex items-start gap-4 rounded-xl bg-ink-deep/40 p-4 ring-1 ring-inset ring-brand/15 hover:ring-brand/40 hover:bg-ink-deep/60 transition-all cursor-pointer"
                >
                  {/* Vote column */}
                  <div className="flex flex-col items-center gap-0.5 shrink-0 w-12">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setThreads((prev) => prev.map((x) => x.id === t.id ? { ...x, votes: x.votes + 1 } : x));
                      }}
                      className="text-brand-light/60 hover:text-brand transition-colors"
                      aria-label="Upvote"
                    >
                      <PortfolioIcon name="arrow" width={14} height={14} className="rotate-[-90deg]" />
                    </button>
                    <span className="font-display text-sm font-bold text-white">{t.votes}</span>
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm sm:text-base font-semibold text-white leading-snug group-hover:text-brand-light transition-colors">
                      {t.title}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-brand-light/60">
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-brand-light ring-1 ring-inset ring-brand/20">
                        <PortfolioIcon name="tag" width={10} height={10} />
                        {t.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <PortfolioIcon name="users" width={11} height={11} />
                        @{t.author}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <PortfolioIcon name="comment" width={11} height={11} />
                        {t.replies} replies
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <PortfolioIcon name="clock" width={11} height={11} />
                        {t.last}
                      </span>
                    </div>
                  </div>
                  <PortfolioIcon name="arrow" width={14} height={14} className="text-brand-light/40 group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
                </motion.article>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div className="rounded-2xl bg-ink-deep/40 p-10 text-center ring-1 ring-inset ring-brand/15">
                <p className="text-brand-light/70">No threads in this category yet. Be the first to ask.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
