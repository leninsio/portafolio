"use client";

import { Fragment, type CSSProperties } from "react";
import { RotatingWords } from "@/components/RotatingWords";
import { useInView } from "@/hooks/useInView";

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
      className="hero"
      id="inicio"
      aria-labelledby="hero-title"
      ref={ref}
    >
      <span className="hero__bg" aria-hidden="true" data-inview={inview}>
        <span className="hero__backdrop" />
        <span className="hero__fade" />
      </span>
      <div className="hero__content">
        <p
          className="hero__eyebrow hero__enter"
          style={{ "--enter-delay": "880ms" } as CSSProperties}
        >
          Portafolio
        </p>
        <h1 className="hero__name" id="hero-title">
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              {index > 0 ? " " : null}
              <span
                className="hero__word"
                style={{ "--word-index": `${index}` } as CSSProperties}
              >
                {word}
              </span>
            </Fragment>
          ))}
        </h1>
        <p
          className="hero__role hero__enter"
          style={{ "--enter-delay": "960ms" } as CSSProperties}
        >
          {role}
        </p>
        <p
          className="hero__tagline hero__enter"
          style={{ "--enter-delay": "1040ms" } as CSSProperties}
        >
          <RotatingWords
            prefix={TAGLINE_PREFIX}
            words={TAGLINE_WORDS}
            label={tagline}
          />
        </p>
        <div
          className="hero__actions hero__enter"
          style={{ "--enter-delay": "1120ms" } as CSSProperties}
        >
          <a className="button" href="#proyectos">
            Ver proyectos
          </a>
          <a className="hero__cta" href="#contacto">
            Contáctame<span aria-hidden="true"> ›</span>
          </a>
        </div>
      </div>
      <a
        className="hero__scroll"
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
