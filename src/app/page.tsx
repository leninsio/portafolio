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
    <main className="page">
      <HeaderSection name={profile.name} role={profile.role} />
      <IntroSection text={profile.intro} />
      <SkillsSection groups={skillGroups} />
      <ProjectsSection projects={projects} />
      <ContactSection links={profile.contactLinks} />
    </main>
  );
}
