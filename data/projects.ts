export interface Project {
  title: string;
  description: string;
  highlights: string[];
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
    highlights: [
      "Built backend API integrations for real-time ticket availability, booking confirmations, and payment processing",
      "Developed automated testing and monitoring scripts for reservation workflows, reducing booking failures",
      "Collaborated with cross-functional teams to optimize user experience and onboard new transport partners",
    ],
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
    highlights: [
      "Automated cloud infrastructure provisioning using Terraform and Ansible, reducing manual setup time",
      "Built and optimized CI/CD pipelines with Jenkins and GitHub Actions across engineering teams",
      "Ensured consistent, version-controlled deployments with repeatable infrastructure workflows",
    ],
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
    highlights: [
      "Implemented centralized observability with Prometheus and Grafana, reducing MTTD and MTTR",
      "Built log aggregation pipelines using ELK Stack and AWS CloudWatch for faster root cause analysis",
      "Integrated PagerDuty alerting for proactive incident detection across microservices",
    ],
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
