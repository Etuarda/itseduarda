export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'data_ai' | 'dados' | 'ia';

export interface CaseStudy {
  situation?: string;
  context?: string;
  problem: string;
  implication?: string;
  solution: string;
  technicalDecision?: string;
  evidence?: string;
  learning?: string;
  architecture?: string[];
  metrics?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  categoryLabel?: string;
  headline?: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: ProjectCategory;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  caseStudy?: CaseStudy;
  ctaText?: string;
  ctaExternalText?: string;
  githubText?: string;
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
