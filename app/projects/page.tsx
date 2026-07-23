import type { Metadata } from "next";
import ProjectsPageContent from "@/components/ProjectsPageContent";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Projects",
  description: `Software engineering projects by ${profile.name}`,
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
