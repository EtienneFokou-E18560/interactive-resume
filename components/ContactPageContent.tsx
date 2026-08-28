"use client";

import Link from "next/link";
import { Download, Layers, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import PageLayout from "@/components/PageLayout";
import { profile } from "@/data/profile";
import { useLanguage } from "@/hooks/useLanguage";

export default function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <PageLayout title={t.contact.title} description={t.contact.description}>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            {t.contact.getInTouch}
          </h2>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="mb-6 text-xl font-semibold text-foreground">
              {t.contact.directContact}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all hover:text-accent"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="hover:text-accent"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                {profile.location}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              {t.contact.social}
            </h2>
            <div className="button-row">
              <Link
                href={profile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                <Layers className="h-5 w-5" />
                {t.contact.portfolio}
              </Link>
              <Link
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                <FaGithub className="h-5 w-5" />
                GitHub
              </Link>
              <Link
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                <FaLinkedin className="h-5 w-5" />
                LinkedIn
              </Link>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              {t.contact.resume}
            </h2>
            <Link href="/resume/download" className="button button-primary">
              <Download className="h-4 w-4" />
              {t.contact.downloadPdf}
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
