"use client";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type UIEvent,
} from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { clampIndex, nextIndex, prevIndex } from "@/lib/carousel";
import type { Project } from "@/data/projects";

type ProjectCarouselProps = {
  projects: readonly Project[];
};

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const total = projects.length;
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;

    if (!track || !slide || typeof track.scrollTo !== "function") {
      return;
    }

    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const target = clampIndex(index, total);
      setActive(target);
      scrollToIndex(target);
    },
    [total, scrollToIndex],
  );

  const handleScroll = useCallback(
    (event: UIEvent<HTMLUListElement>) => {
      const track = event.currentTarget;
      let closest = 0;
      let smallest = Number.POSITIVE_INFINITY;

      for (let i = 0; i < track.children.length; i += 1) {
        const slide = track.children[i] as HTMLElement;
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft);

        if (distance < smallest) {
          smallest = distance;
          closest = i;
        }
      }

      setActive(clampIndex(closest, total));
    },
    [total],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(nextIndex(active, total));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(prevIndex(active, total));
      }
    },
    [active, total, goTo],
  );

  if (total === 0) {
    return null;
  }

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Proyectos"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <ul className="carousel__track" ref={trackRef} onScroll={handleScroll}>
        {projects.map((project, index) => (
          <li
            className={`carousel__slide${index === active ? " is-active" : ""}`}
            key={project.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${total}`}
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <div className="carousel__controls">
        <div className="carousel__dots">
          {projects.map((project, index) => (
            <button
              type="button"
              className="carousel__dot"
              key={project.slug}
              aria-label={`Ir al proyecto ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <div className="carousel__buttons">
          <button
            type="button"
            className="carousel__nav"
            aria-label="Anterior"
            onClick={() => goTo(prevIndex(active, total))}
            disabled={active === 0}
          >
            <span aria-hidden="true">‹</span>
          </button>

          <button
            type="button"
            className="carousel__nav"
            aria-label="Siguiente"
            onClick={() => goTo(nextIndex(active, total))}
            disabled={active === total - 1}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
