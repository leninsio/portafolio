import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { principles } from "@/data/principles";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { buildAboutStats } from "@/lib/stats";

export default function Home() {
  const stats = buildAboutStats(projects, skillGroups);

  return (
    <>
      <SiteNav />
      <main className="page">
        <HeaderSection
          name={profile.name}
          role={profile.role}
          tagline={profile.tagline}
        />
        <Reveal>
          <AboutSection
            text={profile.intro}
            principles={principles}
            stats={stats}
          />
        </Reveal>
        <Reveal>
          <SkillsSection groups={skillGroups} />
        </Reveal>
        <Reveal>
          <ProjectsSection projects={projects} />
        </Reveal>
        <Reveal>
          <ContactSection links={profile.contactLinks} />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
