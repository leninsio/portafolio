type HeaderSectionProps = {
  name: string;
  role: string;
};

export function HeaderSection({ name, role }: HeaderSectionProps) {
  const monogram = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="hero" id="inicio" aria-labelledby="hero-title">
      <p className="hero__monogram" aria-hidden="true">
        {monogram}
      </p>
      <h1 className="hero__name" id="hero-title">
        {name}
      </h1>
      <p className="hero__role">{role}</p>
      <div className="hero__actions">
        <a className="button" href="#proyectos">
          Ver proyectos
        </a>
        <a className="button button--ghost" href="#contacto">
          Contáctame
        </a>
      </div>
    </header>
  );
}
