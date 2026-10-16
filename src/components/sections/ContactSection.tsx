import type { ContactLink } from "@/data/profile";

type ContactSectionProps = {
  links: readonly ContactLink[];
};

type AvailableLink = ContactLink & { href: string };

export function ContactSection({ links }: ContactSectionProps) {
  const available = links.filter(
    (link): link is AvailableLink => Boolean(link.href),
  );

  return (
    <section
      className="section section--contact"
      id="contacto"
      aria-labelledby="contact-title"
    >
      <h2 id="contact-title">Contacto</h2>
      <p className="contact__pitch">¿Tienes un proyecto en mente? Hablemos.</p>
      {available.length > 0 && (
        <ul className="contact">
          {available.map((link) => (
            <li key={link.label}>
              <a
                className="button"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
