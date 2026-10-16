export type Project = {
  slug: string;
  name: string;
  description: string;
  tags: readonly string[];
  image: string;
  pagesUrl: string;
  repoUrl: string;
};

export const projects: readonly Project[] = [
  {
    slug: "cv-html-semantico",
    name: "CV en HTML semántico",
    description:
      "Mi currículum maquetado con HTML semántico. Primer proyecto del curso.",
    tags: ["HTML"],
    image: "/projects/cv-html-semantico.png",
    pagesUrl:
      "https://leninsio.github.io/Proyecto-HTML-SEMANTICO-LENIN-ALVARADO/",
    repoUrl:
      "https://github.com/leninsio/Proyecto-HTML-SEMANTICO-LENIN-ALVARADO",
  },
  {
    slug: "starlink",
    name: "Copia de Starlink",
    description: "Réplica de la página de Starlink con HTML y CSS.",
    tags: ["HTML", "CSS"],
    image: "/projects/starlink.png",
    pagesUrl: "https://leninsio.github.io/copia-starlink-lexpin/proyectos/starlink/",
    repoUrl: "https://github.com/leninsio/copia-starlink-lexpin",
  },
  {
    slug: "youtube",
    name: "Copia de YouTube",
    description: "Réplica de la página de inicio de YouTube con HTML y CSS.",
    tags: ["HTML", "CSS"],
    image: "/projects/youtube.png",
    pagesUrl: "https://leninsio.github.io/COPIA-YOUTUBE/",
    repoUrl: "https://github.com/leninsio/COPIA-YOUTUBE",
  },
  {
    slug: "cinex",
    name: "Rediseño de Cinex",
    description:
      "Rediseño de la página principal de Cinex Venezuela con Tailwind CSS v4 y animaciones AOS.",
    tags: ["HTML", "Tailwind CSS", "AOS"],
    image: "/projects/cinex.png",
    pagesUrl: "https://leninsio.github.io/cinex-rediseno-proyecto-lexpin/",
    repoUrl: "https://github.com/leninsio/cinex-rediseno-proyecto-lexpin",
  },
  {
    slug: "ejercicios-js",
    name: "Formulario de registro en JavaScript",
    description:
      "Formulario de registro de estudiantes con validación en JavaScript, parte de mis ejercicios de JS y POO.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/projects/ejercicios-js.png",
    pagesUrl:
      "https://leninsio.github.io/ejercicios-js-lexpin/formulario%20de%20registro%20tarea/formulario.html",
    repoUrl: "https://github.com/leninsio/ejercicios-js-lexpin",
  },
  {
    slug: "rick-morty",
    name: "Rick & Morty",
    description:
      "Sitio de personajes de Rick & Morty con detalle, favoritos, inicio de sesión y registro.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/projects/rick-morty.png",
    pagesUrl: "https://leninsio.github.io/proyecto-rick-morty/",
    repoUrl: "https://github.com/leninsio/proyecto-rick-morty",
  },
];
