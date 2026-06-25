import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExpertiseSection } from "@/components/sections/expertise";
import { ProjectsSection } from "@/components/sections/projects";
import { ToolsSection } from "@/components/sections/tools";
import { ResourcesSection } from "@/components/sections/resources";
import { CoursesSection } from "@/components/sections/courses";
import { LibrarySection } from "@/components/sections/library";
import { ForumSection } from "@/components/sections/forum";
import { TeachingSection } from "@/components/sections/teaching";
import { ResearchSection } from "@/components/sections/research";
import { CvSection } from "@/components/sections/cv";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-surface">
      {/* Skip to content (a11y) */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <ToolsSection />
        <ResourcesSection />
        <CoursesSection />
        <LibrarySection />
        <ForumSection />
        <TeachingSection />
        <ResearchSection />
        <CvSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
