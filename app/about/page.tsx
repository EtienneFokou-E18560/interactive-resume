import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name} — ${profile.title}`,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
