"use client";

import * as React from "react";
import { PortfolioIcon } from "../portfolio/icons";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

// Determina si una URL es una imagen basándose en la extensión o el tipo MIME
function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)(\?|$)/i.test(url) || url.startsWith("data:image/");
}
function isPdfUrl(url: string): boolean {
  return /\.pdf(\?|$)/i.test(url) || url.startsWith("data:application/pdf");
}
function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url) || url.startsWith("data:video/");
}

// Extrae el nombre legible de una URL
function fileNameFromUrl(url: string, fallback: string): string {
  if (url.startsWith("data:")) return fallback;
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/");
    const last = parts[parts.length - 1];
    return last ? decodeURIComponent(last) : fallback;
  } catch {
    return fallback;
  }
}

// Botón individual de archivo (se muestra en cards/listas)
export function FileBadge({
  name,
  url,
  viewMode,
}: {
  name: string;
  url: string;
  viewMode?: string; // "none" | "view" | "download"
}) {
  const [open, setOpen] = React.useState(false);
  const canView = viewMode === "view" || viewMode === "download";
  const canDownload = viewMode === "download";

  // Si el modo es "none" o no hay URL, no mostrar nada
  if (viewMode === "none" || !url) return null;

  const displayName = name || fileNameFromUrl(url, "Archivo");

  return (
    <>
      <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-inset ring-brand/20">
        <PortfolioIcon name={isImageUrl(url) ? "book" : "pdf"} width={14} height={14} className="text-brand shrink-0" />
        <span className="flex-1 truncate text-xs text-ink/80 dark:text-brand-light/80 font-mono-code">
          {displayName}
        </span>
        {canView && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1 rounded-md bg-brand/15 px-2 py-1 text-[11px] font-semibold text-brand hover:bg-brand hover:text-white transition-all"
          >
            <PortfolioIcon name="play" width={11} height={11} />
            Ver
          </button>
        )}
        {canDownload && (
          <a
            href={url}
            download={displayName}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[11px] font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
          >
            <PortfolioIcon name="download" width={11} height={11} />
            Descargar
          </a>
        )}
      </div>

      {/* Modal de previsualización */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0 gap-0 overflow-hidden bg-background">
          <DialogTitle className="sr-only">{displayName}</DialogTitle>
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <PortfolioIcon name={isImageUrl(url) ? "book" : "pdf"} width={16} height={16} className="text-brand shrink-0" />
              <span className="text-sm font-semibold truncate">{displayName}</span>
            </div>
            {canDownload && (
              <a
                href={url}
                download={displayName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all shrink-0"
              >
                <PortfolioIcon name="download" width={13} height={13} />
                Descargar
              </a>
            )}
          </div>
          <div className="bg-ink-deep/95" style={{ height: "75vh" }}>
            <FilePreview url={url} name={displayName} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Previsualización del archivo según su tipo
function FilePreview({ url, name }: { url: string; name: string }) {
  if (isImageUrl(url)) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={name} className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" />
      </div>
    );
  }
  if (isPdfUrl(url)) {
    return (
      <iframe
        src={url}
        title={name}
        className="h-full w-full border-0"
        allow="fullscreen"
      />
    );
  }
  if (isVideoUrl(url)) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <video src={url} controls className="max-h-full max-w-full rounded-lg shadow-2xl">
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    );
  }
  // Para otros tipos (Word, Excel, etc.) usamos el visor de Google Docs si es una URL pública
  if (!url.startsWith("data:")) {
    return (
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
        title={name}
        className="h-full w-full border-0"
        allow="fullscreen"
      />
    );
  }
  // Fallback: enlace de descarga
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center p-8">
      <PortfolioIcon name="pdf" width={48} height={48} className="text-brand" />
      <p className="text-sm text-brand-light/70">No se puede previsualizar este archivo.</p>
      <a
        href={url}
        download={name}
        className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
      >
        <PortfolioIcon name="download" width={16} height={16} />
        Descargar archivo
      </a>
    </div>
  );
}

// Modal de previsualización controlado (para usar desde secciones públicas)
export function FilePreviewModal({
  preview,
  onClose,
}: {
  preview: { url: string; name: string; downloadable?: boolean } | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!preview} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 gap-0 overflow-hidden bg-background">
        <DialogTitle className="sr-only">{preview?.name ?? "Archivo"}</DialogTitle>
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <PortfolioIcon
              name={preview && isImageUrl(preview.url) ? "book" : "pdf"}
              width={16}
              height={16}
              className="text-brand shrink-0"
            />
            <span className="text-sm font-semibold truncate">{preview?.name}</span>
          </div>
          {preview?.downloadable !== false && preview && (
            <a
              href={preview.url}
              download={preview.name}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all shrink-0"
            >
              <PortfolioIcon name="download" width={13} height={13} />
              Descargar
            </a>
          )}
        </div>
        <div className="bg-ink-deep" style={{ height: "75vh" }}>
          {preview && <FilePreview url={preview.url} name={preview.name} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

