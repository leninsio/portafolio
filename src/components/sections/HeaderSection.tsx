"use client";

import { Fragment, type CSSProperties } from "react";
import { RotatingWords } from "@/components/RotatingWords";
import { useInView } from "@/hooks/useInView";
import styles from "./HeaderSection.module.css";

type HeaderSectionProps = {
  name: string;
  role: string;
  tagline: string;
};

const TAGLINE_PREFIX = "Productos web";
const TAGLINE_WORDS = ["rápidos", "accesibles", "fáciles de usar"] as const;

export function HeaderSection({ name, role, tagline }: HeaderSectionProps) {
  const words = name.split(" ");
  const { ref, inView } = useInView<HTMLElement>();
  const inview = inView ? "true" : "false";

  return (
    <header
      className={styles.hero}
      id="inicio"
      aria-labelledby="hero-title"
      ref={ref}
    >
      <span className={styles.bg} aria-hidden="true" data-inview={inview}>
        <span className={styles.backdrop} data-slot="hero-backdrop" />
        <span className={styles.fade} />
      </span>
      <div className={styles.content}>
        <p
          className={`${styles.eyebrow} ${styles.enter}`}
          style={{ "--enter-delay": "880ms" } as CSSProperties}
        >
          Portafolio
        </p>
        <h1 className={styles.name} id="hero-title">
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              {index > 0 ? " " : null}
              <span
                className={styles.word}
                style={{ "--word-index": `${index}` } as CSSProperties}
              >
                {word}
              </span>
            </Fragment>
          ))}
        </h1>
        <p
          className={`${styles.role} ${styles.enter}`}
          style={{ "--enter-delay": "960ms" } as CSSProperties}
        >
          {role}
        </p>
        <p
          className={`${styles.tagline} ${styles.enter}`}
          style={{ "--enter-delay": "1040ms" } as CSSProperties}
        >
          <RotatingWords
            prefix={TAGLINE_PREFIX}
            words={TAGLINE_WORDS}
            label={tagline}
          />
        </p>
        <div
          className={`${styles.actions} ${styles.enter}`}
          style={{ "--enter-delay": "1120ms" } as CSSProperties}
        >
          <a className="button" href="#proyectos">
            Ver proyectos
          </a>
          <a className={styles.cta} href="#contacto">
            Contáctame<span aria-hidden="true"> ›</span>
          </a>
        </div>
      </div>
      <a
        className={styles.scroll}
        href="#sobre-mi"
        aria-label="Ir a Sobre mí"
        data-inview={inview}
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </header>
  );
}
