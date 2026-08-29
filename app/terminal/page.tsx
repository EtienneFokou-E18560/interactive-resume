import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageLayout from "@/components/PageLayout";
import LaunchEngineeringLab from "@/components/LaunchEngineeringLab";
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
      "CLI-style terminal for browsing resume data, plus a preview of the upcoming Engineering Lab.",
    path: "/terminal",
  }),
  robots: { index: false, follow: false },
};

export default function TerminalPage() {
  return (
    <PageLayout
      title="Developer mode"
      description="Use the simulated portfolio CLI instantly. Engineering Lab - a temporary isolated sandbox for GitOps demos - is coming soon and stays separate from production systems."
    >
      <LaunchEngineeringLab />
      <Terminal />
    </PageLayout>
  );
}
