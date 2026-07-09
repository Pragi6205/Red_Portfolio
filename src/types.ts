export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  color: string;
  accentColor: string;
  bgGradient: string;
  image: string;
  stats: { label: string; value: string }[];
  details: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  category: "Curiosity" | "Education" | "Experience" | "Launch" | "Future";
  description: string;
  details: string[];
  coordinates: { x: number; y: number };
}

export interface DnaSkill {
  name: string;
  percentage: number;
  description: string;
  color: string;
  geometry: "sphere" | "torus" | "box" | "cone" | "knot";
}

export interface ProcessPhase {
  id: number;
  title: string;
  icon: string;
  shortDescription: string;
  deliverables: string[];
  sketches: string[];
  aiPrompt?: string;
  interactiveMetric?: string;
}

export interface ToyItem {
  id: string;
  name: string;
  description: string;
  type: "particles" | "shader" | "gravity" | "typography" | "game";
}

export interface LabConcept {
  id: string;
  title: string;
  type: "wireframe" | "concept" | "daily" | "ai";
  description: string;
  date: string;
  visualCode?: string;
}

export interface FavoriteItem {
  category: "Books" | "Designers" | "Fonts" | "Music" | "Inspirations";
  title: string;
  meta: string;
}

export interface QuoteCard {
  id: string;
  text: string;
  author: string;
  category: "UX" | "AI" | "Creativity" | "Product Design";
}

export interface ToolItem {
  name: string;
  category: "Design" | "Development" | "Prototyping";
  iconName: string;
  level: number;
}
