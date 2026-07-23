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
      { name: "GCP", level: 80 },
      { name: "OCI", level: 75 },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    skills: [
      { name: "Terraform", level: 90 },
      { name: "Docker", level: 88 },
      { name: "Kubernetes", level: 82 },
      { name: "GitHub Actions", level: 85 },
    ],
  },
  {
    name: "Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "Go", level: 78 },
      { name: "Java", level: 80 },
      { name: "PowerShell", level: 85 },
    ],
  },
  {
    name: "Observability & Data",
    skills: [
      { name: "Prometheus", level: 85 },
      { name: "Grafana", level: 88 },
      { name: "Elasticsearch", level: 80 },
      { name: "PostgreSQL", level: 82 },
    ],
  },
];
