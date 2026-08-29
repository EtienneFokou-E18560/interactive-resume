import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageLayout from "@/components/PageLayout";
import LaunchEngineeringLabGate from "@/components/LaunchEngineeringLabGate";
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
      "CLI-style terminal for browsing resume data, with an invite-gated Engineering Lab private beta when configured.",
    path: "/terminal",
  }),
  robots: { index: false, follow: false },
};

export default function TerminalPage() {
  return (
    <PageLayout
      title="Developer mode"
      description="Use the simulated portfolio CLI instantly. Engineering Lab is a temporary isolated sandbox for GitOps demos - invite-gated for private beta and separate from production systems."
    >
      <LaunchEngineeringLabGate />
      <Terminal />
    </PageLayout>
  );
}
