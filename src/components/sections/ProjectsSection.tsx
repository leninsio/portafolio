import Image from "next/image";
import type { Project } from "@/data/projects";
import { isValidPagesUrl } from "@/lib/projects";

type ProjectsSectionProps = {
  projects: readonly Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="card" id="proyectos" aria-labelledby="projects-title">
      <h2 id="projects-title">Proyectos</h2>
      {projects.length === 0 ? (
        <p className="pending">PENDIENTE: agrega tus proyectos del curso</p>
      ) : (
        <ul className="projects">
          {projects.map((project) => (
            <li className="project" key={project.name}>
              <Image
                className="project__image"
                src={project.image}
                alt={project.name}
                width={640}
                height={360}
              />
              <h3 className="project__name">{project.name}</h3>
              <p className="project__description">{project.description}</p>
              {isValidPagesUrl(project.pagesUrl) ? (
                <a className="project__link" href={project.pagesUrl}>
                  Ver {project.name} en GitHub Pages
                </a>
              ) : (
                <p className="pending">PENDIENTE: enlace a GitHub Pages</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
