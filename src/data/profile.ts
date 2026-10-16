export type ContactIconId = "mail" | "linkedin" | "github";

export type ContactLink = {
  label: string;
  value?: string;
  href?: string;
  icon?: ContactIconId;
  placeholder?: boolean;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  contactLinks: readonly ContactLink[];
};

export const profile: Profile = {
  name: "Lenin Alvarado",
  role: "Desarrollador Full Stack",
  tagline: "Productos web rápidos, accesibles y fáciles de usar.",
  intro:
    "Soy Lenin Alvarado, desarrollador full stack. Me motiva convertir ideas en productos web rápidos, accesibles y fáciles de usar. Disfruto construir desde interfaces cuidadas hasta aplicaciones con datos reales: tiendas en línea, paneles de control y herramientas para negocios.",
  contactLinks: [
    {
      label: "Correo",
      value: "leninalvarado4to@gmail.com",
      href: "mailto:leninalvarado4to@gmail.com",
      icon: "mail",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/lenin-alvarado-dev",
      href: "https://www.linkedin.com/in/lenin-alvarado-dev",
      icon: "linkedin",
      // TODO: reemplazar por el perfil real de LinkedIn antes de entregar
      placeholder: true,
    },
    {
      label: "GitHub",
      value: "github.com/leninsio",
      href: "https://github.com/leninsio",
      icon: "github",
    },
  ],
};
