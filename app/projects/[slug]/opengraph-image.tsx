import { ImageResponse } from "next/og";
import {
  getCaseStudyProjects,
  getProjectBySlug,
  projectClassificationLabels,
} from "@/data/projects";
import { profile } from "@/data/profile";
import { ogCard, ogSize } from "@/lib/ogCard";

export const alt = `Case study by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

/** One social card per case study: its title, its first highlight, its label and stack. */
export default async function CaseStudyImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return new ImageResponse(ogCard({ title: "Case study", subtitle: "", footer: "" }), { ...size });
  }

  return new ImageResponse(
    ogCard({
      title: project.title,
      subtitle: project.highlights[0] ?? project.description,
      footer: `${projectClassificationLabels[project.classification]} · ${project.technologies
        .slice(0, 4)
        .join(" · ")}`,
      titleSize: project.title.length > 28 ? 56 : 64,
    }),
    { ...size }
  );
}
