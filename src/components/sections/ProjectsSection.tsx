import Image from "next/image";
import type { Project } from "@/data/projects";
import { isValidPagesUrl } from "@/lib/projects";

type ProjectsSectionProps = {
  projects: readonly Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="section" id="proyectos" aria-labelledby="projects-title">
      <h2 id="projects-title">Proyectos</h2>
      <ul className="projects">
        {projects.map((project) => (
          <li className="project" key={project.slug}>
            <div className="project__media">
              <Image
                className="project__image"
                src={project.image}
                alt={`Captura de ${project.name}`}
                width={1280}
                height={800}
                sizes="(min-width: 1024px) 30vw, (min-width: 680px) 45vw, 92vw"
              />
            </div>
            <div className="project__body">
              <h3 className="project__name">{project.name}</h3>
              <p className="project__description">{project.description}</p>
              <ul className="project__tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="project__links">
                {isValidPagesUrl(project.pagesUrl) && (
                  <a
                    className="button button--ghost"
                    href={project.pagesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver sitio
                  </a>
                )}
                <a
                  className="button button--ghost"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Código
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
