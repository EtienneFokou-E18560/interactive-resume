"use client";

import PageLayout from "@/components/PageLayout";
import { profile } from "@/data/profile";
import { useLanguage } from "@/hooks/useLanguage";

export default function AboutPageContent() {
  const { t } = useLanguage();

  return (
    <PageLayout title={t.about.title}>
      <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {profile.summary}
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">{t.about.highlights}</h2>
        <ul className="mt-4 space-y-3">
          {profile.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}
