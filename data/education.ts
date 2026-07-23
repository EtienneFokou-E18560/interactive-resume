export interface Education {
  school: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  location?: string;
}

export const education: Education[] = [
  {
    school: "Kennesaw State University",
    degree: "Bachelor of Science",
    field: "Computer Science",
    start: "2012",
    end: "2016",
    location: "Kennesaw, GA",
  },
];
