import Image from "next/image";
import type { Project } from "@/data/projects";
import { isValidPagesUrl } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="project">
      <div className="project__media">
        <span className="project__chrome" aria-hidden="true">
          <span className="project__dot project__dot--red" />
          <span className="project__dot project__dot--yellow" />
          <span className="project__dot project__dot--green" />
        </span>
        <div className="project__shot">
          <Image
            className="project__image"
            src={project.image}
            alt={`Captura de ${project.name}`}
            width={1280}
            height={800}
            sizes="(min-width: 1100px) 45vw, (min-width: 768px) 72vw, 92vw"
          />
        </div>
      </div>
      <div className="project__body">
        <p className="project__index">{number}</p>
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
              className="project__link project__link--primary"
              href={project.pagesUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver sitio<span aria-hidden="true"> ›</span>
            </a>
          )}
          <a
            className="project__link"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Código<span aria-hidden="true"> ›</span>
          </a>
        </div>
      </div>
    </article>
  );
}
