"use client";

import { useEffect } from "react";
import { classifyLink, trackLinkEvent } from "@/lib/siteEvents";

/**
 * One listener for the whole site, so links in server components (hero, footer,
 * contact page, project cards) are tracked without each needing an onClick.
 */
export default function TrackLinkClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;

      const event = classifyLink(anchor.getAttribute("href") ?? "", window.location.origin);
      if (event) trackLinkEvent(event, window.location.pathname);
    }

    // Capture phase, so the event is sent even when a link handler stops propagation.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
