// User types
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Blog types
export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at: Date;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author_id: number;
  category_id: number;
  cover_image_url?: string;
  published_at?: Date;
  updated_at: Date;
  read_time: number;
  featured: boolean;
  views_count: number;
  likes_count: number;
  is_published: boolean;
  created_at: Date;
  // Joined data
  author?: User;
  category?: BlogCategory;
  tags?: BlogTag[];
}

// Project types
export interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  image_url?: string;
  project_url?: string;
  github_url?: string;
  featured: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
  // Joined data
  technologies?: string[];
}

// Skills types
export interface SkillCategory {
  id: number;
  name: string;
  display_order: number;
  created_at: Date;
}

export interface Skill {
  id: number;
  category_id: number;
  name: string;
  proficiency_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  display_order: number;
  created_at: Date;
  // Joined data
  category?: SkillCategory;
}

// Services types
export interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Contact types
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  is_responded: boolean;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
  responded_at?: Date;
}

// Testimonials types
export interface Testimonial {
  id: number;
  client_name: string;
  client_position?: string;
  client_company?: string;
  message: string;
  rating: number;
  image_url?: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Site settings types
export interface SiteSetting {
  id: number;
  setting_key: string;
  setting_value: string;
  setting_type: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  updated_at: Date;
}

// Analytics types
export interface PageView {
  id: number;
  page_url: string;
  page_type: 'blog_post' | 'project' | 'home' | 'about' | 'contact' | 'other';
  page_id?: number;
  ip_address?: string;
  user_agent?: string;
  referrer_url?: string;
  session_id?: string;
  viewed_at: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
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

// Auth types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: number;
  username: string;
  email: string;
}

// File upload types
export interface FileUploadResult {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  url: string;
}