// API service for portfolio website backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Generic API fetch function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Blog API functions
export const blogApi = {
  // Get all published blog posts
  getPosts: (page = 1, limit = 10) =>
    apiRequest<PaginatedResponse<any>>(`/blog/posts?page=${page}&limit=${limit}`),

  // Get featured blog posts
  getFeaturedPosts: () =>
    apiRequest<any[]>('/blog/posts/featured'),

  // Get single blog post by slug
  getPostBySlug: (slug: string) =>
    apiRequest<any>(`/blog/posts/${slug}`),

  // Get posts by category
  getPostsByCategory: (categorySlug: string) =>
    apiRequest<any[]>(`/blog/categories/${categorySlug}/posts`),

  // Get posts by tag
  getPostsByTag: (tagSlug: string) =>
    apiRequest<any[]>(`/blog/tags/${tagSlug}/posts`),

  // Get all categories
  getCategories: () =>
    apiRequest<any[]>('/blog/categories'),

  // Get all tags
  getTags: () =>
    apiRequest<any[]>('/blog/tags'),

  // Search posts
  searchPosts: (query: string) =>
    apiRequest<any[]>(`/blog/search?q=${encodeURIComponent(query)}`),

  // Increment post views
  incrementViews: (postId: number) =>
    apiRequest<void>(`/blog/posts/${postId}/view`, { method: 'POST' }),
};

// Projects API functions
export const projectsApi = {
  // Get all projects
  getProjects: () =>
    apiRequest<any[]>('/projects'),

  // Get featured projects
  getFeaturedProjects: () =>
    apiRequest<any[]>('/projects/featured'),

  // Get single project
  getProject: (id: number) =>
    apiRequest<any>(`/projects/${id}`),
};

// Skills API functions
export const skillsApi = {
  // Get all skills with categories
  getSkills: () =>
    apiRequest<any[]>('/skills'),
};

// Services API functions
export const servicesApi = {
  // Get all active services
  getServices: () =>
    apiRequest<any[]>('/services'),
};

// Contact API functions
export const contactApi = {
  // Submit contact form
  submitMessage: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) =>
    apiRequest<void>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Analytics API functions
export const analyticsApi = {
  // Track page view
  trackPageView: (data: {
    pageUrl: string;
    pageType: string;
    pageId?: number;
    referrerUrl?: string;
  }) =>
    apiRequest<void>('/analytics/pageview', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Site settings API functions
export const settingsApi = {
  // Get site settings
  getSettings: () =>
    apiRequest<Record<string, any>>('/settings'),

  // Get specific setting
  getSetting: (key: string) =>
    apiRequest<any>(`/settings/${key}`),
};

// User/Testimonials API functions
export const testimonialsApi = {
  // Get active testimonials
  getTestimonials: () =>
    apiRequest<any[]>('/testimonials'),
};

// Export all APIs
export const api = {
  blog: blogApi,
  projects: projectsApi,
  skills: skillsApi,
  services: servicesApi,
  contact: contactApi,
  analytics: analyticsApi,
  settings: settingsApi,
  testimonials: testimonialsApi,
};