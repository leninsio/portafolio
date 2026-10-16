import { ProjectCarousel } from "@/components/ProjectCarousel";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/data/projects";
import styles from "./ProjectsSection.module.css";

type ProjectsSectionProps = {
  projects: readonly Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="section section--band" id="proyectos">
      <div className={styles.inner}>
        <Reveal>
          <h2 id="projects-title">Proyectos</h2>
          <p className="section__intro">
            Proyectos del curso, publicados en GitHub Pages.
          </p>
        </Reveal>
        <Reveal startIndex={2}>
          <ProjectCarousel projects={projects} startIndex={2} />
        </Reveal>
      </div>
    </section>
  );
}
