import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { education } from "@/data/education";
import {
  defaultResumeVariantId,
  getResumeVariant,
} from "@/data/resumeVariants";
import type { ResumeDocument } from "@/lib/resume/types";

const MAX_BULLETS_PER_JOB = 4;
const MAX_PROJECTS = 3;

function selectBullets(
  company: string,
  bullets: string[],
  emphasis?: Record<string, number[]>
): string[] {
  const indices = emphasis?.[company];
  if (!indices?.length) {
    return bullets.slice(0, MAX_BULLETS_PER_JOB);
  }

  const picked = indices
    .filter((i) => i >= 0 && i < bullets.length)
    .map((i) => bullets[i]);

  if (picked.length >= MAX_BULLETS_PER_JOB) {
    return picked.slice(0, MAX_BULLETS_PER_JOB);
  }

  const remaining = bullets.filter((_, i) => !indices.includes(i));
  return [...picked, ...remaining].slice(0, MAX_BULLETS_PER_JOB);
}

export function composeResume(
  variantId: string = defaultResumeVariantId
): ResumeDocument | null {
  const variant = getResumeVariant(variantId);
  if (!variant) return null;

  const skillMap = new Map(skills.map((cat) => [cat.name, cat]));
  const orderedSkills = variant.skillCategoryOrder
    .map((name) => skillMap.get(name))
    .filter((cat): cat is (typeof skills)[number] => Boolean(cat))
    .map((cat) => ({
      name: cat.name,
      skills: cat.skills.map((s) => s.name),
    }));

  const projectTitles = new Set(variant.featuredProjectTitles);
  const selectedProjects = projects
    .filter((p) => projectTitles.has(p.title))
    .slice(0, MAX_PROJECTS)
    .map((p) => ({
      title: p.title,
      description: p.description,
      highlights: p.highlights.slice(0, 2),
      technologies: p.technologies,
    }));

  return {
    variantId: variant.id,
    targetTitle: variant.targetTitle,
    contact: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      linkedin: profile.linkedin,
      github: profile.github,
      portfolio: profile.portfolio,
    },
    summary: variant.summary,
    experience: experience.map((job) => ({
      company: job.company,
      role: job.role,
      start: job.start,
      end: job.end,
      location: job.location,
      bullets: selectBullets(
        job.company,
        job.description,
        variant.experienceEmphasis
      ),
      technologies: job.technologies ?? [],
    })),
    projects: selectedProjects,
    skills: orderedSkills,
    education: education.map((e) => ({
      school: e.school,
      degree: e.degree,
      field: e.field,
      end: e.end,
      location: e.location,
    })),
  };
}

export function resumeDownloadFilename(variantId: string): string {
  return `Etienne-Fokou-${variantId}.pdf`;
}
