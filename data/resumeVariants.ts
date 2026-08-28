export interface ResumeVariant {
  id: string;
  label: string;
  description: string;
  targetTitle: string;
  summary: string;
  skillCategoryOrder: string[];
  featuredProjectTitles: string[];
  experienceEmphasis?: Record<string, number[]>;
}

const PLATFORM_SKILLS = [
  "Platform and Cloud Engineering",
  "Infrastructure Automation",
  "Reliability and Observability",
  "Backend and Distributed Systems",
  "Production AI Workflows",
];

export const resumeVariants: ResumeVariant[] = [
  {
    id: "senior-platform-engineer",
    label: "Senior Platform Engineer",
    description:
      "Reliable cloud platforms, developer tooling, observability, and production AI.",
    targetTitle: "Senior Platform Engineer",
    summary:
      "Senior Platform Engineer with 10+ years at Microsoft, Gartner, and Aflac building cloud platforms and developer tooling that reduce toil and help teams ship safely. Experienced across AWS, Azure, and GCP with infrastructure automation, CI/CD, observability, and production AI workflows.",
    skillCategoryOrder: PLATFORM_SKILLS,
    featuredProjectTitles: [
      "efokou-labs GitOps Platform",
      "Enterprise Observability Rollout",
      "Agentic AI Platform",
    ],
  },
  {
    id: "senior-software-engineer",
    label: "Senior Software Engineer",
    description:
      "Balanced software engineering, platform work, and delivery across the stack.",
    targetTitle: "Senior Software Engineer",
    summary:
      "Senior Software Engineer with 10+ years at Microsoft, Gartner, and Aflac building distributed systems, cloud platforms, and automation that teams can ship on and operate with confidence. Experienced across backend services, CI/CD, infrastructure as code, observability, and Agentic AI workflows on AWS, Azure, and GCP.",
    skillCategoryOrder: [
      "Backend and Distributed Systems",
      "Platform and Cloud Engineering",
      "Infrastructure Automation",
      "Reliability and Observability",
    ],
    featuredProjectTitles: [
      "efokou-labs GitOps Platform",
      "Enterprise Observability Rollout",
      "Agentic AI Platform",
    ],
  },
  {
    id: "sre",
    label: "Site Reliability Engineer",
    description:
      "Reliability, observability, incident response, and on-call leadership.",
    targetTitle: "Site Reliability Engineer",
    summary:
      "Site Reliability Engineer with 10+ years improving production reliability across Microsoft, Gartner, and Aflac. Deep experience in observability (Prometheus, Grafana, Datadog, ELK), incident response, on-call operations, and automation that reduces MTTD and MTTR for distributed systems on AWS, Azure, and GCP.",
    skillCategoryOrder: [
      "Reliability and Observability",
      "Infrastructure Automation",
      "Platform and Cloud Engineering",
      "Backend and Distributed Systems",
    ],
    featuredProjectTitles: [
      "Enterprise Observability Rollout",
      "efokou-labs GitOps Platform",
    ],
    experienceEmphasis: {
      Gartner: [4, 5, 0, 1],
      Microsoft: [4, 5, 1, 3],
      Aflac: [3, 4, 0],
    },
  },
  {
    id: "devops-platform",
    label: "DevOps / Platform Engineer",
    description: "CI/CD, GitOps, IaC, and developer platform automation.",
    targetTitle: "DevOps / Platform Engineer",
    summary:
      "DevOps and Platform Engineer with 10+ years standardizing delivery pipelines, infrastructure as code, and self-service platforms at Microsoft, Gartner, and Aflac. Strong in Terraform, Ansible, Kubernetes, GitHub Actions, Jenkins, and GitOps practices across AWS, Azure, and GCP.",
    skillCategoryOrder: [
      "Infrastructure Automation",
      "Platform and Cloud Engineering",
      "Backend and Distributed Systems",
      "Reliability and Observability",
    ],
    featuredProjectTitles: [
      "efokou-labs GitOps Platform",
      "Cloud Infrastructure Automation",
    ],
    experienceEmphasis: {
      Gartner: [1, 2, 3, 0],
      Microsoft: [2, 0, 1],
      Aflac: [0, 2, 1],
    },
  },
  {
    id: "cloud-infrastructure",
    label: "Cloud Infrastructure Engineer",
    description:
      "Multi-cloud provisioning, IaC, and repeatable environment delivery.",
    targetTitle: "Cloud Infrastructure Engineer",
    summary:
      "Cloud Infrastructure Engineer with 10+ years designing and automating AWS, Azure, and GCP environments at Microsoft, Gartner, and Aflac. Expert in Terraform, Ansible, ECS, Kubernetes, and cloud migration initiatives that replace manual setup with auditable, version-controlled infrastructure.",
    skillCategoryOrder: [
      "Platform and Cloud Engineering",
      "Infrastructure Automation",
      "Backend and Distributed Systems",
      "Reliability and Observability",
    ],
    featuredProjectTitles: [
      "Cloud Infrastructure Automation",
      "efokou-labs GitOps Platform",
    ],
    experienceEmphasis: {
      Gartner: [2, 3, 0],
      Microsoft: [0, 5, 2],
      Aflac: [0, 1, 2],
    },
  },
  {
    id: "backend-engineer",
    label: "Backend Engineer",
    description: "Distributed services, APIs, and scalable backend systems.",
    targetTitle: "Backend Engineer",
    summary:
      "Backend Engineer with 10+ years building scalable services and distributed systems at Microsoft, Gartner, and Aflac. Proficient in Python, Go, Java, and cloud-native architectures with strong platform fundamentals in CI/CD, containers, and observability for production workloads.",
    skillCategoryOrder: [
      "Backend and Distributed Systems",
      "Platform and Cloud Engineering",
      "Infrastructure Automation",
      "Reliability and Observability",
    ],
    featuredProjectTitles: [
      "efokou-labs GitOps Platform",
      "Agentic AI Platform",
    ],
    experienceEmphasis: {
      Gartner: [0, 3, 1],
      Microsoft: [0, 2, 3],
      Aflac: [2, 5],
    },
  },
  {
    id: "agentic-ai-platform",
    label: "Platform Engineer, Agentic AI",
    description:
      "LLM orchestration, RAG, guardrails, and AI in production workflows.",
    targetTitle: "Platform Engineer, Agentic AI",
    summary:
      "Platform Engineer specializing in Agentic AI and LLM workflows with 10+ years of cloud and SRE experience at Microsoft, Gartner, and Aflac. Builds production orchestration for tool use, RAG, evaluation harnesses, and observability integration so AI capabilities augment real engineering workflows safely.",
    skillCategoryOrder: [
      "Production AI Workflows",
      "Backend and Distributed Systems",
      "Reliability and Observability",
      "Platform and Cloud Engineering",
    ],
    featuredProjectTitles: [
      "Agentic AI Platform",
      "efokou-labs GitOps Platform",
    ],
    experienceEmphasis: {
      Gartner: [0, 4, 5],
      Microsoft: [1, 2, 4],
      Aflac: [5, 2],
    },
  },
];

export const defaultResumeVariantId = "senior-platform-engineer";

export function getResumeVariant(id: string): ResumeVariant | undefined {
  return resumeVariants.find((v) => v.id === id);
}

export function isValidResumeVariantId(id: string): boolean {
  return resumeVariants.some((v) => v.id === id);
}
