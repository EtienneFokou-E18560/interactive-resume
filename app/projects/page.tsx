import type { Metadata } from "next";
import ProjectsPageContent from "@/components/ProjectsPageContent";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: `Software engineering projects by ${profile.name}`,
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
