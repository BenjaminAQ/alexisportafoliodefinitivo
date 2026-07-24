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
  const isImg = isImageUrl(url);
  const isVid = isVideoUrl(url);
  const isPdf = isPdfUrl(url);

  return (
    <>
      <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5 ring-1 ring-inset ring-brand/20">
        {/* Miniatura: imagen real si es imagen, sino ícono */}
        {isImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={displayName}
            className="h-12 w-12 shrink-0 rounded-md object-cover ring-1 ring-inset ring-brand/30"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
            <PortfolioIcon
              name={isVid ? "video" : isPdf ? "pdf" : "code"}
              width={20}
              height={20}
            />
          </div>
        )}

        {/* Nombre del archivo (NO el link) */}
        <span className="flex-1 truncate text-xs text-ink/80 dark:text-brand-light/80 font-medium">
          {displayName}
        </span>

        {/* Botones */}
        <div className="flex items-center gap-1.5 shrink-0">
          {canView && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1 rounded-md bg-brand/15 px-2.5 py-1.5 text-[11px] font-semibold text-brand hover:bg-brand hover:text-white transition-all"
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
              className="inline-flex items-center gap-1 rounded-md bg-brand px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-brand-light hover:text-ink transition-all"
            >
              <PortfolioIcon name="download" width={11} height={11} />
              Descargar
            </a>
          )}
        </div>
      </div>

      {/* Modal de previsualización — MUY GRANDE */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 gap-0 overflow-hidden bg-background">
          <DialogTitle className="sr-only">{displayName}</DialogTitle>
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <PortfolioIcon
                name={isImg ? "book" : isVid ? "video" : isPdf ? "pdf" : "code"}
                width={18}
                height={18}
                className="text-brand shrink-0"
              />
              <span className="text-sm font-semibold truncate">{displayName}</span>
            </div>
            {canDownload && (
              <a
                href={url}
                download={displayName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all shrink-0"
              >
                <PortfolioIcon name="download" width={14} height={14} />
                Descargar
              </a>
            )}
          </div>
          <div className="bg-ink-deep" style={{ height: "88vh" }}>
            <FilePreview url={url} name={displayName} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Previsualización del archivo según su tipo
// Muestra el documento como una hoja limpia (sin barras de herramientas ni
// opciones de descarga integradas). La descarga se controla desde el botón
// externo del modal, no desde el visor.
function FilePreview({ url, name }: { url: string; name: string }) {
  // Detectar tipos
  const isOfficeDoc = /\.(docx?|xlsx?|pptx?|odt|ods|odp)(\?|$)/i.test(url);
  const isPdf = isPdfUrl(url);

  // 1. Imágenes — visor nativo (limpio, sin toolbar)
  if (isImageUrl(url)) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-ink-deep p-6 overflow-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={name} className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" />
      </div>
    );
  }

  // 2. Videos — visor nativo
  if (isVideoUrl(url)) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-ink-deep p-6">
        <video src={url} controls className="max-h-full max-w-full rounded-lg shadow-2xl">
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    );
  }

  // 3. PDFs y documentos de Office — usar Google Docs Viewer
  //    Muestra el documento como una hoja limpia, SIN toolbar de descarga.
  //    Funciona para PDF, Word, Excel, PowerPoint, etc.
  if ((isPdf || isOfficeDoc) && !url.startsWith("data:")) {
    return (
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
        title={name}
        className="h-full w-full border-0 bg-white"
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    );
  }

  // 4. Para data URLs (archivos subidos en modo preview/localStorage) que son PDFs
  if (isPdf && url.startsWith("data:")) {
    return (
      <object
        data={url}
        type="application/pdf"
        className="h-full w-full bg-white"
        title={name}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center p-8">
          <PortfolioIcon name="pdf" width={48} height={48} className="text-brand" />
          <p className="text-sm text-brand-light/70 max-w-md">
            Tu navegador no puede previsualizar este PDF. Descárgalo para verlo.
          </p>
        </div>
      </object>
    );
  }

  // 5. Fallback final — si todo falla, mostrar mensaje
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center p-8 bg-ink-deep">
      <PortfolioIcon name="pdf" width={48} height={48} className="text-brand" />
      <p className="text-sm text-brand-light/70 max-w-md">
        No se pudo previsualizar este archivo en el navegador.
      </p>
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
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 gap-0 overflow-hidden bg-background">
        <DialogTitle className="sr-only">{preview?.name ?? "Archivo"}</DialogTitle>
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <PortfolioIcon
              name={preview && isImageUrl(preview.url) ? "book" : "pdf"}
              width={18}
              height={18}
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
              className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-light hover:text-ink transition-all shrink-0"
            >
              <PortfolioIcon name="download" width={13} height={13} />
              Descargar
            </a>
          )}
        </div>
        <div className="bg-ink-deep" style={{ height: "88vh" }}>
          {preview && <FilePreview url={preview.url} name={preview.name} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

