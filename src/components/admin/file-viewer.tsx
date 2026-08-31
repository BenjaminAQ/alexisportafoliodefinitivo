"use client";

import * as React from "react";
import { PortfolioIcon } from "../portfolio/icons";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

// Determina si una URL es una imagen
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

// ============================================================
// FILE BADGE — tarjeta de archivo con botones Ver/Download
// ============================================================
export function FileBadge({
  name,
  url,
  viewMode,
}: {
  name: string;
  url: string;
  viewMode?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const canView = viewMode === "view" || viewMode === "download";
  const canDownload = viewMode === "download";

  if (viewMode === "none" || !url) return null;

  const displayName = name || fileNameFromUrl(url, "File");
  const isImg = isImageUrl(url);
  const isVid = isVideoUrl(url);
  const isPdf = isPdfUrl(url);

  return (
    <>
      <div className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-inset ring-ink/10 hover:ring-brand/30 transition-all">
        {/* Miniatura */}
        {isImg ? (
          <img
            src={url}
            alt={displayName}
            className="h-14 w-14 shrink-0 rounded-lg object-cover ring-1 ring-inset ring-brand/20"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-inset ring-brand/20">
            <PortfolioIcon name={isVid ? "video" : isPdf ? "pdf" : "code"} width={22} height={22} />
          </div>
        )}

        {/* Nombre */}
        <span className="flex-1 min-w-0 truncate text-sm font-medium text-ink">
          {displayName}
        </span>

        {/* Botones */}
        <div className="flex items-center gap-2 shrink-0">
          {canView && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand/15 px-3 py-2 text-xs font-semibold text-brand hover:bg-brand hover:text-white transition-all"
            >
              <PortfolioIcon name="play" width={13} height={13} />
              View
            </button>
          )}
          {canDownload && (
            <a
              href={url}
              download={displayName}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
            >
              <PortfolioIcon name="download" width={13} height={13} />
              Download
            </a>
          )}
        </div>
      </div>

      {/* ====== MODAL DE PREVISUALIZACIÓN AMPLIO CON ZOOM ====== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="p-0 gap-0 overflow-hidden bg-background flex flex-col"
          style={{ maxWidth: "96vw", width: "96vw", maxHeight: "96vh", height: "96vh", borderRadius: "12px" }}
        >
          <DialogTitle className="sr-only">{displayName}</DialogTitle>

          {/* Barra superior con nombre + controles de zoom + descargar */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3 shrink-0 bg-ink text-white">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <PortfolioIcon
                name={isImg ? "book" : isVid ? "video" : isPdf ? "pdf" : "code"}
                width={18}
                height={18}
                className="text-brand-light shrink-0"
              />
              <span className="text-sm font-semibold truncate">{displayName}</span>
            </div>

            {/* Controles de zoom (solo para imágenes) */}
            {isImg && <ZoomControls />}

            {/* Botón descargar */}
            {canDownload && (
              <a
                href={url}
                download={displayName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all shrink-0 ml-3"
              >
                <PortfolioIcon name="download" width={14} height={14} />
                Download
              </a>
            )}
          </div>

          {/* Contenido del archivo — amplio y con zoom */}
          <div className="flex-1 bg-ink-deep overflow-hidden" style={{ minHeight: 0 }}>
            <FilePreview url={url} name={displayName} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ============================================================
// CONTROLES DE ZOOM — para imágenes
// ============================================================
function ZoomControls() {
  const [zoom, setZoom] = React.useState(100);
  // Usar un evento personalizado para comunicar el zoom al FilePreview
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("file-zoom", { detail: zoom }));
  }, [zoom]);

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        onClick={() => setZoom((z) => Math.max(25, z - 25))}
        className="h-7 w-7 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center font-bold"
        aria-label="Alejar"
      >
        −
      </button>
      <span className="text-xs font-mono-code text-brand-light w-10 text-center">{zoom}%</span>
      <button
        type="button"
        onClick={() => setZoom((z) => Math.min(300, z + 25))}
        className="h-7 w-7 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center font-bold"
        aria-label="Acercar"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => setZoom(100)}
        className="h-7 px-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center text-[10px] font-semibold ml-1"
        aria-label="Restablecer zoom"
      >
        100%
      </button>
    </div>
  );
}

