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

// Detecta si el dispositivo es móvil (Android/iOS no renderizan PDF inline)
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
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

      {/* ====== MODAL DE PREVISUALIZACIÓN ====== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="p-0 gap-0 overflow-hidden bg-background flex flex-col"
          style={{ maxWidth: "96vw", width: "96vw", maxHeight: "96vh", height: "96vh", borderRadius: "12px" }}
        >
          <DialogTitle className="sr-only">{displayName}</DialogTitle>

          {/* Barra superior con nombre + controles de zoom + descargar (si permitido) */}
          <div className="flex items-center justify-between border-b border-border pl-5 pr-16 py-3 shrink-0 bg-ink text-white">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <PortfolioIcon
                name={isImg ? "book" : isVid ? "video" : isPdf ? "pdf" : "code"}
                width={18}
                height={18}
                className="text-brand-light shrink-0"
              />
              <span className="text-sm font-semibold truncate">{displayName}</span>
              {!canDownload && (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-brand/15 px-2.5 py-0.5 text-[10px] font-semibold text-brand-light border border-brand/30 ml-2">
                  Solo lectura
                </span>
              )}
            </div>

            {/* Controles de zoom (solo para imágenes) */}
            {isImg && <ZoomControls />}

            {/* Botón descargar: SOLO visible si el admin configuró 'download' */}
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

          {/* Contenido del archivo */}
          <div className="flex-1 bg-ink-deep overflow-hidden" style={{ minHeight: 0, touchAction: "auto", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
            <FilePreview url={url} name={displayName} canDownload={canDownload} />
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
// FILE PREVIEW — renderiza el archivo según su tipo y permisos
// ============================================================
function FilePreview({
  url,
  name,
  canDownload = true,
}: {
  url: string;
  name: string;
  canDownload?: boolean;
}) {
  const [zoom, setZoom] = React.useState(100);
  const [mobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    // Detectar mobile en cliente (evita SSR mismatch)
    setMobile(isMobileDevice());

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
          className="rounded-lg shadow-2xl transition-transform duration-200 select-none"
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

  // 2. Videos — bloquea descarga si canDownload es false
  if (isVideoUrl(url)) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <video
          src={url}
          controls
          controlsList={!canDownload ? "nodownload" : undefined}
          className="max-h-full max-w-full rounded-lg shadow-2xl"
          playsInline
        >
          Your browser does not support video playback.
        </video>
      </div>
    );
  }

  // 3. PDFs — móvil usa Google Docs Viewer (Android no puede renderizar inline)
  //          desktop usa visor nativo con toolbar=0 para solo lectura
  if (isPdf && !url.startsWith("data:")) {
    if (mobile) {
      // Google Docs Viewer funciona bien en Android/iOS
      const googleSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
      return (
        <div
          className="relative h-full w-full bg-slate-900"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "auto" } as React.CSSProperties}
        >
          <iframe
            src={googleSrc}
            title={name}
            className="h-full w-full border-0 bg-white"
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            style={{ touchAction: "auto" }}
          />
        </div>
      );
    }

    // Desktop: visor nativo con parámetros de toolbar
    const toolbarParam = canDownload ? "1" : "0";
    const pdfSrc = `${url}#toolbar=${toolbarParam}&navpanes=0&scrollbar=1`;

    return (
      <div className="relative h-full w-full bg-slate-900">
        <object
          data={pdfSrc}
          type="application/pdf"
          className="h-full w-full border-0 bg-white"
          title={name}
        >
          <iframe
            src={pdfSrc}
            title={name}
            className="h-full w-full border-0 bg-white"
            allow="fullscreen"
          />
        </object>
      </div>
    );
  }

  // 4. Documentos de Office — Visor limpio sin div bloqueador obsoleto
  if (isOfficeDoc && !url.startsWith("data:")) {
    return (
      <div
        className="relative h-full w-full bg-slate-900"
        style={{ WebkitOverflowScrolling: "touch", touchAction: "auto" } as React.CSSProperties}
      >
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
          title={name}
          className="h-full w-full border-0 bg-white"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups"
          style={{ touchAction: "auto" }}
        />
      </div>
    );
  }

  // 5. Data URL PDFs
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

  // 6. Fallback
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
  const isImg = preview ? isImageUrl(preview.url) : false;
  const isVid = preview ? isVideoUrl(preview.url) : false;
  const isPdf = preview ? isPdfUrl(preview.url) : false;
  const canDownload = preview?.downloadable !== false;

  return (
    <Dialog open={!!preview} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="p-0 gap-0 overflow-hidden bg-background flex flex-col"
        style={{ maxWidth: "96vw", width: "96vw", maxHeight: "96vh", height: "96vh", borderRadius: "12px" }}
      >
        <DialogTitle className="sr-only">{preview?.name ?? "File"}</DialogTitle>
        <div className="flex items-center justify-between border-b border-border pl-5 pr-16 py-3 shrink-0 bg-ink text-white">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <PortfolioIcon
              name={isImg ? "book" : isVid ? "video" : isPdf ? "pdf" : "code"}
              width={18}
              height={18}
              className="text-brand-light shrink-0"
            />
            <span className="text-sm font-semibold truncate">{preview?.name}</span>
            {!canDownload && (
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-brand/15 px-2.5 py-0.5 text-[10px] font-semibold text-brand-light border border-brand/30 ml-2">
                Solo lectura
              </span>
            )}
          </div>
          {canDownload && preview && (
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
        <div className="flex-1 bg-ink-deep overflow-hidden" style={{ minHeight: 0, touchAction: "auto", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
          {preview && <FilePreview url={preview.url} name={preview.name} canDownload={canDownload} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
