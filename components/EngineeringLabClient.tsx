"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import {
  labDurationBucket,
  trackLabLaunchFailed,
  trackLabLaunchRequested,
  trackLabLaunchSucceeded,
  trackLabSessionEnded,
  type LabSessionEndReason,
} from "@/lib/terminalEvents";

type Props = {
  wsUrl: string;
  onEnded: () => void;
};

export default function EngineeringLabClient({ wsUrl, onEnded }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const endedRef = useRef(false);
  const readyRef = useRef(false);
  const failedRef = useRef(false);
  const startedAtRef = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!wsUrl || !host) return;

    endedRef.current = false;
    readyRef.current = false;
    failedRef.current = false;
    startedAtRef.current = Date.now();
    trackLabLaunchRequested();

    const term = new Terminal({
      cursorBlink: !window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 13,
      theme: {
        background: "#111113",
        foreground: "#e4e4e7",
        cursor: "#7590ff",
      },
      convertEol: true,
    });
    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(host);
    fit.fit();

    const ws = new WebSocket(wsUrl);

    const endWith = (reason: LabSessionEndReason) => {
      if (endedRef.current) return;
      endedRef.current = true;
      const durationMs = Date.now() - startedAtRef.current;
      trackLabSessionEnded(reason, labDurationBucket(durationMs));
      onEnded();
    };

    ws.onopen = () => {
      term.focus();
    };

    ws.onmessage = (event) => {
      const text = typeof event.data === "string" ? event.data : "";
      term.write(text);
      if (!readyRef.current && text.includes("[lab] ready")) {
        readyRef.current = true;
        trackLabLaunchSucceeded();
      }
    };

    ws.onerror = () => {
      if (!failedRef.current) {
        failedRef.current = true;
        trackLabLaunchFailed();
      }
      term.writeln("\r\n[lab] connection error — is the gateway running?");
    };

    ws.onclose = () => {
      if (!endedRef.current) {
        term.writeln("\r\n[lab] disconnected");
        endWith(failedRef.current ? "error" : "remote");
      }
    };

    const dataSub = term.onData((data) => {
      if (ws.readyState === WebSocket.OPEN) ws.send(data);
    });

    const onResize = () => fit.fit();
    window.addEventListener("resize", onResize);

    return () => {
      // Intentional unmount (incl. React Strict Mode remount) must not
      // treat the socket close as an end-session signal for the parent.
      endedRef.current = true;
      dataSub.dispose();
      window.removeEventListener("resize", onResize);
      ws.close();
      term.dispose();
    };
  }, [wsUrl, onEnded]);

  return (
    <div className="lab-session">
      <div className="lab-session-header">
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          visitor@etienne-lab — temporary sandbox
        </span>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => {
            if (!endedRef.current) {
              const durationMs = Date.now() - startedAtRef.current;
              endedRef.current = true;
              trackLabSessionEnded("client", labDurationBucket(durationMs));
            }
            onEnded();
          }}
        >
          End session
        </button>
      </div>
      <div
        ref={hostRef}
        className="lab-xterm"
        role="region"
        aria-label="Engineering Lab terminal"
      />
    </div>
  );
}
