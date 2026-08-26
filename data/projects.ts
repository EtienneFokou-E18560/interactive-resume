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
    title: "efokou-labs engineering portfolio",
    description:
      "Public GitHub org for cloud, SRE, and GitOps work: one kind cluster, Argo CD, Terraform modules, and sample workloads instead of isolated demo accounts.",
    highlights: [
      "kind + Argo CD platform with GitOps overlays for Next.js, FastAPI, Postgres, and Redis",
      "Versioned Terraform modules with create-and-destroy tests; AWS used for demos, then torn down",
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
  {
    title: "Agentic AI Platform",
    description:
      "Orchestration layer for LLM-powered agents with tool use, retrieval, and guardrails for production workflows across cloud environments.",
    highlights: [
      "Designed multi-step agent workflows with tool routing, context management, and human-in-the-loop checkpoints for reliable task completion",
      "Built RAG pipelines and prompt/evaluation harnesses to ground agent responses in internal docs and reduce hallucinations",
      "Integrated agent telemetry with existing observability stacks for latency, cost, and failure-rate monitoring",
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
