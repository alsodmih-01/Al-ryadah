export type Tool = { title: string; description?: string; href?: string; icon?: string; };
export type JourneyStep = { title: string; description?: string; };
export type FAQ = { question: string; answer: string; };

export type Doctor = { 
  _id: string; 
  name: string; 
  specialty?: string; 
  department?: string; 
  image?: any; 
  days?: string; 
  time?: string; 
  isCosmetic?: boolean; 
};

export type Department = {
  _id: string; title: string; description?: string; image?: any; emergencyInfo?: string;
  trustIndicators?: { title: string; description?: string; icon?: string; }[];
  conditions?: string[];
  symptoms?: { title: string; description?: string; emergency?: boolean; }[];
  services?: { name: string; description?: string; }[];
  procedures?: { name: string; description?: string; }[];
  technologies?: string[];
  equipment?: { name: string; description?: string; image?: any; }[];
  emergencyRedFlags?: { title: string; description?: string; }[];
  patientJourney?: JourneyStep[];
  beforeVisit?: string[];
  afterCare?: string[];
  tools?: Tool[];
  videos?: { title: string; description?: string; url?: string; thumbnail?: any; }[];
  faqs?: FAQ[];
  contact?: { phone?: string; extension?: string; location?: string; };
  ctaTitle?: string; ctaDescription?: string; slug: string;
};