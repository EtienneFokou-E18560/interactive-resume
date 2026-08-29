export type ProjectClassification =
  | "deployed"
  | "portfolio"
  | "case-study"
  | "reference-architecture";

export const projectClassificationLabels: Record<ProjectClassification, string> = {
  deployed: "Deployed project",
  portfolio: "Public engineering portfolio",
  "case-study": "Technical case study",
  "reference-architecture": "Reference architecture",
};

export interface ProjectCaseStudy {
  problem: string;
  role: string;
  decisions: string[];
  tradeoffs: string[];
  reliability: string;
  results: string[];
}

export interface Project {
  slug: string;
  title: string;
  classification: ProjectClassification;
  description: string;
  highlights: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
  caseStudy?: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    slug: "efokou-labs",
    title: "efokou-labs GitOps Platform",
    classification: "portfolio",
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
    caseStudy: {
      problem:
        "Demos and experiments were spread across one-off repos and cloud accounts, so onboarding a full stack meant tribal knowledge and manual setup.",
      role: "Sole designer and implementer of the lab platform, modules, sample apps, and CI teardown patterns.",
      decisions: [
        "Standardize on kind + Argo CD overlays so a single cluster path covers app and infra demos",
        "Keep Terraform modules testable with create-and-destroy CI so cloud demos do not leave orphan resources",
        "Document architecture decisions alongside runnable workloads rather than slides alone",
      ],
      tradeoffs: [
        "Local kind favors fast iteration over production multi-tenant realism",
        "AWS demos are intentionally ephemeral - less long-lived showcase, more honest teardown hygiene",
      ],
      reliability:
        "CI validates modules; GitOps overlays keep app deployment declarative; AWS resources are torn down after each run.",
      results: [
        "Engineers can bootstrap a full stack from a fresh clone without bespoke setup notes",
        "Infrastructure demos stay auditable and disposable - CI teardown avoids leftover cloud resources",
      ],
    },
  },
  {
    slug: "enterprise-observability",
    title: "Enterprise Observability Rollout",
    classification: "case-study",
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
    caseStudy: {
      problem:
        "Metrics and logs were fragmented across services, which slowed detection and lengthened incident resolution.",
      role: "Led observability rollout and alerting patterns across distributed production services.",
      decisions: [
        "Consolidate on Prometheus/Grafana for metrics with ELK and CloudWatch for logs",
        "Wire PagerDuty so on-call routes to actionable alerts rather than noisy thresholds",
      ],
      tradeoffs: [
        "Enterprise tooling constraints limited a single-vendor stack; multi-tool integration was required",
        "Public code cannot be shared; this remains a technical case study without an open repository",
      ],
      reliability:
        "Dashboards and alert routes aim to reduce MTTD/MTTR; runbooks and on-call practices accompany the tooling.",
      results: [
        "Unified visibility across service boundaries",
        "Earlier detection and clearer ownership in support of lower MTTR",
      ],
    },
  },
  {
    slug: "cloud-infrastructure-automation",
    title: "Cloud Infrastructure Automation",
    classification: "case-study",
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
    caseStudy: {
      problem:
        "Manual provisioning and inconsistent release paths blocked multiple engineering teams.",
      role: "Standardized IaC and pipeline patterns used across teams for environment delivery.",
      decisions: [
        "Prefer Terraform and Ansible for auditable, version-controlled environments",
        "Share Jenkins and GitHub Actions templates so teams inherit the same delivery path",
      ],
      tradeoffs: [
        "Standardization reduces one-off flexibility but cuts drift and review cost",
        "Details remain generalized where employer confidentiality applies",
      ],
      reliability:
        "Repeatable provisioning and shared pipelines reduce snowflake environments and failed handoffs.",
      results: [
        "Faster provisioning for repeatable environments through version-controlled IaC",
        "Faster release cadence for multiple adopting engineering teams via shared pipeline patterns",
      ],
    },
  },
  {
    slug: "agentic-ai-platform",
    title: "Agentic AI Platform",
    classification: "reference-architecture",
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
    featured: true,
    caseStudy: {
      problem:
        "LLM workflows lacked grounding, guardrails, and the same ops visibility teams expect from production services.",
      role: "Designed and built orchestration, RAG evaluation, and telemetry integration as a reference architecture for production-minded AI workflows.",
      decisions: [
        "Treat agents as multi-step workflows with tool routing and human-in-the-loop checkpoints",
        "Ground answers with RAG and evaluation harnesses instead of unconstrained prompts",
        "Export latency and cost into existing Prometheus/Grafana stacks rather than a separate AI-only console",
      ],
      tradeoffs: [
        "Human checkpoints improve reliability at the cost of full automation speed",
        "This is a reference architecture and demonstration path - not a claim of a large public SaaS deployment",
      ],
      reliability:
        "Guardrails, evaluation, and shared observability make failure modes visible the same way other services are operated.",
      results: [
        "Reliable multi-step completions with explicit tool boundaries",
        "Latency and cost tracked alongside platform telemetry for production visibility",
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudyProjects(): Project[] {
  return projects.filter((p) => Boolean(p.caseStudy));
}
