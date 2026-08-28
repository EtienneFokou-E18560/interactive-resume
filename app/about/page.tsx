import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `About ${profile.name} - ${profile.title}`,
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageContent />;
}
