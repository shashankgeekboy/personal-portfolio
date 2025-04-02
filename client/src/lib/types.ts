// Project type
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  url?: string;
  github?: string;
}

// Testimonial type
export interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  testimonial: string;
  avatar: string;
  rating: number;
  date: string;
}

// Service type
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Animation Variants
export interface AnimationVariants {
  hidden: object;
  visible: object;
}

// Contact Form Data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Navigation Item
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
