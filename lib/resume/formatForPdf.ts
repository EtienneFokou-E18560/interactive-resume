import type { ResumeDocument } from "@/lib/resume/types";

export function formatForPdf(text: string): string {
  return text
    .replace(/[\u2014\u2013]/g, " - ")
    .replace(/\u00B7/g, ", ")
    .replace(/\s+/g, " ")
    .replace(/\s+-\s+/g, " - ")
    .trim();
}

export function formatResumeDocument(doc: ResumeDocument): ResumeDocument {
  return {
    ...doc,
    targetTitle: formatForPdf(doc.targetTitle),
    summary: formatForPdf(doc.summary),
    contact: {
      ...doc.contact,
      name: formatForPdf(doc.contact.name),
      email: doc.contact.email,
      phone: doc.contact.phone,
      location: formatForPdf(doc.contact.location),
    },
    experience: doc.experience.map((job) => ({
      ...job,
      company: formatForPdf(job.company),
      role: formatForPdf(job.role),
      start: formatForPdf(job.start),
      end: formatForPdf(job.end),
      location: job.location ? formatForPdf(job.location) : job.location,
      bullets: job.bullets.map(formatForPdf),
    })),
    projects: doc.projects.map((project) => ({
      ...project,
      title: formatForPdf(project.title),
      description: formatForPdf(project.description),
      highlights: project.highlights.map(formatForPdf),
    })),
    skills: doc.skills.map((group) => ({
      ...group,
      name: formatForPdf(group.name),
      skills: group.skills.map(formatForPdf),
    })),
    education: doc.education.map((edu) => ({
      ...edu,
      school: formatForPdf(edu.school),
      degree: formatForPdf(edu.degree),
      field: formatForPdf(edu.field),
      end: formatForPdf(edu.end),
      location: edu.location ? formatForPdf(edu.location) : edu.location,
    })),
  };
}
