// All TypeScript types for the HARU AIR application

export type ProductCategory = 'personal' | 'urban';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  shortDesc: string;
  fullDesc: string;
  specs: ProductSpec[];
  useCases: string[];
  image: string;
  gallery: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  author: string;
  tags: string[];
}

export interface Vacancy {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  isActive: boolean;
  createdAt: string;
}

export interface VacancyApplication {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  resume?: string;
  coverLetter: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface CompanySettings {
  name: string;
  slogan: string;
  email: string;
  phone: string;
  address: string;
  workingHours: string;
  socialLinks: {
    telegram?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
  aboutText: string;
  missionText: string;
}

// Dashboard stats
export interface DashboardStats {
  totalProducts: number;
  totalNews: number;
  totalVacancies: number;
  totalApplications: number;
  unreadMessages: number;
  pendingApplications: number;
}
