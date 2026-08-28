import type { Metadata } from "next";
import ResumeDownloadContent from "@/components/ResumeDownloadContent";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Download Resume",
  description: `Generate and download a role-tailored PDF resume for ${profile.name}.`,
};

export default function ResumeDownloadPage() {
  return <ResumeDownloadContent />;
}
