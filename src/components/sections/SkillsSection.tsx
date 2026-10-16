type SkillsSectionProps = {
  skills: readonly string[];
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="card" id="conocimientos" aria-labelledby="skills-title">
      <h2 id="skills-title">Conocimientos técnicos</h2>
      <ul className="skills" aria-labelledby="skills-title">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
