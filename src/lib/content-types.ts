// Editable content data types for each section.
// All dynamic content is stored in Firestore (or localStorage fallback)
// and edited via the /admin panel.

export type SectionId =
  | "home"
  | "about"
  | "expertise"
  | "projects"
  | "resources"
  | "library"
  | "teaching"
  | "cv"
  | "contact"
  | "nav"
  | "order";

// ---- Nav labels (editable) ----
export interface NavLabels {
  home: string;
  about: string;
  expertise: string;
  projects: string;
  resources: string;
  library: string;
  teaching: string;
  cv: string;
  contact: string;
}

// ---- Section order (reorderable) ----
export interface SectionOrderData {
  sections: string[]; // ordered list of section IDs (excluding "home" which is always first)
}

// ---- Generic section header (eyebrow + title + description + colors) ----
export interface SectionHeader {
  eyebrow: string;
  title: string;
  description: string;
  eyebrowColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

// ---- Home (hero) ----
export interface HomeData {
  eyebrow: string;
  title: string;          // can contain markup like "{accent}word{/accent}"
  subtitle: string;
  profileImage: string;   // URL (Storage download URL or data URL) — circular image
  profileImagePath: string; // storage path for deletion
  profileName: string;    // e.g. "Alexis"
  profileRole: string;    // e.g. "Civil Engineer"
  ctaButtons: { id: string; label: string; target: string; primary: boolean }[];
  eyebrowColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  profileNameColor?: string;
  profileRoleColor?: string;
}

// ---- About ----
export interface AboutStat {
  id: string;
  value: string;
  label: string;
}
export interface QuickFact {
  id: string;
  label: string;
  value: string;
}
export interface AboutData {
  header: SectionHeader;
  bio: string;
  highlights: string[];
  stats: AboutStat[];
  quickFacts: QuickFact[];
}

// ---- Areas of Expertise ----
export interface AreaItem {
  id: string;
  number: string;
  title: string;
  description: string;
  topics: string[];
  materials: string;
  icon: string;
}
export interface ExpertiseData {
  header: SectionHeader;
  areas: AreaItem[];
}

// ---- Projects ----
export interface ProjectFile {
  id: string;
  name: string;
  url: string;
  viewMode?: string; // "none" | "view" | "download"
}
export interface ProjectItem {
  id: string;
  title: string;
  abstract: string;
  area: string;
  category: string; // categoría/temática para agrupar
  tech: string[];
  level: string;
  coverImage: string; // URL de imagen de portada
  sections: { heading: string; body: string }[];
  files: ProjectFile[];
  references: string[];
}
export interface ProjectsData {
  header: SectionHeader;
  projects: ProjectItem[];
}

// ---- Open Academic Resources ----
export interface ResourceFile {
  id: string;
  name: string;
  url: string;
  viewMode?: string;
}
export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  type: string;
  prerequisites: string;
  objectives: string;
  file?: string;
  viewMode?: string;
  files?: ResourceFile[]; // múltiples archivos (carpeta)
  coverImage?: string; // imagen de portada
}
export interface ResourcesData {
  header: SectionHeader;
  resources: ResourceItem[];
}

// ---- Technical Library ----
export interface LibraryFile {
  id: string;
  name: string;
  url: string;
  viewMode?: string;
}
export interface LibraryItem {
  id: string;
  title: string;
  type: string;
  area: string;
  level: string;
  software: string;
  language: string;
  date: string;
  file?: string;
  viewMode?: string;
  files?: LibraryFile[]; // múltiples archivos (carpeta)
  coverImage?: string; // imagen de portada
}
export interface LibraryData {
  header: SectionHeader;
  items: LibraryItem[];
}

// ---- Teaching Portfolio ----
export interface TeachingItem {
  id: string;
  icon: string;
  title: string;
  body: string;
}
export interface TeachingActivity {
  id: string;
  title: string;
  date: string;
  description: string;
}
export interface TeachingData {
  header: SectionHeader;
  items: TeachingItem[];
  activities: TeachingActivity[];
}

// ---- CV ----
export interface CvSection {
  id: string;
  title: string;
  items: string[];
}
export interface CvDownload {
  id: string;
  label: string;
  file: string;      // URL del archivo en Storage
  viewMode?: string; // "none" | "view" | "download"
}
export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
}
export interface CvData {
  header: SectionHeader;
  downloads: CvDownload[];
  sections: CvSection[];
  timeline: TimelineItem[];
}

