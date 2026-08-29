"use client";

import { FormEvent, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { trackLabLaunchRequested } from "@/lib/terminalEvents";

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
  mode: "owner" | "invite" | "hidden";
  unlocked: boolean;
  hostAvailable: boolean;
  inviteConfigured: boolean;
  wsUrl: string | null;
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
      setStatus({
        mode: "invite",
        unlocked: true,
        hostAvailable: true,
        inviteConfigured: true,
        wsUrl: data.wsUrl || null,
      });
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
  const canLaunch = Boolean(wsUrl) && (status.mode === "owner" || status.unlocked);

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
          <strong className="text-foreground">Engineering Lab</strong> invite
          accepted, but the lab host is not available in this environment.
        </p>
        <p className="lab-launch-note">
          Ask the operator to start the local gateway, then try again.
        </p>
      </div>
    );
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
        {status.mode === "owner"
          ? "Local lab gateway detected. Launching opens an xterm session against a disposable container."
          : "Invite unlocked. Launching opens an xterm session against the private-beta gateway."}
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
          Private beta - sessions idle-out and expire automatically
        </span>
      </div>
    </div>
  );
}
