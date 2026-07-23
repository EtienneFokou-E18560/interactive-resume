export interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

export const skills: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: [
      { name: "Python", level: 92 },
      { name: "Go", level: 85 },
      { name: "Java", level: 82 },
      { name: "C#", level: 78 },
      { name: "JavaScript/Node.js", level: 80 },
      { name: "Bash", level: 88 },
    ],
  },
  {
    name: "Cloud Platforms",
    skills: [
      { name: "AWS", level: 90 },
      { name: "Azure", level: 88 },
      { name: "GCP", level: 82 },
      { name: "AWS ECS/Lambda", level: 85 },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    skills: [
      { name: "Terraform", level: 90 },
      { name: "Ansible", level: 85 },
      { name: "Docker", level: 88 },
      { name: "Kubernetes", level: 84 },
      { name: "GitHub Actions", level: 88 },
      { name: "Jenkins", level: 85 },
    ],
  },
  {
    name: "Observability & Reliability",
    skills: [
      { name: "Prometheus", level: 88 },
      { name: "Grafana", level: 90 },
      { name: "Datadog", level: 85 },
      { name: "ELK Stack", level: 82 },
      { name: "PagerDuty", level: 80 },
    ],
  },
];
