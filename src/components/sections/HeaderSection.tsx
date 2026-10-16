type HeaderSectionProps = {
  name: string;
  role: string;
  tagline: string;
};

export function HeaderSection({ name, role, tagline }: HeaderSectionProps) {
  return (
    <header className="hero" id="inicio" aria-labelledby="hero-title">
      <h1 className="hero__name" id="hero-title">
        {name}
      </h1>
      <p className="hero__role">{role}</p>
      <p className="hero__tagline">{tagline}</p>
      <div className="hero__actions">
        <a className="button" href="#proyectos">
          Ver proyectos
        </a>
        <a className="hero__cta" href="#contacto">
          Contáctame<span aria-hidden="true"> ›</span>
        </a>
      </div>
    </header>
  );
}
