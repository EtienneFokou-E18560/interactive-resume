import type { Metadata } from "next";
import Terminal from "@/components/Terminal";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Developer mode",
  description:
    "CLI-style terminal for browsing résumé data — optional developer mode.",
};

export default function TerminalPage() {
  return (
    <PageLayout
      title="Developer mode"
      description="A terminal-style interface for browsing profile, experience, projects, and contact data. This is optional and separate from the primary hiring journey."
    >
      <Terminal />
    </PageLayout>
  );
}
