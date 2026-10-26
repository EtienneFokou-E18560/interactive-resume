import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { ogCard, ogSize } from "@/lib/ogCard";

export const alt = `${profile.name} | ${profile.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    ogCard({
      title: profile.title,
      subtitle: profile.subtitle,
      footer: `${profile.location} · AWS · Azure · GCP`,
    }),
    { ...size }
  );
}