// ---- Contact ----
export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: string;
}
export interface ContactData {
  header: SectionHeader;
  links: ContactLink[];
}

// ---- Union ----
export type SectionData =
  | NavLabels
  | SectionOrderData
  | HomeData
  | AboutData
  | ExpertiseData
  | ProjectsData
  | ResourcesData
  | LibraryData
  | TeachingData
  | CvData
  | ContactData;

// ---- Default headers (shown until admin edits them) ----
export const DEFAULT_HEADERS: Record<SectionId, SectionHeader> = {
  nav: { eyebrow: "", title: "", description: "" },
  order: { eyebrow: "", title: "", description: "" },
  home: {
    eyebrow: "Portafolio Académico · Ingeniero Civil",
    title: "Structural Engineering, {accent}Earthquake Engineering{/accent} and {accent}Computational Tools{/accent}",
    description: "",
  },
  about: {
    eyebrow: "Acerca de",
    title: "Civil engineer building bridges between theory, computation and practice",
    description: "A focus on advanced structural engineering, computational tools and engineering education.",
  },
  expertise: {
    eyebrow: "Áreas de Experiencia",
    title: "Domains of modern structural engineering",
    description: "Each area links theory, computation and engineering practice.",
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Documented work bridging theory, modeling and code",
    description:
      "Each project combines a clear problem statement, methodology, theoretical background, computational implementation and reproducible results.",
  },
  resources: {
    eyebrow: "Recursos Académicos",
    title: "A free library for engineering education and capacity building",
    description:
      "Open academic resources in structural engineering, earthquake engineering, computational modeling, and seismic risk assessment.",
  },
  library: {
    eyebrow: "Biblioteca Técnica",
    title: "An ordered repository of documents, notes and references",
    description: "Filter by area, level, type, software, language and date.",
  },
  teaching: {
    eyebrow: "Portafolio Docente",
    title: "Teaching that makes advanced engineering accessible and rigorous",
    description:
      "Making advanced structural engineering concepts accessible through rigorous explanations, step-by-step examples, computational tools, and professionally documented technical material.",
  },
  cv: {
    eyebrow: "CV",
    title: "Academic curriculum vitae, available online and as PDF",
    description:
      "A complete overview of education, research interests, teaching, projects, computational tools, software skills and references.",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Let's talk about structures, code or research",
    description:
      "Use the form for technical questions, collaboration proposals, teaching invitations or feedback on the open resources.",
  },
};

// ---- Empty data templates (used when no data exists yet) ----
export function emptySectionData(id: SectionId): SectionData {
  const header = DEFAULT_HEADERS[id];
  switch (id) {
    case "home":
      return {
        eyebrow: header.eyebrow,
        title: header.title,
        subtitle: "Civil engineer focused on matrix structural analysis, finite element modeling, nonlinear structural analysis, structural dynamics, seismic design of concrete and steel structures, performance-based earthquake engineering, and seismic risk assessment.",
        profileImage: "",
        profileImagePath: "",
        profileName: "Alexis",
        profileRole: "Civil Engineer",
        ctaButtons: [
          { id: "b1", label: "View Projects", target: "#projects", primary: true },
          { id: "b2", label: "Explore Open Resources", target: "#resources", primary: false },
          { id: "b3", label: "Download CV", target: "#cv", primary: false },
          { id: "b4", label: "Contact", target: "#contact", primary: false },
        ],
      };
    case "about":
      return { header, bio: "", highlights: [], stats: [], quickFacts: [] };
    case "expertise":
      return { header, areas: [] };
    case "projects":
      return { header, projects: [] };
    case "resources":
      return { header, resources: [] };
    case "library":
      return { header, items: [] };
    case "teaching":
      return { header, items: [], activities: [] };
    case "cv":
      return { header, downloads: [], sections: [], timeline: [] };
    case "contact":
      return { header, links: [] };
    case "nav":
      return {
        home: "Home",
        about: "About",
        expertise: "Areas of Expertise",
        projects: "Projects",
        resources: "Open Academic Resources",
        library: "Technical Library",
        teaching: "Teaching Portfolio",
        cv: "CV",
        contact: "Contact",
      };
    case "order":
      return {
        sections: ["about", "expertise", "projects", "resources", "library", "teaching", "cv", "contact"],
      };
  }
}
