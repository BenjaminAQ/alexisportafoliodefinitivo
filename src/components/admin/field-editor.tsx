"use client";

import * as React from "react";
import { PortfolioIcon } from "../portfolio/icons";
import type { FieldSchema } from "./field-schemas";
import { cn } from "@/lib/utils";

// Generates a unique id for new array items
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ---------- Color picker field (Canva/Word style) ----------
const PRESET_COLORS = [
  "#FFFFFF", "#E0E0E0", "#8B94A8", "#0A0E27", "#000000",
  "#00B4D8", "#4DC9E8", "#2A9D8F", "#4CB8AB", "#0066CC",
  "#FFD60A", "#FF4D88", "#FF3A3A", "#4CAF50", "#9C27B0",
  "#FF9800", "#795548", "#607D8B", "#E91E63", "#3F51B5",
];

function ColorField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  const [showPicker, setShowPicker] = React.useState(false);
  const popRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showPicker) return;
    const handler = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPicker]);

  return (
    <div className="relative">
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted-foreground mb-1">{label}</span>
      {hint && <p className="mb-1.5 text-[11px] text-muted-foreground/80 leading-snug">{hint}</p>}
      <div className="flex items-center gap-2">
        {/* Color swatch button */}
        <button
          type="button"
          onClick={() => setShowPicker((v) => !v)}
          className="relative h-9 w-9 shrink-0 rounded-md ring-1 ring-inset ring-ink/20 overflow-hidden hover:ring-brand transition-all"
          aria-label="Abrir selector de color"
          style={{ backgroundColor: value || "transparent" }}
        >
          {!value && (
            <span className="absolute inset-0 flex items-center justify-center text-[9px] text-muted">Auto</span>
          )}
        </button>
        {/* Hex input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Automático (hereda del tema)"
          className="flex-1 rounded-md bg-background px-3 py-2 text-sm text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand/60 font-mono-code"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-muted hover:text-red-500 transition-colors p-1"
            aria-label="Quitar color"
          >
            <PortfolioIcon name="close" width={14} height={14} />
          </button>
        )}
      </div>

      {/* Popover color picker */}
      {showPicker && (
        <div
          ref={popRef}
          className="absolute z-50 mt-1 w-64 rounded-xl bg-white p-3 shadow-xl ring-1 ring-inset ring-ink/15"
        >
          {/* Preset palette grid */}
          <p className="mb-2 text-[10px] font-mono-code uppercase tracking-[0.12em] text-muted">Paleta</p>
          <div className="grid grid-cols-10 gap-1.5 mb-3">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => { onChange(c); }}
                className="h-6 w-6 rounded ring-1 ring-inset ring-ink/15 hover:scale-110 hover:ring-brand transition-all"
                style={{ backgroundColor: c }}
                aria-label={c}
                title={c}
              />
            ))}
          </div>

          {/* Native color picker for custom colors */}
          <p className="mb-2 text-[10px] font-mono-code uppercase tracking-[0.12em] text-muted">Color personalizado</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value && /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#00b4d8"}
              onChange={(e) => onChange(e.target.value.toUpperCase())}
              className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent p-0"
              aria-label="Selector de color personalizado"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#00B4D8"
              className="flex-1 rounded-md bg-background px-3 py-2 text-sm font-mono-code text-foreground ring-1 ring-inset ring-border focus:outline-none focus:ring-2 focus:ring-brand/60"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Reorder list (solo reordenar, sin crear/eliminar) ----------
const SECTION_DISPLAY_NAMES: Record<string, string> = {
  about: "About",
  expertise: "Areas of Expertise",
  projects: "Projects",
  resources: "Open Academic Resources",
  library: "Technical Library",
  teaching: "Teaching Portfolio",
  cv: "CV",
  contact: "Contact",
};

