export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'data_ai';

export interface CaseStudy {
  context: string;
  problem: string;
  solution: string;
  architecture: string[];
  metrics?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: ProjectCategory;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  caseStudy?: CaseStudy;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  note?: string;
}

export interface Education {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  skills: string[];
  note?: string;
}

export interface SkillCategory {
  number: string;
  title: string;
  tagline: string;
  note?: string;
  skills: { name: string; description: string; highlight?: boolean }[];
}

export interface PortfolioData {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  skillsCategories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  complementaryEducation: Education[];
  courses?: Education[];
}
