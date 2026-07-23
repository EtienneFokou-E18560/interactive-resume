"use client";

import ExperienceCard from "@/components/ExperienceCard";
import PageLayout from "@/components/PageLayout";
import Timeline from "@/components/Timeline";
import { experience } from "@/data/experience";
import { useLanguage } from "@/hooks/useLanguage";

export default function ExperiencePageContent() {
  const { t } = useLanguage();

  return (
    <PageLayout title={t.experience.title} description={t.experience.description}>
      <section>
        <h2 className="mb-8 text-xl font-semibold">{t.experience.timeline}</h2>
        <Timeline />
      </section>

      <section className="mt-16">
        <h2 className="mb-8 text-xl font-semibold">{t.experience.allRoles}</h2>
        <div className="space-y-4">
          {experience.map((item) => (
            <ExperienceCard key={`${item.company}-${item.start}`} item={item} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
