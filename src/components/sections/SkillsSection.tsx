import type { SkillGroup } from "@/data/skills";

type SkillsSectionProps = {
  groups: readonly SkillGroup[];
};

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <section className="section" id="conocimientos" aria-labelledby="skills-title">
      <h2 id="skills-title">Conocimientos técnicos</h2>
      <div className="skills">
        {groups.map((group, index) => {
          const titleId = `skills-group-${index}`;

          return (
            <div className="skills__group" key={group.title}>
              <h3 className="skills__title" id={titleId}>
                {group.title}
              </h3>
              <ul className="skills__list" aria-labelledby={titleId}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
