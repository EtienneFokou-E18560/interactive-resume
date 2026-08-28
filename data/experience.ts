export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  url?: string;
  /** One-line scope for the role */
  scope?: string;
  description: string[];
  technologies?: string[];
}

export const experience: Experience[] = [
  {
    company: "Gartner",
    role: "Senior Software Engineer",
    start: "Jul 2025",
    end: "Present",
    location: "Remote",
    url: "https://www.gartner.com",
    scope:
      "Platform and backend delivery for enterprise research and data systems.",
    description: [
      "Designing distributed backend services for enterprise research platforms that support global product surfaces",
      "Standardized CI/CD with GitHub Actions and Jenkins for faster time-to-production across multiple engineering teams",
      "Implemented Terraform infrastructure as code across AWS and Azure for faster, repeatable environment provisioning",
      "Containerized microservices with Docker and Kubernetes to improve portability and scale for production workloads",
      "Integrated Prometheus, Grafana, and Datadog for proactive monitoring aimed at lower MTTR",
      "Leading on-call rotations, incident response, and blameless post-mortems with automation that reduces recurring toil",
    ],
    technologies: [
      "AWS",
      "Azure",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Python",
      "Go",
      "GitHub Actions",
      "Jenkins",
      "Prometheus",
      "Grafana",
      "Datadog",
    ],
  },
  {
    company: "Microsoft",
    role: "Software Engineer II",
    start: "May 2022",
    end: "Jun 2025",
    location: "Redmond, WA",
    url: "https://www.microsoft.com",
    scope:
      "Azure platform reliability, automation, and delivery for critical enterprise services.",
    description: [
      "Operated Azure cloud infrastructure for critical enterprise services with high-availability targets across multiple service boundaries",
      "Built automation in Python, Bash, and Go for monitoring, deployment, and incident response, reducing manual effort in each release cycle",
      "Optimized CI/CD pipelines that accelerated delivery for multiple engineering teams",
      "Drove capacity planning and performance tuning under peak load to keep latency and throughput within targets",
      "Strengthened cloud-native observability and alerting to catch issues earlier and drive lower MTTD and MTTR",
      "Implemented disaster recovery and continuity plans meeting defined RTO and RPO targets for production systems",
    ],
    technologies: [
      "Azure",
      "Python",
      "Go",
      "Bash",
      "Terraform",
      "Kubernetes",
      "Docker",
      "CI/CD",
    ],
  },
  {
    company: "Aflac",
    role: "Systems Engineer",
    start: "Aug 2016",
    end: "May 2022",
    location: "Columbus, GA",
    url: "https://www.aflac.com",
    scope:
      "Platform automation, AWS migration proofs, and self-service delivery for enterprise systems teams.",
    description: [
      "Automated Docker, Jenkins, and Akana cluster updates with Ansible for faster platform maintenance with less manual toil",
      "Led an AWS migration proof of concept with AWS Proton and ECS templates, validating version-controlled paths for multiple environments",
      "Designed self-service CI/CD so developers could build and deploy independently with faster release cadence",
      "Authored RACI docs and runbooks that supported lower average incident resolution time",
      "Supported load testing, penetration testing, and infrastructure validation for reliability and security gates",
      "Partnered with cross-functional teams to evaluate emerging technologies and recommend platform improvements",
    ],
    technologies: [
      "AWS",
      "Ansible",
      "Docker",
      "Jenkins",
      "AWS Proton",
      "ECS",
      "Java",
      "Python",
    ],
  },
];
