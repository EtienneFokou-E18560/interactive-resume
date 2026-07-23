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
    school: "Georgia Institute of Technology",
    degree: "Master of Science",
    field: "Computer Science",
    start: "2016",
    end: "2018",
    location: "Atlanta, GA",
  },
  {
    school: "University of Georgia",
    degree: "Bachelor of Science",
    field: "Computer Science",
    start: "2012",
    end: "2016",
    location: "Athens, GA",
  },
];
