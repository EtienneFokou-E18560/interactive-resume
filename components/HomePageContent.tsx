"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import SkillChart from "@/components/SkillChart";
import ProjectCard from "@/components/ProjectCard";
import ExperienceCard from "@/components/ExperienceCard";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Terminal from "@/components/Terminal";
import TechStack from "@/components/TechStack";
import CallToAction from "@/components/CallToAction";
import Section from "@/components/Section";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { profile } from "@/data/profile";
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
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <Link
        href={href}
        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        {viewAll} →
      </Link>
    </div>
  );
}

export default function HomePageContent() {
  const { t } = useLanguage();

  return (
    <>
      <Hero />

      <Section alt>
        <SectionHeader title={t.home.about} href="/about" viewAll={t.home.viewAll} />
        <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {profile.summary}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {profile.bio.slice(0, 2).map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="rounded-xl border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profile.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeader title={t.home.techStack} href="/skills" viewAll={t.home.viewAll} />
        <TechStack />
      </Section>

      <Section alt>
        <SectionHeader title={t.home.skills} href="/skills" viewAll={t.home.viewAll} />
        <SkillChart />
      </Section>

      <Section>
        <SectionHeader title={t.home.experience} href="/experience" viewAll={t.home.viewAll} />
        <div className="space-y-4">
          {experience.map((item) => (
            <ExperienceCard key={item.company} item={item} />
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionHeader title={t.home.projects} href="/projects" viewAll={t.home.viewAll} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Section>

      <Section title={t.home.architecture} centered>
        <ArchitectureDiagram />
      </Section>

      <Section alt title={t.home.certifications}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="font-semibold">{cert.name}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {cert.issuer} · {cert.year}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CallToAction />

      <Section title={t.home.terminal}>
        <Terminal />
      </Section>
    </>
  );
}
