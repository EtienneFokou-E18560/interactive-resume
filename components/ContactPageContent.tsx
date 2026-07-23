"use client";

import Link from "next/link";
import { Download, Mail, MapPin, Phone } from "lucide-react";
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
          <h2 className="mb-6 text-xl font-semibold">{t.contact.getInTouch}</h2>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="mb-6 text-xl font-semibold">{t.contact.directContact}</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Mail className="h-5 w-5 shrink-0 text-blue-500" />
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Phone className="h-5 w-5 shrink-0 text-blue-500" />
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <MapPin className="h-5 w-5 shrink-0 text-blue-500" />
                {profile.location}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">{t.contact.social}</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                <FaGithub className="h-5 w-5" />
                GitHub
              </Link>
              <Link
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                <FaLinkedin className="h-5 w-5" />
                LinkedIn
              </Link>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">{t.contact.resume}</h2>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Download className="h-4 w-4" />
              {t.contact.downloadPdf}
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
