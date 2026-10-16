"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const sectionLinks = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Conocimientos", href: "#conocimientos" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
] as const;

const sectionIds = [
  "#inicio",
  "#sobre-mi",
  "#conocimientos",
  "#proyectos",
  "#contacto",
] as const;

export function SiteNav() {
  const [activeHref, setActiveHref] = useState<string>("#inicio");

  useEffect(() => {
    document.documentElement.classList.add("js-ready");
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const navHeight =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--nav-height",
          ),
        ) || 52;
      const threshold = navHeight + 24;
      let current = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top - threshold <= 1) {
          current = section;
        }
      }

      setActiveHref(`#${current.id}`);
    };

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <nav className="nav" aria-label="Principal">
      <div className="nav__inner">
        <a
          className="nav__brand"
          href="#inicio"
          aria-current={activeHref === "#inicio" ? "true" : undefined}
        >
          {profile.name}
        </a>
        <ul className="nav__list">
          {sectionLinks.map((link) => (
            <li key={link.href}>
              <a
                className="nav__link"
                href={link.href}
                aria-current={activeHref === link.href ? "true" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
