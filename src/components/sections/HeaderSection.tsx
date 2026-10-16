type HeaderSectionProps = {
  name: string;
  role: string;
  tagline: string;
};

export function HeaderSection({ name, role, tagline }: HeaderSectionProps) {
  return (
    <header className="hero" id="inicio" aria-labelledby="hero-title">
      <span className="hero__backdrop" aria-hidden="true" />
      <span className="hero__fade" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">Portafolio</p>
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
      </div>
      <a className="hero__scroll" href="#sobre-mi" aria-label="Ir a Sobre mí">
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
