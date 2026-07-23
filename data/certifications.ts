export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: "Azure Solutions Architect Expert",
    issuer: "Microsoft",
    year: "2023",
  },
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    year: "2022",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    year: "2022",
  },
];
