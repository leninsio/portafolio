type IntroSectionProps = {
  text: string;
};

export function IntroSection({ text }: IntroSectionProps) {
  return (
    <section className="section" id="sobre-mi" aria-labelledby="intro-title">
      <h2 id="intro-title">Sobre mí</h2>
      <p className="intro__text">{text}</p>
    </section>
  );
}
