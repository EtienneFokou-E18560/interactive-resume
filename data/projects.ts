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
    description: "Bus reservation platform with real-time seat availability and mobile booking.",
    technologies: ["React Native", "Node.js", "MongoDB"],
    github: "https://github.com/EtienneFokou-E18560/mapan",
    image: "/images/mapan.svg",
  },
  {
    title: "Payment SaaS",
    description: "Multi-tenant payment processing platform with subscription billing.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Docker"],
    github: "https://github.com/EtienneFokou-E18560/payment-saas",
    image: "/images/payment-saas.svg",
  },
  {
    title: "Kubernetes Dashboard",
    description: "Custom cluster monitoring dashboard with pod metrics and log aggregation.",
    technologies: ["React", "Kubernetes", "Prometheus", "Grafana"],
    github: "https://github.com/EtienneFokou-E18560/k8s-dashboard",
    image: "/images/k8s-dashboard.svg",
  },
  {
    title: "AI Monitoring Platform",
    description: "Anomaly detection for application logs using ML-based alerting.",
    technologies: ["Python", "FastAPI", "Azure", "TensorFlow"],
    github: "https://github.com/EtienneFokou-E18560/ai-monitoring",
    image: "/images/ai-monitoring.svg",
  },
  {
    title: "Log Parser Dashboard",
    description: "Interactive log analysis tool with search, filtering, and visualization.",
    technologies: ["React", "Elasticsearch", "Node.js", "Docker"],
    github: "https://github.com/EtienneFokou-E18560/log-parser",
    image: "/images/log-parser.svg",
  },
];
