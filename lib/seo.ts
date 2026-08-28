import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";

const ogImagePath = "/opengraph-image";

/** Absolute canonical URL for a site path (`/` or `/about`, etc.). */
export function canonicalUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title?: string;
  description: string;
  path: string;
};

/**
 * Shared page metadata: canonical, Open Graph, and Twitter cards.
 * Pass `title` for segment titles (uses root template); omit on the home page.
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  const url = canonicalUrl(path);
  const displayTitle = title
    ? `${title} | ${profile.name}`
    : `${profile.name} | ${profile.title}`;

  return {
    metadataBase: new URL(getSiteUrl()),
    ...(title ? { title } : { title: displayTitle }),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: displayTitle,
      description,
      url,
      type: "website",
      siteName: `${profile.name} Portfolio`,
      images: [{ url: ogImagePath, width: 1200, height: 630, alt: displayTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [ogImagePath],
    },
  };
}
