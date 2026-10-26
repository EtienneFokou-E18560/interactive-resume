import { profile } from "@/data/profile";

export const ogSize = { width: 1200, height: 630 };

type OgCardInput = {
  title: string;
  subtitle: string;
  footer: string;
  /** Smaller title for long case-study names. */
  titleSize?: number;
};

/** Shared social card: name badge on top, title and subtitle in the middle, a footer line. */
export function ogCard({ title, subtitle, footer, titleSize = 64 }: OgCardInput) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(145deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
        color: "#f8fafc",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 28,
          color: "#93c5fd",
          fontWeight: 600,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          E
        </div>
        <div style={{ display: "flex" }}>{profile.name}</div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#cbd5e1",
            lineHeight: 1.35,
            maxWidth: 980,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 22, color: "#94a3b8" }}>{footer}</div>
    </div>
  );
}
