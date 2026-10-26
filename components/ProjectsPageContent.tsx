"use client";

import PageLayout from "@/components/PageLayout";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useLanguage } from "@/hooks/useLanguage";
import EnglishOnlyNote from "@/components/EnglishOnlyNote";

export default function ProjectsPageContent() {
  const { t } = useLanguage();

  return (
    <PageLayout title={t.projects.title} description={t.projects.description}>
      <EnglishOnlyNote className="mb-6" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </PageLayout>
  );
}
