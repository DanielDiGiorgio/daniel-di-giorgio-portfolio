export interface ProfileContent {
  heroIntro: string;

  intro: {
    greeting: string;
    paragraphs: readonly string[];
  };

  final: {
    title: string;
    paragraphs: readonly string[];
  };

  contact: {
    linkedin: string;
    email: string;
    whatsapp: string;
  };
}

export interface CareerStep {
  title: string;
  date: string;
}

export interface CareerChapter {
  id: string;
  company: string;
  title: string;
  narrative: string;
  image: string | null;
  backgroundEffect: string;
  steps: readonly CareerStep[];
}

export interface CareerTimelineItem {
  company: string;
  role: string;
  start: string;
  end: string;
  logo: string;
  description: string;
}

export interface CareerContent {
  chapters: readonly CareerChapter[];
  timeline: readonly CareerTimelineItem[];
}

export interface ProjectItem {
  title: string;
  description: string;
  link?: string;
}

export interface ProjectsContent {
  items: readonly ProjectItem[];
}

export interface HowIThinkContent {
  thoughts: readonly string[];
}

export interface HowIThinkCardItem {
  id: string;
  title: string;
  text: string;
}

export interface CurrentlyContent {
  items: readonly string[];
}
