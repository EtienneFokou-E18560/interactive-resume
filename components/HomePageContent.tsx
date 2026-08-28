"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import CallToAction from "@/components/CallToAction";
import Section from "@/components/Section";
import { featuredProjects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { useLanguage } from "@/hooks/useLanguage";

function SectionHeader({
  title,
  href,
  viewAll,
}: {
  title: string;
  href: string;
  viewAll: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--color-border)] pb-5">
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <Link
        href={href}
        className="text-sm font-medium text-[var(--color-text-muted)] hover:text-accent"
      >
        {viewAll} →
      </Link>
    </div>
  );
}

export default function HomePageContent() {
  const { t } = useLanguage();
  const selectedExperience = experience.slice(0, 2);

  return (
    <>
      <Hero />

      <Section>
        <SectionHeader
          title={t.home.selectedExperience}
          href="/experience"
          viewAll={t.home.viewAll}
        />
        <div className="space-y-6">
          {selectedExperience.map((item) => (
            <article key={item.company} className="card p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-foreground">
                {item.role} · {item.company}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {item.start} - {item.end}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              {item.scope && (
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {item.scope}
                </p>
              )}
              <ul className="mt-4 space-y-2">
                {item.description.slice(0, 3).map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionHeader
          title={t.home.caseStudies}
          href="/projects"
          viewAll={t.home.viewAll}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          title={t.home.focusAreas}
          href="/skills"
          viewAll={t.home.viewAll}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category) => (
            <div key={category.name} className="card p-5">
              <h3 className="font-semibold text-foreground">{category.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {category.skills
                  .slice(0, 4)
                  .map((s) => s.name)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CallToAction />

      <Section>
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          {t.home.developerModeHint}{" "}
          <Link href="/terminal" className="text-accent hover:text-[var(--color-accent-hover)]">
            {t.home.developerMode}
          </Link>
        </p>
      </Section>
    </>
  );
}
