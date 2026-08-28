"use client";

import { trackLabLaunchRequested } from "@/lib/terminalEvents";

export default function LaunchEngineeringLab() {
  function handleActivate() {
    trackLabLaunchRequested();
  }

  return (
    <div className="lab-launch">
      <p>
        <strong className="text-foreground">Engineering Lab</strong> will
        provision a short-lived, isolated sandbox for approved Linux and
        GitOps demonstrations. Environments reset automatically and never
        attach to production clusters or cloud credentials.
      </p>
      <p>
        Until the lab is live, use the simulated portfolio CLI below — it works
        instantly with no sandbox required.
      </p>
      <div className="lab-launch-actions">
        <button
          type="button"
          className="button button-secondary"
          aria-disabled="true"
          onClick={handleActivate}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleActivate();
            }
          }}
        >
          Launch Engineering Lab
        </button>
        <span className="lab-launch-note">Coming soon — preview only</span>
      </div>
    </div>
  );
}
