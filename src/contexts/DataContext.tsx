import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  NewsItem,
  Vacancy,
  VacancyApplication,
  ContactMessage,
  Announcement,
  CompanySettings,
  DashboardStats,
} from '@/types';
import {
  initialProducts,
  initialCategories,
  initialNews,
  initialVacancies,
  initialApplications,
  initialMessages,
  initialAnnouncements,
  initialSettings,
} from '@/data/initialData';

interface DataContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (idOrSlug: string) => Product | undefined;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // News
  news: NewsItem[];
  addNews: (item: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: string, item: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  getNewsItem: (idOrSlug: string) => NewsItem | undefined;

  // Vacancies
  vacancies: Vacancy[];
  addVacancy: (vacancy: Omit<Vacancy, 'id' | 'createdAt'>) => void;
  updateVacancy: (id: string, vacancy: Partial<Vacancy>) => void;
  deleteVacancy: (id: string) => void;
  getVacancy: (idOrSlug: string) => Vacancy | undefined;

  // Applications
  applications: VacancyApplication[];
  addApplication: (application: Omit<VacancyApplication, 'id' | 'submittedAt' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: VacancyApplication['status']) => void;
  deleteApplication: (id: string) => void;

  // Messages
  messages: ContactMessage[];
  addMessage: (message: Omit<ContactMessage, 'id' | 'submittedAt' | 'isRead'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  // Settings
  settings: CompanySettings;
  updateSettings: (settings: Partial<CompanySettings>) => void;

  // Stats
  getStats: () => DashboardStats;
}

// NOTE: In Vite dev mode, modules can temporarily exist in multiple versions (e.g. with and without `?t=`)
// during HMR. If `createContext()` runs twice, the Provider and consumers may reference different context
// instances which triggers: "useData must be used within a DataProvider".
//
// To make the context resilient, we store/reuse the context on `globalThis`.
const g = globalThis as any;
const DataContext: React.Context<DataContextType | undefined> =
  (g.__HARU_AIR_DATA_CONTEXT__ as React.Context<DataContextType | undefined> | undefined) ??
  (g.__HARU_AIR_DATA_CONTEXT__ = createContext<DataContextType | undefined>(undefined));

const STORAGE_KEY = 'haru_air_data';

interface StoredData {
  products: Product[];
  categories: Category[];
  news: NewsItem[];
  vacancies: Vacancy[];
  applications: VacancyApplication[];
  messages: ContactMessage[];
  announcements: Announcement[];
  settings: CompanySettings;
}

function loadFromStorage(): StoredData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load from storage:', e);
  }
  return null;
}

function saveToStorage(data: StoredData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies);
  const [applications, setApplications] = useState<VacancyApplication[]>(initialApplications);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [settings, setSettings] = useState<CompanySettings>(initialSettings);

  // Load from storage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setProducts(stored.products);
      setCategories(stored.categories);
      setNews(stored.news);
      setVacancies(stored.vacancies);
      setApplications(stored.applications);
      setMessages(stored.messages);
      setAnnouncements(stored.announcements);
      setSettings(stored.settings);
    }
  }, []);

  // Save to storage on changes
  useEffect(() => {
    saveToStorage({
      products,
      categories,
      news,
      vacancies,
      applications,
      messages,
      announcements,
      settings,
    });
  }, [products, categories, news, vacancies, applications, messages, announcements, settings]);

  // Products CRUD
  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newProduct: Product = {
      ...product,
      id: generateId(),
      slug: product.slug || generateSlug(product.name),
      createdAt: now,
      updatedAt: now,
    };
    setProducts((prev) => [...prev, newProduct]);
    updateCategoryCount();
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...product, updatedAt: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    updateCategoryCount();
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    updateCategoryCount();
  };

  const getProduct = (idOrSlug: string) => {
    return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  };

  const updateCategoryCount = () => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        productCount: products.filter((p) => p.category === cat.slug).length,
      }))
    );
  };

  // Categories CRUD
  const addCategory = (category: Omit<Category, 'id' | 'productCount'>) => {
    const newCategory: Category = {
      ...category,
      id: generateId(),
      productCount: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...category } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // News CRUD
  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const newItem: NewsItem = {
      ...item,
      id: generateId(),
      slug: item.slug || generateSlug(item.title),
    };
    setNews((prev) => [newItem, ...prev]);
  };

  const updateNews = (id: string, item: Partial<NewsItem>) => {
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...item } : n)));
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const getNewsItem = (idOrSlug: string) => {
    return news.find((n) => n.id === idOrSlug || n.slug === idOrSlug);
  };

  // Vacancies CRUD
  const addVacancy = (vacancy: Omit<Vacancy, 'id' | 'createdAt'>) => {
    const newVacancy: Vacancy = {
      ...vacancy,
      id: generateId(),
      slug: vacancy.slug || generateSlug(vacancy.title),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setVacancies((prev) => [newVacancy, ...prev]);
  };

  const updateVacancy = (id: string, vacancy: Partial<Vacancy>) => {
    setVacancies((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...vacancy } : v))
    );
  };

  const deleteVacancy = (id: string) => {
    setVacancies((prev) => prev.filter((v) => v.id !== id));
  };

  const getVacancy = (idOrSlug: string) => {
    return vacancies.find((v) => v.id === idOrSlug || v.slug === idOrSlug);
  };

  // Applications CRUD
  const addApplication = (
    application: Omit<VacancyApplication, 'id' | 'submittedAt' | 'status'>
  ) => {
    const newApplication: VacancyApplication = {
      ...application,
      id: generateId(),
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'new',
    };
    setApplications((prev) => [newApplication, ...prev]);
  };

  const updateApplicationStatus = (
    id: string,
    status: VacancyApplication['status']
  ) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // Messages CRUD
  const addMessage = (
    message: Omit<ContactMessage, 'id' | 'submittedAt' | 'isRead'>
  ) => {
    const newMessage: ContactMessage = {
      ...message,
      id: generateId(),
      submittedAt: new Date().toISOString().split('T')[0],
      isRead: false,
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Announcements CRUD
  const addAnnouncement = (
    announcement: Omit<Announcement, 'id' | 'createdAt'>
  ) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: generateId(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  const updateAnnouncement = (id: string, announcement: Partial<Announcement>) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...announcement } : a))
    );
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Stats
  const getStats = (): DashboardStats => ({
    totalProducts: products.length,
    totalNews: news.length,
    totalVacancies: vacancies.filter((v) => v.isActive).length,
    totalApplications: applications.length,
    unreadMessages: messages.filter((m) => !m.isRead).length,
    pendingApplications: applications.filter((a) => a.status === 'new').length,
  });

  return (
    <DataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        news,
        addNews,
        updateNews,
        deleteNews,
        getNewsItem,
        vacancies,
        addVacancy,
        updateVacancy,
        deleteVacancy,
        getVacancy,
        applications,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        messages,
        addMessage,
        markMessageRead,
        deleteMessage,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        settings,
        updateSettings,
        getStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
