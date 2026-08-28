export interface ResumeContact {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface ResumeExperienceEntry {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  bullets: string[];
  technologies: string[];
}

export interface ResumeProjectEntry {
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ResumeSkillGroup {
  name: string;
  skills: string[];
}

export interface ResumeEducationEntry {
  school: string;
  degree: string;
  field: string;
  end: string;
  location?: string;
}

export interface ResumeDocument {
  variantId: string;
  targetTitle: string;
  contact: ResumeContact;
  summary: string;
  experience: ResumeExperienceEntry[];
  projects: ResumeProjectEntry[];
  skills: ResumeSkillGroup[];
  education: ResumeEducationEntry[];
}
