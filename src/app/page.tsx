"use client";

import * as React from "react";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { LoadingScreen } from "@/components/portfolio/loading-screen";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExpertiseSection } from "@/components/sections/expertise";
import { ProjectsSection } from "@/components/sections/projects";
import { ResourcesSection } from "@/components/sections/resources";
import { LibrarySection } from "@/components/sections/library";
import { TeachingSection } from "@/components/sections/teaching";
import { CvSection } from "@/components/sections/cv";
import { ContactSection } from "@/components/sections/contact";
import { useSectionData } from "@/components/admin/use-section-data";
import type { SectionOrderData } from "@/lib/content-types";

// Map of section ID → component
const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  about: AboutSection,
  expertise: ExpertiseSection,
  projects: ProjectsSection,
  resources: ResourcesSection,
  library: LibrarySection,
  teaching: TeachingSection,
  cv: CvSection,
  contact: ContactSection,
};

const DEFAULT_ORDER = ["about", "expertise", "projects", "resources", "library", "teaching", "cv", "contact"];

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const { data: orderData } = useSectionData<SectionOrderData>("order");
  const order = (orderData?.sections && orderData.sections.length > 0) ? orderData.sections : DEFAULT_ORDER;

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main className="flex-1">
        <HeroSection />
        {order.map((sectionId) => {
          const Component = SECTION_COMPONENTS[sectionId];
          if (!Component) return null;
          return <Component key={sectionId} />;
        })}
      </main>

      <Footer />
    </div>
  );
}
