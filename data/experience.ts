export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  description: string[];
  technologies?: string[];
}

export const experience: Experience[] = [
  {
    company: "Microsoft",
    role: "Software Engineer",
    start: "2022",
    end: "Present",
    location: "Atlanta, GA",
    description: [
      "Built cloud automation tools for enterprise infrastructure",
      "Developed observability dashboards and monitoring solutions",
      "Automated infrastructure provisioning with Terraform",
      "Collaborated on reliability improvements for production services",
    ],
    technologies: ["Azure", "Terraform", "Python", "PowerShell", "Kubernetes"],
  },
  {
    company: "Aflac",
    role: "Software Engineer",
    start: "2020",
    end: "2022",
    location: "Columbus, GA",
    description: [
      "Developed internal tools for insurance operations",
      "Implemented CI/CD pipelines for faster deployments",
      "Maintained and optimized legacy Java applications",
    ],
    technologies: ["Java", "AWS", "Docker", "Jenkins"],
  },
  {
    company: "Urgent2k",
    role: "Full Stack Developer",
    start: "2018",
    end: "2020",
    location: "Remote",
    description: [
      "Built web applications for healthcare scheduling",
      "Designed REST APIs and database schemas",
      "Delivered responsive front-end experiences with React",
    ],
    technologies: ["React", "Node.js", "MongoDB", "PostgreSQL"],
  },
];
