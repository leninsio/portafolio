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
    <section className="section" id="contacto" aria-labelledby="contact-title">
      <h2 className="contact__title" id="contact-title">
        Hablemos.
      </h2>
      {available.length > 0 && (
        <ul className="contact">
          {available.map((link) => {
            const isExternal = link.href.startsWith("http");

            return (
              <li key={link.label}>
                <a
                  className="contact__row"
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <span className="contact__label">{link.label}</span>
                  <span className="contact__meta">
                    <span className="contact__value">
                      {link.value ?? link.href}
                    </span>
                    <span className="contact__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
