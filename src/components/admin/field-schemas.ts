// Esquemas de campos editables para cada sección.
// Controlan el editor genérico del admin — sin formularios escritos a mano.

import type { SectionId } from "@/lib/content-types";

export type FieldType = "text" | "textarea" | "stringList" | "objectList" | "header" | "image" | "file" | "color" | "select" | "reorderList";

export interface FieldSchema {
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  itemSchema?: FieldSchema[]; // para objectList
  hint?: string;
  options?: { value: string; label: string }[]; // para select
}

export const SECTION_SCHEMAS: Record<SectionId, FieldSchema[]> = {
  nav: [
    { key: "home", type: "text", label: "Nombre pestaña: Inicio", placeholder: "Inicio" },
    { key: "about", type: "text", label: "Nombre pestaña: Acerca de", placeholder: "Acerca de" },
    { key: "expertise", type: "text", label: "Nombre pestaña: Áreas de Experiencia", placeholder: "Áreas de Experiencia" },
    { key: "projects", type: "text", label: "Nombre pestaña: Proyectos", placeholder: "Proyectos" },
    { key: "resources", type: "text", label: "Nombre pestaña: Recursos Académicos", placeholder: "Recursos Académicos" },
    { key: "library", type: "text", label: "Nombre pestaña: Biblioteca Técnica", placeholder: "Biblioteca Técnica" },
    { key: "teaching", type: "text", label: "Nombre pestaña: Portafolio Docente", placeholder: "Portafolio Docente" },
    { key: "cv", type: "text", label: "Nombre pestaña: CV", placeholder: "CV" },
    { key: "contact", type: "text", label: "Nombre pestaña: Contacto", placeholder: "Contacto" },
  ],
  order: [
    { key: "sections", type: "reorderList", label: "Orden de las secciones", hint: "Usa las flechas ↑↓ para reordenar. Inicio (Home) siempre va primero y no se puede mover." },
  ],
  home: [
    { key: "eyebrow", type: "text", label: "Texto superior (eyebrow)", placeholder: "Portafolio Académico · Ingeniero Civil" },
    { key: "eyebrowColor", type: "color", label: "Color del texto superior" },
    { key: "title", type: "textarea", label: "Título principal", hint: "Usa {accent}palabra{/accent} para resaltar texto con el color de marca." },
    { key: "titleColor", type: "color", label: "Color del título" },
    { key: "subtitle", type: "textarea", label: "Subtítulo / descripción" },
    { key: "subtitleColor", type: "color", label: "Color del subtítulo" },
    { key: "profileImage", type: "image", label: "Imagen de perfil (circular)" },
    { key: "profileName", type: "text", label: "Nombre", placeholder: "Alexis" },
    { key: "profileNameColor", type: "color", label: "Color del nombre" },
    { key: "profileRole", type: "text", label: "Cargo / profesión", placeholder: "Ingeniero Civil" },
    { key: "profileRoleColor", type: "color", label: "Color del cargo" },
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
    { key: "quickFacts", type: "objectList", label: "Datos rápidos (Quick Facts)", hint: "Aparece en la columna derecha de la sección About.", itemSchema: [
      { key: "label", type: "text", label: "Etiqueta", placeholder: "Rol actual" },
      { key: "value", type: "text", label: "Valor", placeholder: "Ingeniero Civil" },
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
      { key: "category", type: "text", label: "Categoría / Temática", placeholder: "Ej: Análisis Matricial, Dinámica Estructural, Diseño Sísmico...", hint: "Los proyectos se agrupan automáticamente por esta categoría en la web." },
      { key: "coverImage", type: "image", label: "Imagen de portada del proyecto" },
      { key: "area", type: "text", label: "Área", placeholder: "Análisis Matricial Estructural" },
      { key: "level", type: "text", label: "Nivel", placeholder: "Principiante | Intermedio | Avanzado | Investigación" },
      { key: "abstract", type: "textarea", label: "Resumen" },
      { key: "tech", type: "stringList", label: "Tecnologías", placeholder: "MATLAB, Python..." },
      { key: "sections", type: "objectList", label: "Secciones de detalle", itemSchema: [
        { key: "heading", type: "text", label: "Encabezado", placeholder: "Planteamiento del problema" },
        { key: "body", type: "textarea", label: "Contenido" },
      ]},
      { key: "files", type: "objectList", label: "Archivos", itemSchema: [
        { key: "name", type: "text", label: "Nombre visible", placeholder: "solver.py" },
        { key: "url", type: "file", label: "Archivo (subir)" },
        { key: "viewMode", type: "select", label: "Modo de visualización", hint: "Controla cómo se muestra el archivo en la web pública.", options: [
          { value: "none", label: "Oculto (no mostrar)" },
          { value: "view", label: "Solo ver (previsualizar sin descarga)" },
          { value: "download", label: "Ver y descargar" },
        ]},
      ]},
      { key: "references", type: "stringList", label: "Referencias", placeholder: "Autor, Título..." },
    ]},
  ],
  resources: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "resources", type: "objectList", label: "Recursos", itemSchema: [
      { key: "title", type: "text", label: "Título" },
      { key: "category", type: "text", label: "Categoría / Temática", hint: "Los recursos se agrupan por esta categoría." },
      { key: "coverImage", type: "image", label: "Imagen de portada" },
      { key: "level", type: "text", label: "Nivel", placeholder: "Principiante | Intermedio | Avanzado | Investigación" },
      { key: "type", type: "text", label: "Tipo", placeholder: "video | PDF | código | plantilla | manual | ejemplo" },
      { key: "duration", type: "text", label: "Duración", placeholder: "1.5 h" },
      { key: "description", type: "textarea", label: "Descripción" },
      { key: "prerequisites", type: "text", label: "Requisitos previos" },
      { key: "objectives", type: "textarea", label: "Objetivos" },
      { key: "files", type: "objectList", label: "Archivos (carpeta)", hint: "Añade todos los archivos que quieras a este recurso.", itemSchema: [
        { key: "name", type: "text", label: "Nombre visible", placeholder: "documento.pdf" },
        { key: "url", type: "file", label: "Archivo (subir)" },
        { key: "viewMode", type: "select", label: "Modo de visualización", options: [
          { value: "none", label: "Oculto (no mostrar)" },
          { value: "view", label: "Solo ver" },
          { value: "download", label: "Ver y descargar" },
        ]},
      ]},
    ]},
  ],
  library: [
    { key: "header", type: "header", label: "Encabezado de la sección" },
    { key: "items", type: "objectList", label: "Documentos", itemSchema: [
      { key: "title", type: "text", label: "Título" },
      { key: "type", type: "text", label: "Tipo", placeholder: "Apuntes | Informes técnicos | ..." },
      { key: "area", type: "text", label: "Área / Categoría", hint: "Los documentos se agrupan por esta área." },
      { key: "coverImage", type: "image", label: "Imagen de portada" },
      { key: "level", type: "text", label: "Nivel" },
      { key: "software", type: "text", label: "Software" },
      { key: "language", type: "text", label: "Idioma" },
      { key: "date", type: "text", label: "Fecha", placeholder: "2024-03-12" },
      { key: "files", type: "objectList", label: "Archivos (carpeta)", hint: "Añade todos los archivos que quieras a este documento.", itemSchema: [
        { key: "name", type: "text", label: "Nombre visible", placeholder: "documento.pdf" },
        { key: "url", type: "file", label: "Archivo (subir)" },
        { key: "viewMode", type: "select", label: "Modo de visualización", options: [
          { value: "none", label: "Oculto (no mostrar)" },
          { value: "view", label: "Solo ver (previsualizar sin descarga)" },
          { value: "download", label: "Ver y descargar" },
        ]},
      ]},
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
      { key: "viewMode", type: "select", label: "Modo de visualización", hint: "Controla cómo se muestra el documento en la web.", options: [
        { value: "none", label: "Oculto (no mostrar)" },
        { value: "view", label: "Solo ver (previsualizar sin descarga)" },
        { value: "download", label: "Ver y descargar" },
      ]},
    ]},
    { key: "sections", type: "objectList", label: "Secciones del CV", itemSchema: [
      { key: "title", type: "text", label: "Título de la sección", placeholder: "Educación" },
      { key: "items", type: "stringList", label: "Elementos", placeholder: "Añadir un elemento..." },
    ]},
    { key: "timeline", type: "objectList", label: "Línea de tiempo", hint: "Aparece como una línea de tiempo vertical con nodos y fechas.", itemSchema: [
      { key: "title", type: "text", label: "Título", placeholder: "Ingeniero Civil" },
      { key: "date", type: "text", label: "Fecha / Período", placeholder: "2020 - 2024" },
      { key: "description", type: "textarea", label: "Descripción" },
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
  nav: "Navegación",
  order: "Orden de secciones",
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