// ============================================================
// FILE PREVIEW — renderiza el archivo según su tipo
// Para imágenes: permite zoom y scroll. Para PDFs/Office: Google Docs Viewer amplio.
// ============================================================
function FilePreview({ url, name }: { url: string; name: string }) {
  const [zoom, setZoom] = React.useState(100);

  React.useEffect(() => {
    const handler = (e: Event) => {
      setZoom((e as CustomEvent).detail as number);
    };
    window.addEventListener("file-zoom", handler);
    return () => window.removeEventListener("file-zoom", handler);
  }, []);

  const isOfficeDoc = /\.(docx?|xlsx?|pptx?|odt|ods|odp)(\?|$)/i.test(url);
  const isPdf = isPdfUrl(url);

  // 1. Imágenes — con zoom y scroll
  if (isImageUrl(url)) {
    return (
      <div className="h-full w-full overflow-auto flex items-center justify-center p-6">
        <img
          src={url}
          alt={name}
          className="rounded-lg shadow-2xl transition-transform duration-200"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center center",
            maxWidth: zoom <= 100 ? "100%" : "none",
            maxHeight: zoom <= 100 ? "100%" : "none",
          }}
        />
      </div>
    );
  }

  // 2. Videos
  if (isVideoUrl(url)) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <video src={url} controls className="max-h-full max-w-full rounded-lg shadow-2xl">
          Your browser does not support video playback.
        </video>
      </div>
    );
  }

  // 3. PDFs y Office — Google Docs Viewer amplio
  if ((isPdf || isOfficeDoc) && !url.startsWith("data:")) {
    return (
      <div className="relative h-full w-full">
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
          title={name}
          className="h-full w-full border-0 bg-white"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
        {/* Div invisible que bloquea el botón "ventana externa" */}
        <div
          className="absolute top-0 right-0 z-10"
          style={{ width: "120px", height: "60px", background: "transparent" }}
          aria-hidden="true"
          onClick={(e) => e.preventDefault()}
        />
      </div>
    );
  }

  // 4. Data URL PDFs
  if (isPdf && url.startsWith("data:")) {
    return (
      <object data={url} type="application/pdf" className="h-full w-full bg-white" title={name}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center p-8">
          <PortfolioIcon name="pdf" width={48} height={48} className="text-brand" />
          <p className="text-sm text-brand-light/70 max-w-md">
            Your browser cannot preview this PDF. Download it to view.
          </p>
        </div>
      </object>
    );
  }

  // 5. Fallback
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center p-8">
      <PortfolioIcon name="pdf" width={48} height={48} className="text-brand" />
      <p className="text-sm text-brand-light/70 max-w-md">
        Could not preview this file in the browser.
      </p>
    </div>
  );
}

// ============================================================
// FILE PREVIEW MODAL — modal controlado para uso externo (CV)
// ============================================================
export function FilePreviewModal({
  preview,
  onClose,
}: {
  preview: { url: string; name: string; downloadable?: boolean } | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!preview} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="p-0 gap-0 overflow-hidden bg-background flex flex-col"
        style={{ maxWidth: "96vw", width: "96vw", maxHeight: "96vh", height: "96vh", borderRadius: "12px" }}
      >
        <DialogTitle className="sr-only">{preview?.name ?? "File"}</DialogTitle>
        <div className="flex items-center justify-between border-b border-border px-5 py-3 shrink-0 bg-ink text-white">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <PortfolioIcon
              name={preview && isImageUrl(preview.url) ? "book" : "pdf"}
              width={18}
              height={18}
              className="text-brand-light shrink-0"
            />
            <span className="text-sm font-semibold truncate">{preview?.name}</span>
          </div>
          {preview?.downloadable !== false && preview && (
            <a
              href={preview.url}
              download={preview.name}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all shrink-0 ml-3"
            >
              <PortfolioIcon name="download" width={14} height={14} />
              Download
            </a>
          )}
        </div>
        <div className="flex-1 bg-ink-deep overflow-hidden" style={{ minHeight: 0 }}>
          {preview && <FilePreview url={preview.url} name={preview.name} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
