export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [];