function ReorderListField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
}) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted-foreground mb-1">{label}</span>
      {hint && <p className="mb-2 text-[11px] text-muted-foreground/80 leading-snug">{hint}</p>}
      <ul className="space-y-2">
        {value.map((item, i) => (
          <li key={item} className="flex items-center gap-3 rounded-lg bg-background px-3 py-2.5 ring-1 ring-inset ring-border">
            <span className="font-mono-code text-[10px] text-brand shrink-0 w-6">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 text-sm font-medium text-foreground">{SECTION_DISPLAY_NAMES[item] || item}</span>
            <div className="flex items-center gap-1 shrink-0">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                className="p-1.5 text-muted hover:text-brand hover:bg-brand/10 rounded disabled:opacity-30 transition-all" aria-label="Move up">
                <PortfolioIcon name="chevron" width={14} height={14} className="rotate-180" />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1}
                className="p-1.5 text-muted hover:text-brand hover:bg-brand/10 rounded disabled:opacity-30 transition-all" aria-label="Move down">
                <PortfolioIcon name="chevron" width={14} height={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- Select field (dropdown) ----------
function SelectField({
  label,
  value,
  onChange,
  hint,
  options = [],
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  options?: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted-foreground mb-1">{label}</span>
      {hint && <p className="mb-1.5 text-[11px] text-muted-foreground/80 leading-snug">{hint}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-background px-3 py-2 text-sm text-foreground ring-1 ring-inset ring-border focus:outline-none focus:ring-2 focus:ring-brand/60 cursor-pointer"
      >
        <option value="">— Select —</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  );
}

// ---------- Header field (eyebrow / title / description + colors) ----------
function HeaderField({
  value,
  onChange,
}: {
  value: { eyebrow: string; title: string; description: string; eyebrowColor?: string; titleColor?: string; descriptionColor?: string };
  onChange: (v: { eyebrow: string; title: string; description: string; eyebrowColor?: string; titleColor?: string; descriptionColor?: string }) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-brand">Encabezado de la sección</p>
      <Input
        label="Texto superior (eyebrow)"
        value={value.eyebrow}
        onChange={(v) => onChange({ ...value, eyebrow: v })}
        placeholder="PROYECTOS"
      />
      <ColorField
        label="Color del texto superior (eyebrow)"
        value={value.eyebrowColor ?? ""}
        onChange={(v) => onChange({ ...value, eyebrowColor: v })}
      />
      <Input
        label="Título"
        value={value.title}
        onChange={(v) => onChange({ ...value, title: v })}
        placeholder="Trabajo documentado que une teoría, modelado y código"
      />
      <ColorField
        label="Color del título"
        value={value.titleColor ?? ""}
        onChange={(v) => onChange({ ...value, titleColor: v })}
      />
      <TextArea
        label="Descripción"
        value={value.description}
        onChange={(v) => onChange({ ...value, description: v })}
        placeholder="Cada proyecto combina un planteamiento claro del problema..."
      />
      <ColorField
        label="Color de la descripción"
        value={value.descriptionColor ?? ""}
        onChange={(v) => onChange({ ...value, descriptionColor: v })}
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
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted-foreground mb-1">{label}</span>
      {hint && <p className="mb-1.5 text-[11px] text-muted-foreground/80 leading-snug">{hint}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md bg-background px-3 py-2 text-sm text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand/60"
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
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted-foreground mb-1">{label}</span>
      {hint && <p className="mb-1.5 text-[11px] text-muted-foreground/80 leading-snug">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-y rounded-md bg-background px-3 py-2 text-sm text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand/60"
      />
    </label>
  );
}

// ---------- String list (tags with inline editing) ----------
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
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editDraft, setEditDraft] = React.useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...value, v]);
    setDraft("");
  };

  const startEdit = (i: number) => {
    setEditingIndex(i);
    setEditDraft(value[i]);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const v = editDraft.trim();
    if (!v) return;
    const next = [...value];
    next[editingIndex] = v;
    onChange(next);
    setEditingIndex(null);
    setEditDraft("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditDraft("");
  };

  return (
    <div>
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted-foreground mb-1">{label}</span>
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
          className="flex-1 rounded-md bg-background px-3 py-2 text-sm text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand/60"
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white hover:bg-brand-light hover:text-foreground transition-all"
        >
          <PortfolioIcon name="arrow" width={12} height={12} className="rotate-[-45deg]" />
          Add
        </button>
      </div>
      {value.length > 0 && (
        <ul className="mt-2 space-y-1">
          {value.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-md bg-card px-3 py-2 ring-1 ring-inset ring-border group hover:ring-brand/30 transition-all"
            >
              {editingIndex === i ? (
                // Modo edición: input inline
                <>
                  <input
                    type="text"
                    value={editDraft}
                    onChange={(e) => setEditDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); saveEdit(); }
                      if (e.key === "Escape") { e.preventDefault(); cancelEdit(); }
                    }}
                    autoFocus
                    className="flex-1 min-w-0 rounded-md bg-background px-2 py-1 text-sm text-foreground ring-1 ring-inset ring-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/60"
                  />
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[11px] font-semibold text-white hover:bg-brand-light transition-all shrink-0"
                  >
                    <PortfolioIcon name="check" width={11} height={11} />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-muted hover:text-foreground transition-colors p-1 shrink-0"
                    aria-label="Cancel"
                  >
                    <PortfolioIcon name="close" width={14} height={14} />
                  </button>
                </>
              ) : (
                // Modo vista: click para editar
                <>
                  <span
                    className="flex-1 min-w-0 text-sm text-foreground cursor-pointer truncate"
                    onClick={() => startEdit(i)}
                    title="Click para editar"
                  >
                    {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => startEdit(i)}
                    className="opacity-0 group-hover:opacity-100 text-muted hover:text-brand transition-all p-1 shrink-0"
                    aria-label="Edit"
                  >
                    <PortfolioIcon name="chevron" width={14} height={14} className="rotate-[-90deg]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(value.filter((_, j) => j !== i))}
                    className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-500 transition-all p-1 shrink-0"
                    aria-label="Delete"
                  >
                    <PortfolioIcon name="close" width={14} height={14} />
                  </button>
                </>
              )}
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
    const item: Record<string, unknown> = { id: generateId() };
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
          className="inline-flex items-center gap-1 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-light hover:text-foreground transition-all"
        >
          <PortfolioIcon name="arrow" width={12} height={12} className="rotate-[-45deg]" />
          Add {label.replace(/s$/, "").toLowerCase()}
        </button>
      </div>
      {value.length === 0 ? (
        <p className="rounded-md bg-muted/50 px-3 py-4 text-center text-xs text-muted-foreground ring-1 ring-inset ring-dashed ring-ink/15">
          No {label.toLowerCase()} yet. Click "Add" to create one.
        </p>
      ) : (
        <ul className="space-y-4">
          {value.map((item, i) => (
            <li key={(item.id as string) || i} className="rounded-xl bg-card p-4 ring-1 ring-inset ring-brand/20">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand/10">
                <span className="font-display text-sm font-bold text-brand">
                  #{String(i + 1).padStart(2, "0")} {item.title ? `· ${String(item.title).slice(0, 40)}` : ""}
                </span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                    className="p-1.5 text-muted hover:text-brand hover:bg-brand/10 rounded disabled:opacity-30 transition-all" aria-label="Move up">
                    <PortfolioIcon name="chevron" width={14} height={14} className="rotate-180" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1}
                    className="p-1.5 text-muted hover:text-brand hover:bg-brand/10 rounded disabled:opacity-30 transition-all" aria-label="Move down">
                    <PortfolioIcon name="chevron" width={14} height={14} />
                  </button>
                  <button type="button" onClick={() => remove(i)}
                    className="p-1.5 text-muted hover:text-red-500 hover:bg-red-50 rounded transition-all" aria-label="Delete">
                    <PortfolioIcon name="close" width={14} height={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
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

// Canvas-based client-side image compression (drastically reduces asset weight before uploading)
async function compressImage(file: File, maxWidth = 1600, maxHeight = 1600, quality = 0.82): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
      resolve(file);
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let width = img.width;
      let height = img.height;
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(file); return; }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) { resolve(file); return; }
        const compressed = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
          type: "image/webp",
          lastModified: Date.now(),
        });
        resolve(compressed);
      }, "image/webp", quality);
    };
    img.onerror = () => resolve(file);
    img.src = url;
  });
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
      setError("Selecciona un archivo de imagen.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError("La imagen debe ser menor a 15 MB.");
      return;
    }
    setError(null);
    setUploading(true);
    setProgress(0);
    try {
      // Compress image client-side to WebP for instant loads
      const fileToUpload = await compressImage(file);
      const interval = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 90));
      }, 150);
      const { uploadFile } = await import("@/lib/storage");
      const result = await uploadFile(fileToUpload, uid, "images");
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
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted-foreground mb-1">{label}</span>
      {hint && <p className="mb-2 text-[11px] text-muted-foreground/80 leading-snug">{hint}</p>}
      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-background ring-1 ring-inset ring-border flex items-center justify-center">
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
            className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-light hover:file:text-foreground file:cursor-pointer file:transition-colors"
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
                className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground ring-1 ring-inset ring-border hover:ring-brand hover:text-brand transition-all"
              >
                <PortfolioIcon name="arrow" width={11} height={11} className="rotate-[-45deg]" />
                Reemplazar
              </button>
              <button
                type="button"
                onClick={() => onChange("", "")}
                className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-red-500 ring-1 ring-inset ring-red-200 hover:bg-red-50 transition-all"
              >
                <PortfolioIcon name="close" width={11} height={11} />
                Delete
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
    if (file.size > 100 * 1024 * 1024) {
      setError("El archivo debe ser menor a 100 MB.");
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
      setError(err instanceof Error ? err.message : "Error al subir.");
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  return (
    <div>
      <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-muted-foreground mb-1">{label}</span>
      {hint && <p className="mb-2 text-[11px] text-muted-foreground/80 leading-snug">{hint}</p>}
      <div className="space-y-2">
        {value && (
          <div className="flex items-center gap-2 rounded-md bg-card px-3 py-2 ring-1 ring-inset ring-border">
            <PortfolioIcon name="pdf" width={14} height={14} className="text-brand shrink-0" />
            <a href={value} target="_blank" rel="noopener noreferrer" className="flex-1 truncate text-xs text-brand hover:underline">
              {fileName || "Ver archivo"}
            </a>
            <button
              type="button"
              onClick={() => { onChange("", ""); setFileName(""); }}
              className="text-muted hover:text-red-500 transition-colors"
              aria-label="Delete file"
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
          className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-light hover:file:text-foreground file:cursor-pointer file:transition-colors"
        />
        <p className="mt-1 text-[10px] text-muted/70">PDF, Word, Excel, imágenes, ZIP, RAR, videos, código — hasta 100 MB</p>
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
    case "color":
      return (
        <ColorField
          label={schema.label}
          value={(value as string) ?? ""}
          onChange={onChange}
          hint={schema.hint}
        />
      );
    case "select":
      return (
        <SelectField
          label={schema.label}
          value={(value as string) ?? ""}
          onChange={onChange}
          hint={schema.hint}
          options={schema.options}
        />
      );
    case "reorderList":
      return (
        <ReorderListField
          label={schema.label}
          value={(value as string[]) ?? []}
          onChange={onChange}
          hint={schema.hint}
        />
      );
    default:
      return null;
  }
}
