"use client";

import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import PageLayout from "@/components/PageLayout";
import SkillChart from "@/components/SkillChart";
import TechStack from "@/components/TechStack";
import { certifications } from "@/data/certifications";
import { useLanguage } from "@/hooks/useLanguage";

export default function SkillsPageContent() {
  const { t } = useLanguage();

  return (
    <PageLayout title={t.skills.title} description={t.skills.description}>
      <SkillChart />

      <section className="mt-16">
        <h2 className="mb-6 text-xl font-semibold">{t.home.techStack}</h2>
        <TechStack />
      </section>

      {certifications.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-xl font-semibold">{t.skills.certifications}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16">
        <h2 className="mb-8 text-center text-xl font-semibold">
          {t.skills.architecture}
        </h2>
        <ArchitectureDiagram />
      </section>
    </PageLayout>
  );
}
