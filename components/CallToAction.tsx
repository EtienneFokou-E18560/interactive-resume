"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/hooks/useLanguage";

export default function CallToAction() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="card px-8 py-12 text-center sm:px-12 sm:py-16">
        <p className="eyebrow">Next step</p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-[var(--color-text-secondary)]">
          {t.cta.description}
        </p>
        <div className="button-row mt-8 justify-center">
          <Link href="/contact" className="button button-primary">
            {t.cta.contact}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={`mailto:${profile.email}`} className="button button-secondary">
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
