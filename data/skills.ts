export interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

export const skills: SkillCategory[] = [
  {
    name: "Cloud Platforms",
    skills: [
      { name: "Azure", level: 90 },
      { name: "AWS", level: 85 },
      { name: "OCI", level: 75 },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    skills: [
      { name: "Terraform", level: 90 },
      { name: "Docker", level: 88 },
      { name: "Kubernetes", level: 82 },
    ],
  },
  {
    name: "Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 80 },
      { name: "PowerShell", level: 85 },
      { name: "TypeScript", level: 88 },
    ],
  },
];
