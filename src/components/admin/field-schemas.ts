// Esquemas de campos editables para cada sección.
// Controlan el editor genérico del admin — sin formularios escritos a mano.

import type { SectionId } from "@/lib/content-types";

export type FieldType = "text" | "textarea" | "stringList" | "objectList" | "header" | "image" | "file";

export interface FieldSchema {
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  itemSchema?: FieldSchema[]; // para objectList
  hint?: string;
}

export const SECTION_SCHEMAS: Record<SectionId, FieldSchema[]> = {
  home: [
    { key: "eyebrow", type: "text", label: "Texto superior (eyebrow)", placeholder: "Portafolio Académico · Ingeniero Civil" },
    { key: "title", type: "textarea", label: "Título principal", hint: "Usa {accent}palabra{/accent} para resaltar texto con el color de marca." },
    { key: "subtitle", type: "textarea", label: "Subtítulo / descripción" },
    { key: "profileImage", type: "image", label: "Imagen de perfil (circular)" },
    { key: "profileName", type: "text", label: "Nombre", placeholder: "Alexis" },
    { key: "profileRole", type: "text", label: "Cargo / profesión", placeholder: "Ingeniero Civil" },
    { key: "ctaButtons", type: "objectList", label: "Botones de acción", itemSchema: [
      { key: "label", type: "text", label: "Texto del botón", placeholder: "Ver proyectos" },
      { key: "target", type: "text", label: "Destino (ancla o URL)", placeholder: "#projects" },
      { key: "primary", type: "text", label: "Principal (true/false)", placeholder: "true" },
    ]},
  ],
  about: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "bio", type: "textarea", label: "Biografía", placeholder: "Tu biografía profesional..." },
    { key: "highlights", type: "stringList", label: "Puntos destacados", placeholder: "Añadir un punto destacado..." },
    { key: "stats", type: "objectList", label: "Estadísticas", itemSchema: [
      { key: "value", type: "text", label: "Valor", placeholder: "8+" },
      { key: "label", type: "text", label: "Etiqueta", placeholder: "Años de experiencia" },
    ]},
  ],
  expertise: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "areas", type: "objectList", label: "Áreas", itemSchema: [
      { key: "number", type: "text", label: "Número", placeholder: "01" },
      { key: "title", type: "text", label: "Título", placeholder: "Análisis Matricial Estructural" },
      { key: "icon", type: "text", label: "Nombre del ícono", placeholder: "matrix | mesh | curve | wave | building | target | globe" },
      { key: "description", type: "textarea", label: "Descripción" },
      { key: "topics", type: "stringList", label: "Temas", placeholder: "Añadir un tema..." },
      { key: "materials", type: "textarea", label: "Material disponible" },
    ]},
  ],
  projects: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "projects", type: "objectList", label: "Proyectos", itemSchema: [
      { key: "title", type: "text", label: "Título", placeholder: "Solver de análisis matricial" },
      { key: "area", type: "text", label: "Área", placeholder: "Análisis Matricial Estructural" },
      { key: "level", type: "text", label: "Nivel", placeholder: "Principiante | Intermedio | Avanzado | Investigación" },
      { key: "abstract", type: "textarea", label: "Resumen" },
      { key: "tech", type: "stringList", label: "Tecnologías", placeholder: "MATLAB, Python..." },
      { key: "sections", type: "objectList", label: "Secciones de detalle", itemSchema: [
        { key: "heading", type: "text", label: "Encabezado", placeholder: "Planteamiento del problema" },
        { key: "body", type: "textarea", label: "Contenido" },
      ]},
      { key: "files", type: "objectList", label: "Archivos descargables", itemSchema: [
        { key: "name", type: "text", label: "Nombre visible", placeholder: "solver.py" },
        { key: "url", type: "file", label: "Archivo (subir)" },
        { key: "downloadable", type: "text", label: "Descargable (true/false)", placeholder: "true", hint: "Si es false, el archivo no mostrará botón de descarga en la web." },
      ]},
      { key: "references", type: "stringList", label: "Referencias", placeholder: "Autor, Título..." },
    ]},
  ],
  resources: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "resources", type: "objectList", label: "Recursos", itemSchema: [
      { key: "title", type: "text", label: "Título" },
      { key: "category", type: "text", label: "Categoría" },
      { key: "level", type: "text", label: "Nivel", placeholder: "Principiante | Intermedio | Avanzado | Investigación" },
      { key: "type", type: "text", label: "Tipo", placeholder: "video | PDF | código | plantilla | manual | ejemplo" },
      { key: "duration", type: "text", label: "Duración", placeholder: "1.5 h" },
      { key: "description", type: "textarea", label: "Descripción" },
      { key: "prerequisites", type: "text", label: "Requisitos previos" },
      { key: "objectives", type: "textarea", label: "Objetivos" },
      { key: "file", type: "file", label: "Archivo descargable (opcional)" },
      { key: "downloadable", type: "text", label: "Descargable (true/false)", placeholder: "true" },
    ]},
  ],
  library: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "items", type: "objectList", label: "Documentos", itemSchema: [
      { key: "title", type: "text", label: "Título" },
      { key: "type", type: "text", label: "Tipo", placeholder: "Apuntes | Informes técnicos | ..." },
      { key: "area", type: "text", label: "Área" },
      { key: "level", type: "text", label: "Nivel" },
      { key: "software", type: "text", label: "Software" },
      { key: "language", type: "text", label: "Idioma" },
      { key: "date", type: "text", label: "Fecha", placeholder: "2024-03-12" },
      { key: "file", type: "file", label: "Archivo PDF (subir)" },
      { key: "downloadable", type: "text", label: "Descargable (true/false)", placeholder: "true", hint: "Si es false, el documento no mostrará botón de descarga en la web." },
    ]},
  ],
  teaching: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "items", type: "objectList", label: "Elementos de enseñanza", itemSchema: [
      { key: "title", type: "text", label: "Título" },
      { key: "icon", type: "text", label: "Nombre del ícono", placeholder: "book | layers | code | users | target" },
      { key: "body", type: "textarea", label: "Contenido" },
    ]},
  ],
  cv: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "downloads", type: "objectList", label: "Documentos descargables", itemSchema: [
      { key: "label", type: "text", label: "Etiqueta del botón", placeholder: "CV Académico (PDF)" },
      { key: "file", type: "file", label: "Archivo PDF (subir)" },
      { key: "downloadable", type: "text", label: "Descargable (true/false)", placeholder: "true", hint: "Si es false, no se mostrará el botón de descarga en la web." },
    ]},
    { key: "sections", type: "objectList", label: "Secciones del CV", itemSchema: [
      { key: "title", type: "text", label: "Título de la sección", placeholder: "Educación" },
      { key: "items", type: "stringList", label: "Elementos", placeholder: "Añadir un elemento..." },
    ]},
  ],
  contact: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "links", type: "objectList", label: "Enlaces de contacto", itemSchema: [
      { key: "label", type: "text", label: "Etiqueta", placeholder: "Correo" },
      { key: "value", type: "text", label: "Valor", placeholder: "alexis@example.com" },
      { key: "href", type: "text", label: "URL del enlace", placeholder: "mailto:..." },
      { key: "icon", type: "text", label: "Nombre del ícono", placeholder: "mail | linkedin | github | scholar | research" },
    ]},
  ],
};

export const SECTION_LABELS: Record<SectionId, string> = {
  home: "Inicio",
  about: "Acerca de",
  expertise: "Áreas de Experiencia",
  projects: "Proyectos",
  resources: "Recursos Académicos",
  library: "Biblioteca Técnica",
  teaching: "Portafolio Docente",
  cv: "CV",
  contact: "Contacto",
};
