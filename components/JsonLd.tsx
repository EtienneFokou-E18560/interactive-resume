import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";

export default function JsonLd() {
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const companyId = "https://cieltd.org/#organization";

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
        worksFor: { "@id": companyId },
        knowsAbout: [
          "Platform engineering",
          "Site reliability engineering",
          "Cloud infrastructure",
          "AWS",
          "Azure",
          "GCP",
          "Agentic AI",
          "Gmail API integration",
          "Developer tooling",
        ],
      },
      {
        "@type": "Organization",
        "@id": companyId,
        name: "CIE LTD",
        url: "https://cieltd.org",
        foundingDate: "2021",
        founder: { "@id": personId },
        owns: [
          { "@type": "SoftwareApplication", name: "Askel", url: "https://www.getaskel.com", applicationCategory: "BusinessApplication" },
          { "@type": "SoftwareApplication", name: "InboxLink", url: "https://inboxlink.cieltd.org", applicationCategory: "DeveloperApplication" },
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
