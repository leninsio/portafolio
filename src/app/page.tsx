import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

export default function Home() {
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
          <IntroSection text={profile.intro} />
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
