import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  description: profile.summaryMeta,
  path: "/",
});

export default function HomePage() {
  return <HomePageContent />;
}
