"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/hooks/useLanguage";

export default function CallToAction() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 to-violet-700 px-8 py-12 text-center text-white shadow-xl sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="relative">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            {t.cta.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              {t.cta.contact}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
