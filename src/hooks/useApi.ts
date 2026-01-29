import { useState, useEffect, useCallback } from 'react';

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<{ success: boolean; data: T; message?: string }>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'An error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch };
}

// Hook for blog posts
export function useBlogPosts(page = 1, limit = 10) {
  return useApi(() => import('../services/api').then(m => m.blogApi.getPosts(page, limit)), [page, limit]);
}

// Hook for featured blog posts
export function useFeaturedPosts() {
  return useApi(() => import('../services/api').then(m => m.blogApi.getFeaturedPosts()));
}

// Hook for single blog post
export function useBlogPost(slug: string) {
  return useApi(() => import('../services/api').then(m => m.blogApi.getPostBySlug(slug)), [slug]);
}

// Hook for projects
export function useProjects() {
  return useApi(() => import('../services/api').then(m => m.projectsApi.getProjects()));
}

// Hook for featured projects
export function useFeaturedProjects() {
  return useApi(() => import('../services/api').then(m => m.projectsApi.getFeaturedProjects()));
}

// Hook for skills
export function useSkills() {
  return useApi(() => import('../services/api').then(m => m.skillsApi.getSkills()));
}

// Hook for services
export function useServices() {
  return useApi(() => import('../services/api').then(m => m.servicesApi.getServices()));
}

// Hook for blog categories
export function useBlogCategories() {
  return useApi(() => import('../services/api').then(m => m.blogApi.getCategories()));
}

// Hook for blog tags
export function useBlogTags() {
  return useApi(() => import('../services/api').then(m => m.blogApi.getTags()));
}

// Hook for testimonials
export function useTestimonials() {
  return useApi(() => import('../services/api').then(m => m.testimonialsApi.getTestimonials()));
}

// Hook for site settings
export function useSiteSettings() {
  return useApi(() => import('../services/api').then(m => m.settingsApi.getSettings()));
}