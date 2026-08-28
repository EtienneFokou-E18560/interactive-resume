import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudyContent from "@/components/ProjectCaseStudyContent";
import { getCaseStudyProjects, getProjectBySlug } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.caseStudy) {
    return { title: "Project not found" };
  }
  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.caseStudy) notFound();

  return <ProjectCaseStudyContent project={project} />;
}
