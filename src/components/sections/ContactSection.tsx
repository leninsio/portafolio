import type { ContactLink } from "@/data/profile";

type ContactSectionProps = {
  links: readonly ContactLink[];
};

export function ContactSection({ links }: ContactSectionProps) {
  return (
    <section className="card" id="contacto" aria-labelledby="contact-title">
      <h2 id="contact-title">Contacto</h2>
      <ul className="contact">
        {links.map((link) => (
          <li key={link.label}>
            {link.label}: <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
