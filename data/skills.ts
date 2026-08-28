export interface Skill {
  name: string;
  /** Production context, years, or representative outcome — not a percentage */
  evidence: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    name: "Platform and Cloud Engineering",
    skills: [
      {
        name: "AWS",
        evidence:
          "Production ECS, Lambda, and migration proofs; IaC and CI/CD for enterprise environments",
      },
      {
        name: "Azure",
        evidence:
          "Platform operations for critical enterprise services, capacity planning, and DR targets",
      },
      {
        name: "GCP",
        evidence:
          "Multi-cloud delivery and platform patterns alongside AWS and Azure workloads",
      },
      {
        name: "Kubernetes",
        evidence:
          "Production platform operations, GitOps delivery, observability, and incident response",
      },
      {
        name: "Docker",
        evidence:
          "Containerized microservices and cluster automation across enterprise platforms",
      },
    ],
  },
  {
    name: "Infrastructure Automation",
    skills: [
      {
        name: "Terraform",
        evidence:
          "Version-controlled provisioning across AWS and Azure; module testing in CI",
      },
      {
        name: "Ansible",
        evidence:
          "Cluster creation and platform updates for Docker, Jenkins, and related tooling",
      },
      {
        name: "GitHub Actions",
        evidence:
          "Standardized CI/CD and create-and-destroy infrastructure tests",
      },
      {
        name: "Jenkins",
        evidence:
          "Enterprise pipelines and self-service developer delivery paths",
      },
      {
        name: "Argo CD",
        evidence:
          "GitOps overlays for reproducible lab and platform workloads (efokou-labs)",
      },
    ],
  },
  {
    name: "Reliability and Observability",
    skills: [
      {
        name: "Prometheus",
        evidence:
          "Metrics and alerting for distributed services and AI workflow telemetry",
      },
      {
        name: "Grafana",
        evidence:
          "Unified dashboards for production operations and MTTR reduction",
      },
      {
        name: "Datadog",
        evidence:
          "Enterprise monitoring and incident response alongside cloud-native stacks",
      },
      {
        name: "ELK Stack",
        evidence:
          "Centralized log pipelines for faster root-cause analysis during outages",
      },
      {
        name: "PagerDuty",
        evidence:
          "On-call alerting and incident workflows across service boundaries",
      },
    ],
  },
  {
    name: "Backend and Distributed Systems",
    skills: [
      {
        name: "Python",
        evidence:
          "Automation, services, and Agentic AI orchestration in production contexts",
      },
      {
        name: "Go",
        evidence:
          "Platform tooling, monitoring helpers, and cloud automation",
      },
      {
        name: "Java",
        evidence:
          "Enterprise systems engineering and platform integration work",
      },
      {
        name: "JavaScript / Node.js",
        evidence:
          "Full-stack delivery for portfolio platforms and developer-facing UIs",
      },
      {
        name: "Bash",
        evidence:
          "Operational automation for deployment, monitoring, and incident response",
      },
    ],
  },
  {
    name: "Production AI Workflows",
    skills: [
      {
        name: "LLM orchestration",
        evidence:
          "Multi-step agents with tool routing and human-in-the-loop checkpoints",
      },
      {
        name: "RAG",
        evidence:
          "Grounded answers over internal docs with evaluation harnesses",
      },
      {
        name: "Observability for AI",
        evidence:
          "Latency and cost telemetry wired into Prometheus and Grafana stacks",
      },
    ],
  },
];
