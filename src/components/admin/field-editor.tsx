"use client";

import * as React from "react";
import { PortfolioIcon } from "../portfolio/icons";
import type { FieldSchema } from "./field-schemas";
import { cn } from "@/lib/utils";

// Generates a unique id for new array items
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ---------- Header field (eyebrow / title / description) ----------
function HeaderField({
  value,
  onChange,
}: {
  value: { eyebrow: string; title: string; description: string };
  onChange: (v: { eyebrow: string; title: string; description: string }) => void;
}) {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-inset ring-ink/10 space-y-3">
      <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand">Section header</p>
      <Input
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(v) => onChange({ ...value, eyebrow: v })}
        placeholder="PROJECTS"
      />
      <Input
        label="Title"
        value={value.title}
        onChange={(v) => onChange({ ...value, title: v })}
        placeholder="Documented work bridging theory, modeling and code"
      />
      <TextArea
        label="Description"
        value={value.description}
        onChange={(v) => onChange({ ...value, description: v })}
        placeholder="Each project combines a clear problem statement..."
      />
    </div>
  );
}

// ---------- Text input ----------
function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted mb-1">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md bg-surface px-3 py-2 text-sm text-ink ring-1 ring-inset ring-ink/15 placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/60"
      />
    </label>
  );
}

// ---------- Textarea ----------
function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted mb-1">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-y rounded-md bg-surface px-3 py-2 text-sm text-ink ring-1 ring-inset ring-ink/15 placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/60"
      />
    </label>
  );
}

// ---------- String list (tags) ----------
function StringListField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState("");
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...value, v]);
    setDraft("");
  };
  return (
    <div>
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted mb-1">{label}</span>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-md bg-surface px-3 py-2 text-sm text-ink ring-1 ring-inset ring-ink/15 placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/60"
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
        >
          <PortfolioIcon name="arrow" width={12} height={12} className="rotate-[-45deg]" />
          Add
        </button>
      </div>
      {value.length > 0 && (
        <ul className="mt-2 space-y-1">
          {value.map((item, i) => (
            <li key={i} className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 ring-1 ring-inset ring-ink/10 group">
              <span className="flex-1 text-sm text-ink">{item}</span>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="text-muted hover:text-red-500 transition-colors"
                aria-label="Remove"
              >
                <PortfolioIcon name="close" width={14} height={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- Object list (cards) ----------
function ObjectListField({
  label,
  value,
  onChange,
  itemSchema,
  placeholder,
}: {
  label: string;
  value: Record<string, unknown>[];
  onChange: (v: Record<string, unknown>[]) => void;
  itemSchema: FieldSchema[];
  placeholder?: string;
}) {
  const update = (i: number, patch: Record<string, unknown>) => {
    onChange(value.map((item, j) => (j === i ? { ...item, ...patch } : item)));
  };
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => {
    const item: Record<string, unknown> = { id: uid() };
    itemSchema.forEach((f) => {
      if (f.type === "stringList") item[f.key] = [];
      else if (f.type === "objectList") item[f.key] = [];
      else if (f.type === "header") item[f.key] = { eyebrow: "", title: "", description: "" };
      else item[f.key] = "";
    });
    onChange([...value, item]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted">{label}</span>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
        >
          <PortfolioIcon name="arrow" width={12} height={12} className="rotate-[-45deg]" />
          Add {label.replace(/s$/, "").toLowerCase()}
        </button>
      </div>
      {value.length === 0 ? (
        <p className="rounded-md bg-white/50 px-3 py-4 text-center text-xs text-muted ring-1 ring-inset ring-dashed ring-ink/15">
          No {label.toLowerCase()} yet. Click "Add" to create one.
        </p>
      ) : (
        <ul className="space-y-3">
          {value.map((item, i) => (
            <li key={(item.id as string) || i} className="rounded-xl bg-white p-4 ring-1 ring-inset ring-ink/10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-code text-[10px] uppercase tracking-[0.12em] text-brand">
                  #{String(i + 1).padStart(2, "0")} {item.title ? `· ${String(item.title).slice(0, 40)}` : ""}
                </span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                    className="p-1 text-muted hover:text-brand disabled:opacity-30" aria-label="Move up">
                    <PortfolioIcon name="chevron" width={14} height={14} className="rotate-180" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1}
                    className="p-1 text-muted hover:text-brand disabled:opacity-30" aria-label="Move down">
                    <PortfolioIcon name="chevron" width={14} height={14} />
                  </button>
                  <button type="button" onClick={() => remove(i)}
                    className="p-1 text-muted hover:text-red-500" aria-label="Remove">
                    <PortfolioIcon name="close" width={14} height={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {itemSchema.map((f) => (
                  <FieldRenderer
                    key={f.key}
                    schema={f}
                    value={item[f.key]}
                    onChange={(v) => update(i, { [f.key]: v })}
                    placeholder={f.placeholder}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- Recursive field renderer ----------
export function FieldRenderer({
  schema,
  value,
  onChange,
  placeholder,
}: {
  schema: FieldSchema;
  value: unknown;
  onChange: (v: unknown) => void;
  placeholder?: string;
}) {
  switch (schema.type) {
    case "header":
      return <HeaderField value={(value ?? { eyebrow: "", title: "", description: "" }) as any} onChange={onChange} />;
    case "text":
      return <Input label={schema.label} value={(value as string) ?? ""} onChange={onChange} placeholder={placeholder ?? schema.placeholder} />;
    case "textarea":
      return <TextArea label={schema.label} value={(value as string) ?? ""} onChange={onChange} placeholder={placeholder ?? schema.placeholder} />;
    case "stringList":
      return <StringListField label={schema.label} value={(value as string[]) ?? []} onChange={onChange} placeholder={placeholder ?? schema.placeholder} />;
    case "objectList":
      return (
        <ObjectListField
          label={schema.label}
          value={(value as Record<string, unknown>[]) ?? []}
          onChange={onChange}
          itemSchema={schema.itemSchema ?? []}
          placeholder={placeholder}
        />
      );
    default:
      return null;
  }
}
