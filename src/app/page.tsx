import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsExplorer } from "@/components/sections/SkillsExplorer";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ArchitectureSimulator } from "@/components/sections/ArchitectureSimulator";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#070a12] text-[#f8fafc] bg-grid-technical overflow-hidden pt-12">
      {/* Background radial gradient glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-fade bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.18),rgba(7,10,18,0))]" />

      {/* Hero Section */}
      <HeroSection />

      {/* Skills & Tools Matrix Explorer */}
      <SkillsExplorer />

      {/* Featured Production Projects */}
      <ProjectsShowcase />

      {/* Interactive Architectural Deep-Dive Simulator */}
      <ArchitectureSimulator />

      {/* Target section anchors for upcoming phases */}
      <div id="experience" className="py-2" />
      <div id="education" className="py-2" />
      <div id="contact" className="py-2" />
    </main>
  );
}
