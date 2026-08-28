import type { Metadata } from "next";
import ExperiencePageContent from "@/components/ExperiencePageContent";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description: `Professional experience of ${profile.name} - ${profile.title}`,
  path: "/experience",
});

export default function ExperiencePage() {
  return <ExperiencePageContent />;
}
