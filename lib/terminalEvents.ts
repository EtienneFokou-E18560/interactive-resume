import { track } from "@vercel/analytics";

export type TerminalCommandCategory =
  | "portfolio"
  | "unknown"
  | "lab_preview";

/** Anonymous terminal events - never include command text or PII. */
export function trackTerminalCommand(category: TerminalCommandCategory) {
  track("terminal_command", { category });
}

export function trackLabLaunchRequested() {
  track("lab_launch_requested");
}
