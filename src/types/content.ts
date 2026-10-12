export type ContentStatus = "draft" | "verified" | "published";

export type EvidenceMetric = {
  id: string;
  value: string;
  label: string;
  context: string;
  status: ContentStatus;
};

export type Domain = "frontend" | "backend" | "data" | "ai";

export type SkillItem = {
  id: string;
  label: string;
  domain: Domain;
  projectIds: string[];
  context: string;
  status: ContentStatus;
};

export type ProjectCase = {
  id: string;
  title: string;
  subtitle: string;
  category: Domain[];
  categoryLabel: string;
  headline: string;
  problem: string;
  role: string;
  decisions: string[];
  technologies: string[];
  techIds: string[];
  evidence: string[];
  coverImage: string;
  features: string[];
  links: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
  featured: boolean;
  status: ContentStatus;
  caseStudy: {
    situation: string;
    context: string;
    problem: string;
    implication: string;
    solution: string;
    technicalDecision: string;
    evidence: string;
    learning: string;
    architecture: string[];
    metrics: string;
  };
};

export type ExperienceLane = "work" | "projects" | "data-ai";

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  year: number;
  lane: ExperienceLane;
  description: string;
  note: string;
  achievements: string[];
  techIds: string[];
  status: ContentStatus;
};

export type EducationTier = "degree" | "extensive" | "specialization" | "complementary";

export type EducationItem = {
  id: string;
  title: string;
  institution: string;
  year: string;
  tier: EducationTier;
  description: string;
  note?: string;
  skills: string[];
  status: ContentStatus;
};

export type Point = {
  x: number; // percentage or viewport unit
  y: number;
};

export type BirdPath = {
  id: string;
  sectionId: string;
  entry: Point;
  controlPoints: Point[];
  rest: Point;
  exit?: Point;
  duration: number;
  easing: string;
  speech?: string;
  speechDelay?: number;
};
