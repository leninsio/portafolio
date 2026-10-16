const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Conocimientos", href: "#conocimientos" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
] as const;

export function SiteNav() {
  return (
    <nav className="nav" aria-label="Principal">
      <ul className="nav__list">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a className="nav__link" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
