import { ProjectCarousel } from "@/components/ProjectCarousel";
import type { Project } from "@/data/projects";

type ProjectsSectionProps = {
  projects: readonly Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="section" id="proyectos">
      <h2 id="projects-title">Proyectos</h2>
      <ProjectCarousel projects={projects} />
    </section>
  );
}
