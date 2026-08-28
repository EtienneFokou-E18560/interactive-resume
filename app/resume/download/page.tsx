import type { Metadata } from "next";
import ResumeDownloadContent from "@/components/ResumeDownloadContent";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Download Resume",
  description: `Generate and download a role-tailored PDF resume for ${profile.name}.`,
  path: "/resume/download",
});

export default function ResumeDownloadPage() {
  return <ResumeDownloadContent />;
}
