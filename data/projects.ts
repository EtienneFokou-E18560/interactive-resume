export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Mapan",
    description:
      "Bus ticket reservation and travel booking platform with real-time availability, booking confirmations, and payment processing across multiple transport providers.",
    technologies: [
      "Python",
      "REST APIs",
      "PostgreSQL",
      "SQL",
      "Automated Testing",
    ],
    github: "https://github.com/EtienneFokou-E18560/mapan",
    image: "/images/mapan.svg",
  },
  {
    title: "Cloud Infrastructure Automation",
    description:
      "Automated cloud infrastructure provisioning and CI/CD pipeline optimization using IaC and GitOps workflows across multiple engineering teams.",
    technologies: [
      "Terraform",
      "Ansible",
      "AWS ECS",
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "Python",
      "Bash",
    ],
    image: "/images/cloud-infra.svg",
  },
  {
    title: "Distributed System Monitoring",
    description:
      "Centralized observability platform with log aggregation pipelines across distributed microservices, reducing MTTD and MTTR for production services.",
    technologies: [
      "Prometheus",
      "Grafana",
      "Datadog",
      "ELK Stack",
      "AWS CloudWatch",
      "PagerDuty",
    ],
    image: "/images/observability.svg",
  },
];
