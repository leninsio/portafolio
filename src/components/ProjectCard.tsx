import Image from "next/image";
import type { Project } from "@/data/projects";
import { isValidPagesUrl } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project">
      <div className="project__media">
        <Image
          className="project__image"
          src={project.image}
          alt={`Captura de ${project.name}`}
          width={1280}
          height={800}
          sizes="(min-width: 1100px) 30vw, (min-width: 768px) 45vw, 92vw"
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
    </article>
  );
}
