export interface Project {
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "efokou-labs GitOps Platform",
    description:
      "Scattered demos lived in one-off repos and cloud accounts. I built a reproducible lab with kind, Argo CD, Terraform modules, and sample workloads so any engineer can bootstrap a full stack from a fresh clone.",
    highlights: [
      "One kind cluster deploys Next.js, FastAPI, Postgres, and Redis through Argo CD overlays",
      "Terraform modules run create-and-destroy tests in CI; AWS demos are torn down after each run",
    ],
    technologies: [
      "Kubernetes",
      "Argo CD",
      "Terraform",
      "AWS",
      "GitHub Actions",
      "Python",
      "FastAPI",
      "Next.js",
    ],
    github: "https://github.com/efokou-labs",
    demo: "https://efokou-labs.github.io/system-design-notes/",
    image: "/images/cloud-infra.svg",
    featured: true,
  },
  {
    title: "Enterprise Observability Rollout",
    description:
      "Production microservices had fragmented metrics and logs, slowing incident response. I led rollout of Prometheus, Grafana, ELK, and PagerDuty alerting across distributed services.",
    highlights: [
      "Unified dashboards and alerting improved detection and resolution across service boundaries",
      "Centralized log pipelines in ELK and CloudWatch shortened root-cause analysis during outages",
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
    featured: true,
  },
  {
    title: "Cloud Infrastructure Automation",
    description:
      "Manual provisioning and inconsistent releases blocked multiple engineering teams. I standardized Terraform, Ansible, and CI/CD pipelines for auditable, repeatable delivery.",
    highlights: [
      "IaC replaced manual environment setup with version-controlled, repeatable provisioning",
      "Shared Jenkins and GitHub Actions patterns increased release cadence across teams",
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
    title: "Agentic AI Platform",
    description:
      "LLM workflows needed grounding, guardrails, and ops visibility. I built orchestration for tool use, RAG, and telemetry wired into existing Prometheus and Grafana stacks.",
    highlights: [
      "Multi-step agents with tool routing and human-in-the-loop checkpoints for reliable completions",
      "RAG and evaluation harnesses grounded answers in internal docs; latency and cost tracked in production",
    ],
    technologies: [
      "Python",
      "LangChain",
      "OpenAI API",
      "RAG",
      "Vector DB",
      "FastAPI",
      "Kubernetes",
      "Prometheus",
      "Grafana",
    ],
    image: "/images/agentic-ai.svg",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
