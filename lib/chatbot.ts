import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { techStack } from "@/data/techStack";
import type { Locale } from "@/lib/i18n";

function match(message: string, keywords: string[]) {
  return keywords.some((k) => message.includes(k));
}

function formatExperience(): string {
  return experience
    .map((job) => {
      const bullets = job.description
        .slice(0, 2)
        .map((d) => `  • ${d}`)
        .join("\n");
      return `${job.role} @ ${job.company}\n  ${job.start} – ${job.end} · ${job.location ?? ""}\n${bullets}`;
    })
    .join("\n\n");
}

function formatProjects(): string {
  return projects
    .map((p) => {
      const bullets = p.highlights.map((h) => `  • ${h}`).join("\n");
      return `${p.title}\n  ${p.description}\n${bullets}`;
    })
    .join("\n\n");
}

function formatEducation(locale: Locale): string {
  return education
    .map((e) =>
      locale === "fr"
        ? `${e.degree} en ${e.field}\n  ${e.school} (${e.end}) · ${e.location ?? ""}`
        : `${e.degree} in ${e.field}\n  ${e.school} (${e.end}) · ${e.location ?? ""}`
    )
    .join("\n\n");
}

function companyDetail(company: string): string | null {
  const job = experience.find((e) =>
    e.company.toLowerCase().includes(company)
  );
  if (!job) return null;

  return [
    `${job.role} @ ${job.company}`,
    `${job.start} – ${job.end} · ${job.location ?? ""}`,
    "",
    ...job.description.map((d) => `• ${d}`),
    "",
    `Technologies: ${job.technologies?.join(", ") ?? "N/A"}`,
  ].join("\n");
}

export function getChatbotResponse(message: string, locale: Locale): string {
  const msg = message.toLowerCase().trim();

  if (match(msg, ["hello", "hi", "hey", "bonjour", "salut"])) {
    return locale === "fr"
      ? `Bonjour ! Je suis l'assistant de ${profile.name}. Posez-moi des questions sur l'expérience, les projets, les compétences ou le contact.`
      : `Hello! I'm ${profile.name}'s resume assistant. Ask me about experience, projects, skills, or contact info.`;
  }

  if (match(msg, ["gartner"])) return companyDetail("gartner") ?? formatExperience();
  if (match(msg, ["microsoft"])) return companyDetail("microsoft") ?? formatExperience();
  if (match(msg, ["aflac"])) return companyDetail("aflac") ?? formatExperience();

  if (
    match(msg, [
      "experience",
      "work",
      "job",
      "career",
      "emploi",
      "expérience",
      "travail",
    ])
  ) {
    return locale === "fr"
      ? `${profile.name} est ${profile.title} avec 7+ ans d'expérience.\n\n${formatExperience()}`
      : `${profile.name} is a ${profile.title} with 7+ years of experience.\n\n${formatExperience()}`;
  }

  if (
    match(msg, [
      "project",
      "mapan",
      "monitoring",
      "observability",
      "infrastructure",
      "automation",
      "projet",
    ])
  ) {
    if (msg.includes("mapan")) {
      const p = projects.find((x) => x.title === "Mapan");
      if (p) {
        return [p.title, p.description, "", ...p.highlights.map((h) => `• ${h}`)].join(
          "\n"
        );
      }
    }
    return formatProjects();
  }

  if (
    match(msg, [
      "skill",
      "tech",
      "stack",
      "compétence",
      "technologie",
      "tools",
    ])
  ) {
    return locale === "fr"
      ? `Compétences principales :\n${techStack.join(", ")}`
      : `Core skills:\n${techStack.join(", ")}`;
  }

  if (
    match(msg, [
      "education",
      "school",
      "degree",
      "university",
      "formation",
      "diplôme",
      "kennesaw",
    ])
  ) {
    return formatEducation(locale);
  }

  if (
    match(msg, [
      "contact",
      "email",
      "phone",
      "linkedin",
      "reach",
      "contacter",
      "téléphone",
    ])
  ) {
    return [
      `Name: ${profile.name}`,
      `Email: ${profile.email}`,
      `Phone: ${profile.phone}`,
      `Location: ${profile.location}`,
      `LinkedIn: ${profile.linkedin}`,
      `GitHub: ${profile.github}`,
    ].join("\n");
  }

  if (match(msg, ["about", "summary", "who", "intro", "à propos", "qui"])) {
    return [profile.summary, "", ...profile.highlights.map((h) => `• ${h}`)].join(
      "\n"
    );
  }

  if (match(msg, ["resume", "cv", "download", "télécharger"])) {
    return locale === "fr"
      ? `Vous pouvez télécharger le CV de ${profile.name} depuis la page d'accueil ou via /resume.pdf`
      : `You can download ${profile.name}'s resume from the home page or at /resume.pdf`;
  }

  if (match(msg, ["location", "where", "based", "où", "ville"])) {
    return locale === "fr"
      ? `${profile.name} est basé à ${profile.location}.`
      : `${profile.name} is based in ${profile.location}.`;
  }

  if (match(msg, ["help", "aide", "commands", "commandes"])) {
    return locale === "fr"
      ? `Commandes suggérées :\n• expérience\n• projets\n• compétences\n• formation\n• contact\n• à propos\n• Gartner / Microsoft / Aflac`
      : `Try asking about:\n• experience\n• projects\n• skills\n• education\n• contact\n• about\n• Gartner / Microsoft / Aflac`;
  }

  return locale === "fr"
    ? `Je peux répondre sur l'expérience, les projets, les compétences, la formation et le contact. Essayez « expérience » ou « projets ».`
    : `I can answer questions about experience, projects, skills, education, and contact. Try "experience" or "projects".`;
}

export function getChatbotGreeting(locale: Locale): string {
  return locale === "fr"
    ? `Bonjour ! Je suis l'assistant de ${profile.name}. Demandez-moi sur l'expérience, les projets, les compétences ou le contact.`
    : `Hi! I'm ${profile.name}'s resume assistant. Ask me about experience, projects, skills, or contact info.`;
}

export const chatbotSuggestions = {
  en: ["Experience", "Projects", "Skills", "Contact"],
  fr: ["Expérience", "Projets", "Compétences", "Contact"],
};
