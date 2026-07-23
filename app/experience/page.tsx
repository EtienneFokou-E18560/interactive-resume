import type { Metadata } from "next";
import ExperiencePageContent from "@/components/ExperiencePageContent";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Experience",
  description: `Professional experience of ${profile.name} — ${profile.title}`,
};

export default function ExperiencePage() {
  return <ExperiencePageContent />;
}
