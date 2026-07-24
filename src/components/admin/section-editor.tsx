"use client";

import * as React from "react";
import { toast } from "sonner";
import { getSection, setSection } from "@/lib/store";
import type { SectionData, SectionId } from "@/lib/content-types";
import { emptySectionData } from "@/lib/content-types";
import { SECTION_SCHEMAS, SECTION_LABELS } from "./field-schemas";
import { FieldRenderer } from "./field-editor";
import { PortfolioIcon } from "../portfolio/icons";
import { useAuth } from "./auth-provider";

export function SectionEditor({ sectionId }: { sectionId: SectionId }) {
  const schema = SECTION_SCHEMAS[sectionId];
  const { user } = useAuth();
  const uid = user?.uid ?? "anonymous";
  const [data, setData] = React.useState<SectionData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    getSection<SectionData>(sectionId).then((d) => {
      if (active) {
        setData(d);
        setDirty(false);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [sectionId]);

  const update = (key: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value } as SectionData;
    });
    setDirty(true);
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await setSection(sectionId, data);
      setDirty(false);
      toast.success("Sección guardada correctamente.");
    } catch (err) {
      toast.error("Error al guardar: " + (err instanceof Error ? err.message : "error desconocido"));
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!confirm("¿Vaciar esta sección? Esta acción no se puede deshacer.")) return;
    const empty = emptySectionData(sectionId);
    setData(empty);
    setDirty(true);
    toast.info("Sección vaciada. Pulsa Guardar para conservar los cambios.");
  };

  if (loading || !data) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-full rounded bg-ink/10" />
        <div className="h-32 w-full rounded bg-ink/5" />
        <div className="h-32 w-full rounded bg-ink/5" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Sticky save bar */}
      <div className="sticky top-16 z-20 flex items-center justify-between rounded-xl bg-brand-gradient px-4 py-3 ring-1 ring-inset ring-brand/30 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand-light/70">
            Editando
          </span>
          <span className="font-display text-sm font-semibold text-white capitalize">{SECTION_LABELS[sectionId]}</span>
          {dirty && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold text-amber-200 ring-1 ring-inset ring-amber-300/40">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse-dot" />
              Cambios sin guardar
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-1 rounded-md bg-white/5 px-3 py-1.5 text-xs font-semibold text-brand-light ring-1 ring-inset ring-brand/30 hover:bg-white/10 transition-all"
          >
            Restablecer
          </button>
          <button
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <><span className="h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />Guardando...</>
            ) : (
              <><PortfolioIcon name="check" width={12} height={12} />Guardar cambios</>
            )}
          </button>
        </div>
      </div>

      {/* Fields — cada campo en su propia card con borde para separación visual */}
      <div className="space-y-4">
        {schema.map((field, idx) => (
          <div
            key={field.key}
            className="rounded-xl bg-white p-5 ring-1 ring-inset ring-ink/10 shadow-sm"
          >
            {/* Etiqueta del campo como header */}
            <div className="mb-3 flex items-center gap-2 pb-2 border-b border-ink/8">
              <span className="font-mono-code text-[10px] font-bold uppercase tracking-[0.15em] text-brand">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-sm font-semibold text-ink">
                {field.label}
              </span>
            </div>
            <FieldRenderer
              schema={field}
              value={(data as Record<string, unknown>)[field.key]}
              onChange={(v) => update(field.key, v)}
              placeholder={field.placeholder}
              uid={uid}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
