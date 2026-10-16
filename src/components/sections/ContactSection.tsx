"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { siGithub } from "simple-icons";
import { Reveal } from "@/components/Reveal";
import type { ContactIconId, ContactLink } from "@/data/profile";
import styles from "./ContactSection.module.css";

type ContactSectionProps = {
  links: readonly ContactLink[];
};

type AvailableLink = ContactLink & { href: string };

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.94 8.5v10.5H3.5V8.5h3.44ZM5.22 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM20.5 19h-3.44v-5.6c0-1.4-.52-2.34-1.75-2.34-.96 0-1.5.65-1.75 1.28-.09.22-.07.53-.07.84V19h-3.44s.05-9.5 0-10.5h3.44v1.49c.46-.71 1.28-1.72 3.1-1.72 2.27 0 3.96 1.48 3.96 4.67V19Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={siGithub.path} />
    </svg>
  );
}

function ChannelIcon({ id }: { id?: ContactIconId }) {
  if (id === "linkedin") {
    return <LinkedinIcon />;
  }

  if (id === "github") {
    return <GithubIcon />;
  }

  return <MailIcon />;
}

export function ContactSection({ links }: ContactSectionProps) {
  const available = links.filter(
    (link): link is AvailableLink => Boolean(link.href),
  );
  const mailto = available.find((link) => link.href.startsWith("mailto:"));
  const email = mailto?.value ?? mailto?.href.replace(/^mailto:/, "");

  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const channelsIndex = email ? 4 : 3;

  useEffect(() => {
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      if (timer.current) {
        window.clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked or unavailable: stay quiet, never break the page.
    }
  };

  return (
    <section className="section" id="contacto" aria-labelledby="contact-title">
      <Reveal className={styles.card}>
        <p className={styles.eyebrow}>Contacto</p>
        <h2 className={styles.title} id="contact-title">
          Hablemos.
        </h2>
        <p className={styles.lead}>
          ¿Tienes un proyecto en mente o una oportunidad? Escríbeme y te
          respondo pronto.
        </p>
        {email && (
          <div className={styles.actions}>
            <a className="button" href={`mailto:${email}`}>
              Escríbeme
            </a>
            <button
              className="button button--ghost"
              type="button"
              onClick={handleCopy}
              aria-live="polite"
            >
              {copied ? "Copiado" : "Copiar correo"}
            </button>
          </div>
        )}
        {available.length > 0 && (
          <ul className={styles.contact} aria-label="Canales de contacto">
            {available.map((link, index) => {
              const isExternal = link.href.startsWith("http");

              return (
                <li
                  key={link.label}
                  data-reveal="sub"
                  style={
                    {
                      "--stagger-index": channelsIndex + 0.4 + index * 0.4,
                    } as CSSProperties
                  }
                >
                  <a
                    className={styles.row}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <span className={styles.icon}>
                      <ChannelIcon id={link.icon} />
                    </span>
                    <span className={styles.body}>
                      <span className={styles.label}>{link.label}</span>
                      <span className={styles.value}>
                        {link.value ?? link.href}
                      </span>
                    </span>
                    <span className={styles.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
