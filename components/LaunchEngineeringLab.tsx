"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { isLabEnabled } from "@/lib/lab";

const EngineeringLabClient = dynamic(
  () => import("@/components/EngineeringLabClient"),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-[var(--color-text-muted)]">
        Starting Engineering Lab…
      </p>
    ),
  }
);

export default function LaunchEngineeringLab() {
  const enabled = isLabEnabled();
  const [active, setActive] = useState(false);

  const endSession = useCallback(() => setActive(false), []);

  if (!enabled) {
    return null;
  }

  if (active) {
    return <EngineeringLabClient onEnded={endSession} />;
  }

  return (
    <div className="lab-launch">
      <p>
        <strong className="text-foreground">Engineering Lab</strong> provisions
        a short-lived, isolated sandbox for approved Linux and GitOps
        demonstrations. Environments reset automatically and never attach to
        production clusters or cloud credentials.
      </p>
      <p>
        Local lab gateway detected. Launching opens an xterm session against a
        disposable container.
      </p>
      <div className="lab-launch-actions">
        <button
          type="button"
          className="button button-primary"
          onClick={() => setActive(true)}
        >
          Launch Engineering Lab
        </button>
        <span className="lab-launch-note">
          Local PoC - sessions idle-out and expire automatically
        </span>
      </div>
    </div>
  );
}
