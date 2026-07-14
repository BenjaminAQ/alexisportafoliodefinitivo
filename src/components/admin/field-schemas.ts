// Editable field schemas for each section.
// Drives the generic admin editor — no hand-written forms per section.

import type { SectionId } from "@/lib/content-types";

export type FieldType = "text" | "textarea" | "stringList" | "objectList" | "header";

export interface FieldSchema {
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  itemSchema?: FieldSchema[]; // for objectList
}

export const SECTION_SCHEMAS: Record<SectionId, FieldSchema[]> = {
  about: [
    { key: "header", type: "header", label: "Section header" },
    { key: "bio", type: "textarea", label: "Bio", placeholder: "Your professional biography..." },
    { key: "highlights", type: "stringList", label: "Highlights", placeholder: "Add a highlight..." },
    { key: "stats", type: "objectList", label: "Stats", itemSchema: [
      { key: "value", type: "text", label: "Value", placeholder: "8+" },
      { key: "label", type: "text", label: "Label", placeholder: "Years of experience" },
    ]},
  ],
  expertise: [
    { key: "header", type: "header", label: "Section header" },
    { key: "areas", type: "objectList", label: "Areas", itemSchema: [
      { key: "number", type: "text", label: "Number", placeholder: "01" },
      { key: "title", type: "text", label: "Title", placeholder: "Matrix Structural Analysis" },
      { key: "icon", type: "text", label: "Icon name", placeholder: "matrix | mesh | curve | wave | building | target | globe" },
      { key: "description", type: "textarea", label: "Description" },
      { key: "topics", type: "stringList", label: "Topics", placeholder: "Add a topic..." },
      { key: "materials", type: "textarea", label: "Available material" },
    ]},
  ],
  projects: [
    { key: "header", type: "header", label: "Section header" },
    { key: "projects", type: "objectList", label: "Projects", itemSchema: [
      { key: "title", type: "text", label: "Title", placeholder: "Matrix Analysis Solver" },
      { key: "area", type: "text", label: "Area", placeholder: "Matrix Structural Analysis" },
      { key: "level", type: "text", label: "Level", placeholder: "Beginner | Intermediate | Advanced | Research-oriented" },
      { key: "abstract", type: "textarea", label: "Abstract" },
      { key: "tech", type: "stringList", label: "Technologies", placeholder: "MATLAB, Python..." },
      { key: "sections", type: "objectList", label: "Detail sections", itemSchema: [
        { key: "heading", type: "text", label: "Heading", placeholder: "Problem statement" },
        { key: "body", type: "textarea", label: "Body" },
      ]},
      { key: "files", type: "stringList", label: "Files", placeholder: "solver.py..." },
      { key: "references", type: "stringList", label: "References", placeholder: "Author, Title..." },
    ]},
  ],
  resources: [
    { key: "header", type: "header", label: "Section header" },
    { key: "resources", type: "objectList", label: "Resources", itemSchema: [
      { key: "title", type: "text", label: "Title" },
      { key: "category", type: "text", label: "Category" },
      { key: "level", type: "text", label: "Level", placeholder: "Beginner | Intermediate | Advanced | Research-oriented" },
      { key: "type", type: "text", label: "Type", placeholder: "video | PDF | code | template | manual | example" },
      { key: "duration", type: "text", label: "Duration", placeholder: "1.5 h" },
      { key: "description", type: "textarea", label: "Description" },
      { key: "prerequisites", type: "text", label: "Prerequisites" },
      { key: "objectives", type: "textarea", label: "Objectives" },
    ]},
  ],
  library: [
    { key: "header", type: "header", label: "Section header" },
    { key: "items", type: "objectList", label: "Documents", itemSchema: [
      { key: "title", type: "text", label: "Title" },
      { key: "type", type: "text", label: "Type", placeholder: "Lecture notes | Technical reports | ..." },
      { key: "area", type: "text", label: "Area" },
      { key: "level", type: "text", label: "Level" },
      { key: "software", type: "text", label: "Software" },
      { key: "language", type: "text", label: "Language" },
      { key: "date", type: "text", label: "Date", placeholder: "2024-03-12" },
    ]},
  ],
  teaching: [
    { key: "header", type: "header", label: "Section header" },
    { key: "items", type: "objectList", label: "Teaching items", itemSchema: [
      { key: "title", type: "text", label: "Title" },
      { key: "icon", type: "text", label: "Icon name", placeholder: "book | layers | code | users | target" },
      { key: "body", type: "textarea", label: "Body" },
    ]},
  ],
  cv: [
    { key: "header", type: "header", label: "Section header" },
    { key: "sections", type: "objectList", label: "CV sections", itemSchema: [
      { key: "title", type: "text", label: "Section title", placeholder: "Education" },
      { key: "items", type: "stringList", label: "Items", placeholder: "Add an item..." },
    ]},
  ],
  contact: [
    { key: "header", type: "header", label: "Section header" },
    { key: "links", type: "objectList", label: "Contact links", itemSchema: [
      { key: "label", type: "text", label: "Label", placeholder: "Email" },
      { key: "value", type: "text", label: "Value", placeholder: "alexis@example.com" },
      { key: "href", type: "text", label: "Link URL", placeholder: "mailto:..." },
      { key: "icon", type: "text", label: "Icon name", placeholder: "mail | linkedin | github | scholar | research" },
    ]},
  ],
};

export const SECTION_LABELS: Record<SectionId, string> = {
  about: "About",
  expertise: "Areas of Expertise",
  projects: "Projects",
  resources: "Open Academic Resources",
  library: "Technical Library",
  teaching: "Teaching Portfolio",
  cv: "CV",
  contact: "Contact",
};
