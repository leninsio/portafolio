import { ProjectCarousel } from "@/components/ProjectCarousel";
import type { Project } from "@/data/projects";

type ProjectsSectionProps = {
  projects: readonly Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="section section--band" id="proyectos">
      <div className="band__inner">
        <h2 id="projects-title">Proyectos</h2>
        <p className="section__intro">
          Proyectos del curso, publicados en GitHub Pages.
        </p>
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
