import type { Metadata } from "next";
import SkillsPageContent from "@/components/SkillsPageContent";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Skills",
  description: `Technical skills and certifications of ${profile.name}`,
};

export default function SkillsPage() {
  return <SkillsPageContent />;
}
