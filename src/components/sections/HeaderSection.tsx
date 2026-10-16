type HeaderSectionProps = {
  name: string;
  role: string;
};

export function HeaderSection({ name, role }: HeaderSectionProps) {
  return (
    <header className="card header" aria-labelledby="header-title">
      <h1 id="header-title" className="header__name">
        {name}
      </h1>
      <p className="header__role">{role}</p>
    </header>
  );
}
