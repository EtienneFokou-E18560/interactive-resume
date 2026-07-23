export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  url?: string;
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
    description: [
      "Designing scalable backend services and distributed systems for enterprise research and data platforms serving thousands of global clients",
      "Building CI/CD pipelines with GitHub Actions and Jenkins to improve deployment frequency and reduce time-to-production",
      "Implementing infrastructure as code with Terraform across AWS and Azure for version-controlled, repeatable provisioning",
      "Developing containerized microservices with Docker and Kubernetes to improve portability and scalability",
      "Integrating Prometheus, Grafana, and Datadog for proactive performance monitoring and MTTR reduction",
      "Leading on-call rotations, incident response, blameless post-mortems, and automation initiatives",
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
    description: [
      "Designed and maintained scalable Azure cloud infrastructure supporting critical enterprise services with high availability",
      "Developed automation tools in Python, Bash, and Go for monitoring, deployment, and incident response",
      "Built and optimized CI/CD pipelines to accelerate software delivery across multiple engineering teams",
      "Conducted capacity planning, performance analysis, and system tuning under peak load conditions",
      "Improved monitoring and alerting with cloud-native observability tools to proactively resolve issues",
      "Implemented disaster recovery and business continuity plans meeting defined RTO and RPO targets",
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
    description: [
      "Automated cluster creation and platform updates for Docker, Jenkins, and Akana using Ansible playbooks",
      "Led AWS cloud migration proof of concept using AWS Proton with ECS environment and service templates",
      "Designed self-service CI/CD pipeline capabilities enabling developers to independently build and deploy code",
      "Authored RACI documentation and operational runbooks, reducing average incident resolution time",
      "Supported load testing, penetration testing, and infrastructure validation for reliability and security",
      "Collaborated with cross-functional teams to evaluate emerging technologies and recommend improvements",
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
