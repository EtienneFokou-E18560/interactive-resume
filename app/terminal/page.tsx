import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageLayout from "@/components/PageLayout";
import { pageMetadata } from "@/lib/seo";

const Terminal = dynamic(() => import("@/components/Terminal"), {
  loading: () => (
    <p className="text-sm text-[var(--color-text-muted)]">Loading terminal…</p>
  ),
});

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Developer mode",
    description:
      "CLI-style terminal for browsing resume data - optional developer mode.",
    path: "/terminal",
  }),
  robots: { index: false, follow: false },
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
