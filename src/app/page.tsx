import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsExplorer } from "@/components/sections/SkillsExplorer";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ArchitectureSimulator } from "@/components/sections/ArchitectureSimulator";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { EducationBento } from "@/components/sections/EducationBento";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] bg-grid-technical overflow-x-hidden pt-12 transition-colors duration-250">
      {/* Background radial illumination */}
      <div className="pointer-events-none absolute inset-0 bg-radial-fade bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.07),transparent)]" />

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

      {/* Interactive Architectural Deep-Dive Simulator: Row-Locks & WebSockets */}
      <Reveal>
        <ArchitectureSimulator />
      </Reveal>

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
