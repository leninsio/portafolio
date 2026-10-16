import Image from "next/image";
import type { Project } from "@/data/projects";
import { isValidPagesUrl } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={styles.project}>
      <div className={styles.media}>
        <span
          className={styles.chrome}
          aria-hidden="true"
          data-slot="project-chrome"
        >
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </span>
        <div className={styles.shot}>
          <Image
            className={styles.image}
            src={project.image}
            alt={`Captura de ${project.name}`}
            width={1280}
            height={800}
            sizes="(min-width: 1100px) 45vw, (min-width: 768px) 72vw, 92vw"
          />
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.index}>{number}</p>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className={styles.links}>
          {isValidPagesUrl(project.pagesUrl) && (
            <a
              className={`${styles.link} ${styles.linkPrimary}`}
              href={project.pagesUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver sitio<span aria-hidden="true"> ›</span>
            </a>
          )}
          <a
            className={styles.link}
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
