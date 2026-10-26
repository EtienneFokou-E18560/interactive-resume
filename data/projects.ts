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
    slug: "askel",
    title: "Askel Job-Search Workspace",
    classification: "deployed",
    description:
      "Job seekers lose track of applications and interviews buried in their inbox. I built and run Askel, a production app that reads Gmail and Calendar, proposes board updates for review, and keeps every application, interview and contact in one place.",
    highlights: [
      "Live at getaskel.com with separate staging and production, 495 merged pull requests since Aug 2026",
      "3,467 automated tests, plus an email classifier checked against a set of 7,000 real recruiting emails",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Auth.js",
      "Neon Postgres",
      "Vercel",
      "GitHub Actions",
      "Claude API",
      "React Native",
    ],
    demo: "https://www.getaskel.com",
    image: "/images/ai-monitoring.svg",
    featured: true,
    caseStudy: {
      problem:
        "A job search spreads across email threads, calendar invites and booking links. Updating a tracker by hand falls behind within a week, and a missed recruiter reply can cost an offer.",
      role: "Founder and sole engineer at CIE LTD: product, architecture, code, infrastructure, releases and support.",
      decisions: [
        "Sync proposes, the user accepts: email and calendar changes land in a Review Queue, and opt-in auto-apply for clear cases can always be undone",
        "Rule-based email classifier first, with optional Claude passes for polish and questions, so the core works without a model call",
        "Browser working copy plus a Neon-backed board with optimistic concurrency, so two devices stay in step without losing edits",
        "Gmail access through InboxLink, a separate connector service, instead of mail code inside the app",
      ],
      tradeoffs: [
        "Asking the user to accept changes is slower than full automation, but nothing changes on the board without the user seeing it",
        "Read-only mail and calendar scopes limit features (no sending on the user's behalf) in exchange for a smaller security surface",
      ],
      reliability:
        "Every pull request runs lint, type checks, the full test suite and a production build; changes go to staging before production, and classifier changes are scored against the real-mail test set before merge.",
      results: [
        "A production app with web, installable PWA and phone builds, shipped by one engineer",
        "Classifier regressions are caught before release by fixtures taken from real recruiting email",
      ],
    },
  },
  {
    slug: "inboxlink",
    title: "InboxLink Gmail Connector",
    classification: "deployed",
    description:
      "Every app that reads Gmail rebuilds the same OAuth, token refresh and message parsing. I built InboxLink, a standalone connector service with a typed SDK, so an app gets mail through one small API.",
    highlights: [
      "Open source, with @inboxlink/core and @inboxlink/sdk published on npm",
      "Powers Askel's mail reading in production; 92 merged pull requests since Sep 2026",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "Next.js",
      "Gmail API",
      "OAuth 2.0",
      "Neon Postgres",
      "Vercel",
      "npm",
    ],
    github: "https://github.com/EtienneFokou-E18560/inboxlink",
    demo: "https://inboxlink.cieltd.org",
    image: "/images/log-parser.svg",
    featured: true,
    caseStudy: {
      problem:
        "Gmail access means OAuth consent, encrypted token storage, refresh, rate limits and MIME parsing. Keeping that inside a product app mixes a security-sensitive service with product code.",
      role: "Designed, built and operate the service, its SDK, docs site and npm releases.",
      decisions: [
        "A separate service with its own database and an encrypted token vault, so mail tokens never live in the product app",
        "OAuth with PKCE, and server-to-server calls with a shared secret plus webhooks so the app hears about new mail",
        "A typed SDK on npm, published from GitHub Actions with OIDC (id-token) and provenance instead of long-lived npm tokens",
      ],
      tradeoffs: [
        "Another service to deploy and monitor, in exchange for a clear security boundary and reuse across apps",
        "A small, stable API surface over full Gmail coverage; IMAP and Microsoft adapters are parked until there is demand",
      ],
      reliability:
        "CI runs lint, type checks, tests and CodeQL; a scheduled smoke test checks production health; a docs check blocks any release whose changelog, README and website SDK page don't match the new version.",
      results: [
        "Askel's production mail reading runs through InboxLink",
        "Any new app can add Gmail with the SDK instead of writing its own OAuth and parsing",
      ],
    },
  },
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
