"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { getLabWsUrl } from "@/lib/lab";
import { trackLabLaunchRequested } from "@/lib/terminalEvents";

type Props = {
  onEnded: () => void;
};

export default function EngineeringLabClient({ onEnded }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const endedRef = useRef(false);

  useEffect(() => {
    const wsUrl = getLabWsUrl();
    const host = hostRef.current;
    if (!wsUrl || !host) return;

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

    ws.onopen = () => {
      term.focus();
    };

    ws.onmessage = (event) => {
      term.write(typeof event.data === "string" ? event.data : "");
    };

    ws.onerror = () => {
      term.writeln("\r\n[lab] connection error — is the gateway running?");
    };

    ws.onclose = () => {
      if (!endedRef.current) {
        term.writeln("\r\n[lab] disconnected");
        endedRef.current = true;
        onEnded();
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
  }, [onEnded]);

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
            endedRef.current = true;
            onEnded();
          }}
        >
          End session
        </button>
      </div>
      <div ref={hostRef} className="lab-xterm" role="region" aria-label="Engineering Lab terminal" />
    </div>
  );
}
