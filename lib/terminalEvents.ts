import { track } from "@vercel/analytics";

export type TerminalCommandCategory =
  | "portfolio"
  | "unknown"
  | "lab_preview";

export type LabSessionEndReason = "client" | "error" | "remote";

export type LabDurationBucket = "<30s" | "30-120s" | "2-5m" | "5m+";

/** Anonymous terminal events - never include command text or PII. */
export function trackTerminalCommand(category: TerminalCommandCategory) {
  track("terminal_command", { category });
}

export function trackLabLaunchRequested() {
  track("lab_launch_requested");
}

export function trackLabLaunchSucceeded() {
  track("lab_launch_succeeded");
}

export function trackLabLaunchFailed() {
  track("lab_launch_failed");
}

export function trackLabSessionEnded(
  reason: LabSessionEndReason,
  durationBucket: LabDurationBucket
) {
  track("lab_session_ended", { reason, duration_bucket: durationBucket });
}

export function trackLabRolloutExposure(inRollout: boolean, percent: number) {
  track("lab_rollout_exposure", {
    in_rollout: inRollout ? "true" : "false",
    percent: String(percent),
  });
}

export function labDurationBucket(durationMs: number): LabDurationBucket {
  if (durationMs < 30_000) return "<30s";
  if (durationMs < 120_000) return "30-120s";
  if (durationMs < 300_000) return "2-5m";
  return "5m+";
}
