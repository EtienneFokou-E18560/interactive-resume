import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";

export default function JsonLd() {
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.title,
        description: profile.summaryMeta,
        url: siteUrl,
        email: profile.email,
        image: `${siteUrl}${profile.avatar}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bellevue",
          addressRegion: "WA",
          addressCountry: "US",
        },
        sameAs: [profile.github, profile.linkedin, profile.portfolio].filter(
          Boolean
        ),
        knowsAbout: [
          "Platform engineering",
          "Site reliability engineering",
          "Cloud infrastructure",
          "AWS",
          "Azure",
          "GCP",
          "Agentic AI",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: `${profile.name} | ${profile.title}`,
        description: profile.summaryMeta,
        mainEntity: { "@id": personId },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: `${profile.name} Portfolio`,
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
