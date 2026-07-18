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
  | "contact";

// ---- Generic section header (eyebrow + title + description) ----
export interface SectionHeader {
  eyebrow: string;
  title: string;
  description: string;
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
}

// ---- About ----
export interface AboutStat {
  id: string;
  value: string;
  label: string;
}
export interface AboutData {
  header: SectionHeader;
  bio: string;
  highlights: string[];
  stats: AboutStat[];
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
export interface ProjectItem {
  id: string;
  title: string;
  abstract: string;
  area: string;
  tech: string[];
  level: string;
  sections: { heading: string; body: string }[];
  files: string[];
  references: string[];
}
export interface ProjectsData {
  header: SectionHeader;
  projects: ProjectItem[];
}

// ---- Open Academic Resources ----
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
}
export interface ResourcesData {
  header: SectionHeader;
  resources: ResourceItem[];
}

// ---- Technical Library ----
export interface LibraryItem {
  id: string;
  title: string;
  type: string;
  area: string;
  level: string;
  software: string;
  language: string;
  date: string;
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
export interface TeachingData {
  header: SectionHeader;
  items: TeachingItem[];
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
  downloadable: string; // "true" | "false"
}
export interface CvData {
  header: SectionHeader;
  downloads: CvDownload[];
  sections: CvSection[];
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
  home: {
    eyebrow: "Academic Portfolio · Civil Engineer",
    title: "Structural Engineering, {accent}Earthquake Engineering{/accent} and {accent}Computational Tools{/accent}",
    description: "",
  },
  about: {
    eyebrow: "About",
    title: "Civil engineer building bridges between theory, computation and practice",
    description: "A focus on advanced structural engineering, computational tools and engineering education.",
  },
  expertise: {
    eyebrow: "Areas of Expertise",
    title: "Domains of modern structural engineering",
    description: "Each area links theory, computation and engineering practice.",
  },
  projects: {
    eyebrow: "Projects",
    title: "Documented work bridging theory, modeling and code",
    description:
      "Each project combines a clear problem statement, methodology, theoretical background, computational implementation and reproducible results.",
  },
  resources: {
    eyebrow: "Open Academic Resources",
    title: "A free library for engineering education and capacity building",
    description:
      "Open academic resources in structural engineering, earthquake engineering, computational modeling, and seismic risk assessment.",
  },
  library: {
    eyebrow: "Technical Library",
    title: "An ordered repository of documents, notes and references",
    description: "Filter by area, level, type, software, language and date.",
  },
  teaching: {
    eyebrow: "Teaching Portfolio",
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
    eyebrow: "Contact",
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
      return { header, bio: "", highlights: [], stats: [] };
    case "expertise":
      return { header, areas: [] };
    case "projects":
      return { header, projects: [] };
    case "resources":
      return { header, resources: [] };
    case "library":
      return { header, items: [] };
    case "teaching":
      return { header, items: [] };
    case "cv":
      return { header, downloads: [], sections: [] };
    case "contact":
      return { header, links: [] };
  }
}
