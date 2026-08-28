"use client";

import PageLayout from "@/components/PageLayout";
import ProfileAvatar from "@/components/ProfileAvatar";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { useLanguage } from "@/hooks/useLanguage";

export default function AboutPageContent() {
  const { t } = useLanguage();

  return (
    <PageLayout title={t.about.title} description={profile.summary}>
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
        <ProfileAvatar size={160} />
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-xl font-semibold text-foreground">{profile.name}</p>
          <p className="text-[var(--color-text-secondary)]">{profile.title}</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            {profile.location}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {profile.subtitle}
          </p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">{t.about.bio}</h2>
        <div className="reading-width mt-4 space-y-4">
          {profile.bio.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base leading-relaxed text-[var(--color-text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {t.about.highlights}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {profile.highlights.map((item) => (
            <li key={item} className="card flex items-start gap-3 px-4 py-3 text-sm">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span className="text-[var(--color-text-secondary)]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {t.about.education}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {education.map((item) => (
            <article
              key={`${item.school}-${item.degree}`}
              className="card p-6"
            >
              <h3 className="font-semibold text-foreground">
                {item.degree} in {item.field}
              </h3>
              <p className="mt-1 text-[var(--color-text-secondary)]">
                {item.school}
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {item.start} – {item.end}
                {item.location ? ` · ${item.location}` : ""}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
