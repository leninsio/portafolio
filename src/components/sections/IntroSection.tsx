type IntroSectionProps = {
  text: string;
};

export function IntroSection({ text }: IntroSectionProps) {
  return (
    <section className="card" id="intro" aria-labelledby="intro-title">
      <h2 id="intro-title">Intro</h2>
      <p className="pending">{text}</p>
    </section>
  );
}
