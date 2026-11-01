import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsExplorer } from "@/components/sections/SkillsExplorer";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ArchitectureSimulator } from "@/components/sections/ArchitectureSimulator";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { EducationBento } from "@/components/sections/EducationBento";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { LayoutBackground } from "@/components/background/LayoutBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-clip pt-12 transition-colors duration-250">
      {/* GSAP-Powered Interactive Architectural Layout Background */}
      <LayoutBackground />

      {/* Hero Section: Narrative, Numbers Ticker & Architecture Telemetry Bento */}
      <HeroSection />

      {/* Skills Matrix: Individualized Spotlight Cards & Project Cross-Filters */}
      <Reveal>
        <SkillsExplorer />
      </Reveal>

      {/* Featured Production Projects: BorderBeam Showcase & Case Studies */}
      <Reveal>
        <ProjectsShowcase />
      </Reveal>

      {/* Interactive Architectural Deep-Dive Simulator: Row-Locks & WebSockets (Desktop & Tablet only) */}
      <div className="hidden md:block">
        <Reveal>
          <ArchitectureSimulator />
        </Reveal>
      </div>

      {/* Work Experience: Tracing Beam Career Timeline */}
      <Reveal>
        <ExperienceTimeline />
      </Reveal>

      {/* Education & Certifications Bento Grid */}
      <Reveal>
        <EducationBento />
      </Reveal>

      {/* Direct Engagement Contact Section & Developer Footer */}
      <Reveal>
        <ContactFooter />
      </Reveal>
    </main>
  );
}
