
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export interface ServiceCategory {
  title: string;
  description: string;
  items: ServiceItem[];
}

export interface ServiceDetail {
  name: string;
  description: string;
  // Extended content for Deep Dive view
  fullDescription?: string[]; // Array of paragraphs for the main content
  features?: string[]; // List of key capabilities
  benefits?: string[]; // List of business benefits
  diagramUrl?: string; // Optional architecture diagram
  pillarTitle?: string; // Optional reference for flattened lists
}

export interface Pillar {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  iconName: string;
  icon?: LucideIcon;
  // We keep the simple string array for the card preview
  services: string[];
  // We add the detailed array for the full page view
  details: ServiceDetail[];
}

export interface ContactData {
  name: string;
  email: string;
  company: string;
  country: string;
  service: string;
  phoneCountryCode: string;
  phone: string;
  message: string;
}

export interface SystemStatus {
  label: string;
  color: string;
  code: string;
}

export interface Insight {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content?: string[]; // Array of paragraphs for the full article
  image?: string; // Optional header image
  link: string;
}
