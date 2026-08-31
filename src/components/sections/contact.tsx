"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../portfolio/section";
import { PortfolioIcon } from "../portfolio/icons";
import { useSectionData } from "@/components/admin/use-section-data";
import { EmptyState } from "@/components/admin/empty-state";
import { DynamicSectionHeader, SectionSkeleton } from "@/components/admin/dynamic-header";
import type { ContactData } from "@/lib/content-types";
import { toast } from "sonner";

export function ContactSection({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  const { data, loading } = useSectionData<ContactData>("contact");
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [sending, setSending] = React.useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.subject.trim()) e.subject = "Please enter a subject.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please write a message of at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    const targetEmail = data?.contactEmail || "";
    try {
      if (targetEmail) {
        // Build a mailto link with the form data
        const subject = encodeURIComponent(form.subject || "Contact from portfolio");
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        toast.success("Tu cliente de correo se abrirá con el mensaje listo para enviar.");
      } else {
        toast.success("Message sent. Thank you for reaching out — I'll reply soon.");
      }
    } catch {
      toast.error("Failed to send. Please try again.");
    }
    setSending(false);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const field = (name: keyof typeof form) => ({
    value: form[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [name]: e.target.value })),
    "aria-invalid": !!errors[name],
  });

  return (
    <Section id="contact" tone={tone} className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 wire-mesh opacity-20" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 -bottom-20 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative">
        {loading || !data ? (
          <SectionSkeleton tone={tone} />
        ) : (
          <>
            <DynamicSectionHeader header={data.header} tone={tone} />

            {data.links.length > 0 ? (
              <div className="mt-12 grid gap-8 lg:grid-cols-12">
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-5"
                >
                  <h3 className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-brand-light/60 mb-4">
                    Direct channels
                  </h3>
                  <ul className="space-y-2.5">
                    {data.links.map((c) => (
                      <li key={c.id}>
                        <a
                          href={c.href}
                          onClick={(e) => { if (c.href === "#") e.preventDefault(); }}
                          className="group flex items-center gap-3 rounded-xl bg-ink-deep/50 p-4 ring-1 ring-inset ring-brand/20 hover:ring-brand/55 hover:bg-ink-deep/70 transition-all"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                            <PortfolioIcon name={c.icon || "mail"} width={18} height={18} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/55">{c.label}</p>
                            <p className="text-sm font-medium text-white truncate">{c.value}</p>
                          </div>
                          {c.href !== "#" && (
                            <PortfolioIcon name="arrow" width={14} height={14} className="text-brand-light/40 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.form
                  onSubmit={onSubmit}
                  noValidate
                  initial={reduce ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="lg:col-span-7 rounded-2xl bg-ink-deep/60 p-6 sm:p-8 ring-1 ring-inset ring-brand/25"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Your name" htmlFor="name" error={errors.name}>
                      <input id="name" type="text" {...field("name")} placeholder="Jane Engineer"
                        className="w-full rounded-md bg-ink px-3 py-2.5 text-sm text-white ring-1 ring-inset ring-brand/30 placeholder:text-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand" />
                    </FormField>
                    <FormField label="Your email" htmlFor="email" error={errors.email}>
                      <input id="email" type="email" {...field("email")} placeholder="jane@example.com"
                        className="w-full rounded-md bg-ink px-3 py-2.5 text-sm text-white ring-1 ring-inset ring-brand/30 placeholder:text-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand" />
                    </FormField>
                  </div>
                  <div className="mt-4">
                    <FormField label="Subject" htmlFor="subject" error={errors.subject}>
                      <input id="subject" type="text" {...field("subject")} placeholder="Collaboration on nonlinear analysis"
                        className="w-full rounded-md bg-ink px-3 py-2.5 text-sm text-white ring-1 ring-inset ring-brand/30 placeholder:text-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand" />
                    </FormField>
                  </div>
                  <div className="mt-4">
                    <FormField label="Message" htmlFor="message" error={errors.message}>
                      <textarea id="message" rows={5} {...field("message")} placeholder="Write your message..."
                        className="w-full resize-none rounded-md bg-ink px-3 py-2.5 text-sm text-white ring-1 ring-inset ring-brand/30 placeholder:text-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand" />
                    </FormField>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-[11px] text-brand-light/60">
                      By submitting, you agree to be contacted at the email you provide.
                    </p>
                    <button type="submit" disabled={sending}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-light hover:text-ink transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                      {sending ? (
                        <><span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />Sending...</>
                      ) : (
                        <><PortfolioIcon name="send" width={14} height={14} />Send message</>
                      )}
                    </button>
                  </div>
                </motion.form>
              </div>
            ) : (
              <EmptyState sectionId="contact" />
            )}
          </>
        )}
      </div>
    </Section>
  );
}

function FormField({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[11px] font-mono-code uppercase tracking-[0.15em] text-brand-light/60 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
          <PortfolioIcon name="close" width={11} height={11} />
          {error}
        </p>
      )}
    </div>
  );
}
