"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  trackLabLaunchRequested,
  trackLabRolloutExposure,
} from "@/lib/terminalEvents";

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

export type LabStatus = {
  mode: "owner" | "invite" | "rollout" | "hidden";
  unlocked: boolean;
  hostAvailable: boolean;
  inviteConfigured: boolean;
  wsUrl: string | null;
  rollout: {
    evaluated: boolean;
    inRollout: boolean;
    percent: number;
  } | null;
};

type Props = {
  initialStatus: LabStatus;
};

export default function LaunchEngineeringLab({ initialStatus }: Props) {
  const [status, setStatus] = useState<LabStatus>(initialStatus);
  const [active, setActive] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const exposureSent = useRef(false);

  useEffect(() => {
    if (exposureSent.current) return;
    const rollout = initialStatus.rollout;
    if (!rollout?.evaluated) return;
    exposureSent.current = true;
    trackLabRolloutExposure(rollout.inRollout, rollout.percent);
  }, [initialStatus.rollout]);

  const endSession = useCallback(() => setActive(false), []);

  async function handleUnlock(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lab/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await res.json()) as { error?: string; wsUrl?: string };
      if (!res.ok) {
        setError(data.error || "Unable to unlock the lab.");
        return;
      }
      trackLabLaunchRequested();
      setStatus((prev) => ({
        mode: "invite",
        unlocked: true,
        hostAvailable: true,
        inviteConfigured: true,
        wsUrl: data.wsUrl || null,
        rollout: prev.rollout,
      }));
      setCode("");
    } catch {
      setError("Unable to unlock the lab.");
    } finally {
      setSubmitting(false);
    }
  }

  if (status.mode === "hidden") {
    return null;
  }

  const wsUrl = status.wsUrl;
  const canLaunch =
    Boolean(wsUrl) &&
    (status.mode === "owner" ||
      status.mode === "rollout" ||
      (status.mode === "invite" && status.unlocked));

  if (active && canLaunch && wsUrl) {
    return <EngineeringLabClient wsUrl={wsUrl} onEnded={endSession} />;
  }

  if (status.mode === "invite" && !status.unlocked) {
    return (
      <div className="lab-launch">
        <p>
          <strong className="text-foreground">Engineering Lab</strong> is in
          private beta. Enter an invite code to unlock a temporary sandbox.
        </p>
        <form className="lab-launch-actions" onSubmit={handleUnlock}>
          <label className="sr-only" htmlFor="lab-invite-code">
            Invite code
          </label>
          <input
            id="lab-invite-code"
            className="field-input max-w-xs"
            type="password"
            autoComplete="off"
            placeholder="Invite code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button
            type="submit"
            className="button button-primary"
            disabled={submitting || !code.trim()}
          >
            {submitting ? "Checking…" : "Unlock lab"}
          </button>
        </form>
        {error ? (
          <p className="mt-3 text-sm text-[var(--color-danger)]" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  if (!canLaunch) {
    return (
      <div className="lab-launch">
        <p>
          <strong className="text-foreground">Engineering Lab</strong> is
          unlocked for this session, but the lab host is not available in this
          environment.
        </p>
        <p className="lab-launch-note">
          The simulated portfolio CLI below remains available. Ask the operator
          to start the gateway when a host is ready.
        </p>
      </div>
    );
  }

  const note =
    status.mode === "owner"
      ? "Local lab gateway detected. Launching opens an xterm session against a disposable container."
      : status.mode === "rollout"
        ? "Limited public preview. Launching opens an xterm session against a disposable sandbox."
        : "Invite unlocked. Launching opens an xterm session against the private-beta gateway.";

  return (
    <div className="lab-launch">
      <p>
        <strong className="text-foreground">Engineering Lab</strong> provisions
        a short-lived, isolated sandbox for approved Linux and GitOps
        demonstrations. Environments reset automatically and never attach to
        production clusters or cloud credentials.
      </p>
      <p>{note}</p>
      <div className="lab-launch-actions">
        <button
          type="button"
          className="button button-primary"
          onClick={() => setActive(true)}
        >
          Launch Engineering Lab
        </button>
        <span className="lab-launch-note">
          Sessions idle-out and expire automatically
        </span>
      </div>
    </div>
  );
}
