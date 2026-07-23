"use client";

import PageLayout from "@/components/PageLayout";
import ProfileAvatar from "@/components/ProfileAvatar";
import StatsGrid from "@/components/StatsGrid";
import TechStack from "@/components/TechStack";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { useLanguage } from "@/hooks/useLanguage";

export default function AboutPageContent() {
  const { t } = useLanguage();

  return (
    <PageLayout title={t.about.title}>
      <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
        <div className="flex flex-col items-center gap-6 lg:items-start">
          <ProfileAvatar size={180} />
          <div className="w-full max-w-xs lg:max-w-none">
            <StatsGrid />
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold">{t.about.bio}</h2>
            <div className="mt-4 space-y-4">
              {profile.bio.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">{t.about.highlights}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {profile.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold">{t.about.education}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {education.map((item) => (
            <article
              key={`${item.school}-${item.degree}`}
              className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                {item.degree} in {item.field}
              </h3>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">{item.school}</p>
              <p className="mt-2 text-sm text-zinc-500">
                {item.start} – {item.end}
                {item.location ? ` · ${item.location}` : ""}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-xl font-semibold">{t.home.techStack}</h2>
        <TechStack />
      </section>
    </PageLayout>
  );
}
