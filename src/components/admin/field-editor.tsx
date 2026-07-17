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
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted mb-1">{label}</span>
      {hint && <p className="mb-1.5 text-[11px] text-muted/80 leading-snug">{hint}</p>}
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
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted mb-1">{label}</span>
      {hint && <p className="mb-1.5 text-[11px] text-muted/80 leading-snug">{hint}</p>}
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
  uid,
}: {
  label: string;
  value: Record<string, unknown>[];
  onChange: (v: Record<string, unknown>[]) => void;
  itemSchema: FieldSchema[];
  placeholder?: string;
  uid: string;
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
                    uid={uid}
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

// ---------- Image field (uploads to Firebase Storage) ----------
function ImageField({
  label,
  value,
  onChange,
  hint,
  uid,
}: {
  label: string;
  value: string;
  onChange: (v: string, path: string) => void;
  hint?: string;
  uid: string;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      return;
    }
    setError(null);
    setUploading(true);
    setProgress(0);
    try {
      // Simulate progress for better UX
      const interval = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 90));
      }, 150);
      const { uploadFile } = await import("@/lib/storage");
      const result = await uploadFile(file, uid, "images");
      clearInterval(interval);
      setProgress(100);
      onChange(result.url, result.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  return (
    <div>
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted mb-1">{label}</span>
      {hint && <p className="mb-2 text-[11px] text-muted/80 leading-snug">{hint}</p>}
      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-ink/15 flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <PortfolioIcon name="book" width={24} height={24} className="text-muted/50" />
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/60">
              <span className="h-6 w-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            </div>
          )}
        </div>
        {/* Controls */}
        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
            disabled={uploading}
            className="block w-full text-xs text-muted file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-light hover:file:text-ink file:cursor-pointer file:transition-colors"
          />
          {uploading && progress > 0 && (
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full bg-brand transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {value && !uploading && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-ink ring-1 ring-inset ring-ink/15 hover:ring-brand hover:text-brand transition-all"
              >
                <PortfolioIcon name="arrow" width={11} height={11} className="rotate-[-45deg]" />
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange("", "")}
                className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-red-500 ring-1 ring-inset ring-red-200 hover:bg-red-50 transition-all"
              >
                <PortfolioIcon name="close" width={11} height={11} />
                Remove
              </button>
            </div>
          )}
          {error && <p className="text-[11px] text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

// ---------- File field (uploads to Firebase Storage) ----------
function FileField({
  label,
  value,
  onChange,
  hint,
  uid,
}: {
  label: string;
  value: string;
  onChange: (v: string, path: string) => void;
  hint?: string;
  uid: string;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.size > 25 * 1024 * 1024) {
      setError("File must be smaller than 25 MB.");
      return;
    }
    setError(null);
    setUploading(true);
    setProgress(0);
    setFileName(file.name);
    try {
      const interval = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 90));
      }, 150);
      const { uploadFile } = await import("@/lib/storage");
      const result = await uploadFile(file, uid, "files");
      clearInterval(interval);
      setProgress(100);
      onChange(result.url, result.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  return (
    <div>
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted mb-1">{label}</span>
      {hint && <p className="mb-2 text-[11px] text-muted/80 leading-snug">{hint}</p>}
      <div className="space-y-2">
        {value && (
          <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 ring-1 ring-inset ring-ink/10">
            <PortfolioIcon name="pdf" width={14} height={14} className="text-brand shrink-0" />
            <a href={value} target="_blank" rel="noopener noreferrer" className="flex-1 truncate text-xs text-brand hover:underline">
              {fileName || "View file"}
            </a>
            <button
              type="button"
              onClick={() => { onChange("", ""); setFileName(""); }}
              className="text-muted hover:text-red-500 transition-colors"
              aria-label="Remove file"
            >
              <PortfolioIcon name="close" width={13} height={13} />
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
          disabled={uploading}
          className="block w-full text-xs text-muted file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-light hover:file:text-ink file:cursor-pointer file:transition-colors"
        />
        {uploading && progress > 0 && (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
            <div className="h-full bg-brand transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
        )}
        {error && <p className="text-[11px] text-red-500">{error}</p>}
      </div>
    </div>
  );
}

// ---------- Recursive field renderer ----------
export function FieldRenderer({
  schema,
  value,
  onChange,
  placeholder,
  uid,
}: {
  schema: FieldSchema;
  value: unknown;
  onChange: (v: unknown) => void;
  placeholder?: string;
  uid: string;
}) {
  switch (schema.type) {
    case "header":
      return <HeaderField value={(value ?? { eyebrow: "", title: "", description: "" }) as any} onChange={onChange} />;
    case "text":
      return <Input label={schema.label} value={(value as string) ?? ""} onChange={onChange} placeholder={placeholder ?? schema.placeholder} hint={schema.hint} />;
    case "textarea":
      return <TextArea label={schema.label} value={(value as string) ?? ""} onChange={onChange} placeholder={placeholder ?? schema.placeholder} hint={schema.hint} />;
    case "stringList":
      return <StringListField label={schema.label} value={(value as string[]) ?? []} onChange={onChange} placeholder={placeholder ?? schema.placeholder} />;
    case "objectList":
      return (
        <ObjectListField
          label={schema.label}
          value={(value as Record<string, unknown>[]) ?? []}
          onChange={onChange}
          itemSchema={schema.itemSchema ?? []}
          uid={uid}
          placeholder={placeholder}
        />
      );
    case "image":
      return (
        <ImageField
          label={schema.label}
          value={(value as string) ?? ""}
          onChange={(url, path) => onChange(url)}
          hint={schema.hint}
          uid={uid}
        />
      );
    case "file":
      return (
        <FileField
          label={schema.label}
          value={(value as string) ?? ""}
          onChange={(url, path) => onChange(url)}
          hint={schema.hint}
          uid={uid}
        />
      );
    default:
      return null;
  }
}
