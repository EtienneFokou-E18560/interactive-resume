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
    image: "/images/mapan.png",
  },
  {
    title: "Payment SaaS",
    description: "Multi-tenant payment processing platform with subscription billing.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Docker"],
    github: "https://github.com/EtienneFokou-E18560/payment-saas",
    image: "/images/payment-saas.png",
  },
  {
    title: "Kubernetes Dashboard",
    description: "Custom cluster monitoring dashboard with pod metrics and log aggregation.",
    technologies: ["React", "Kubernetes", "Prometheus", "Grafana"],
    github: "https://github.com/EtienneFokou-E18560/k8s-dashboard",
    image: "/images/k8s-dashboard.png",
  },
  {
    title: "AI Monitoring Platform",
    description: "Anomaly detection for application logs using ML-based alerting.",
    technologies: ["Python", "FastAPI", "Azure", "TensorFlow"],
    github: "https://github.com/EtienneFokou-E18560/ai-monitoring",
    image: "/images/ai-monitoring.png",
  },
  {
    title: "Log Parser Dashboard",
    description: "Interactive log analysis tool with search, filtering, and visualization.",
    technologies: ["React", "Elasticsearch", "Node.js", "Docker"],
    github: "https://github.com/EtienneFokou-E18560/log-parser",
    image: "/images/log-parser.png",
  },
];
