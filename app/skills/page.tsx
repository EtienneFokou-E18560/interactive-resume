import type { Metadata } from "next";
import SkillsPageContent from "@/components/SkillsPageContent";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Skills",
  description: `Technical skills and certifications of ${profile.name}`,
  path: "/skills",
});

export default function SkillsPage() {
  return <SkillsPageContent />;
}
