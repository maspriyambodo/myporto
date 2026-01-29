export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  category: BlogCategory;
  tags: string[];
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number; // in minutes
  featured?: boolean;
  views?: number;
  likes?: number;
}

export type BlogCategory = 
  | 'Web Development'
  | 'DevOps'
  | 'System Administration'
  | 'Database'
  | 'Backend Development'
  | 'Frontend Development'
  | 'Tutorial'
  | 'Best Practices'
  | 'Career';

export interface BlogFilters {
  category?: BlogCategory;
  tag?: string;
  search?: string;
}
