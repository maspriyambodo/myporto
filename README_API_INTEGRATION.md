# API Integration for Portfolio Website

This document describes the changes made to integrate dynamic API calls into the portfolio website, replacing static data with backend-driven content.

## Overview

The portfolio website has been updated to fetch data dynamically from a backend API instead of using hardcoded static data. This allows for:

- Real-time content updates
- Dynamic blog management
- Contact form submissions
- Analytics tracking
- Admin panel capabilities

## Files Created/Modified

### New Files

1. **`src/services/api.ts`** - API service layer with all backend endpoints
2. **`src/hooks/useApi.ts`** - Custom React hooks for API data fetching
3. **`.env.example`** - Environment configuration template
4. **`database_schema.sql`** - MySQL database schema
5. **`README_DATABASE.md`** - Database documentation

### Modified Components

1. **`src/components/Projects.tsx`** - Now uses `useFeaturedProjects()` hook
2. **`src/components/Skills.tsx`** - Now uses `useSkills()` hook
3. **`src/components/Services.tsx`** - Now uses `useServices()` hook
4. **`src/components/Contact.tsx`** - Now submits forms via API

## API Endpoints

### Blog Endpoints
```typescript
GET /api/blog/posts?page=1&limit=10 - List published posts
GET /api/blog/posts/featured - Get featured posts
GET /api/blog/posts/{slug} - Get single post by slug
GET /api/blog/categories - Get all categories
GET /api/blog/tags - Get all tags
POST /api/blog/posts/{id}/view - Increment view count
```

### Projects Endpoints
```typescript
GET /api/projects - Get all projects
GET /api/projects/featured - Get featured projects
GET /api/projects/{id} - Get single project
```

### Skills & Services Endpoints
```typescript
GET /api/skills - Get all skills with categories
GET /api/services - Get all active services
```

### Contact Endpoints
```typescript
POST /api/contact - Submit contact form
```

### Analytics Endpoints
```typescript
POST /api/analytics/pageview - Track page views
```

## Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Configure the API URL:
```env
VITE_API_URL=http://localhost:3001/api
```

## Component Updates

### Loading States
All components now include proper loading states with spinners:

```tsx
if (loading) {
  return <Loader2 className="animate-spin" size={48} />;
}
```

### Error Handling
Components handle API errors gracefully:

```tsx
if (error) {
  return <p>Failed to load data. Please try again later.</p>;
}
```

### Data Structure Compatibility
The API responses are designed to be compatible with existing component structures, with fallbacks for missing fields.

## Database Schema

The MySQL database includes tables for:
- Users (portfolio owner/admin)
- Blog posts, categories, and tags
- Projects with technologies
- Skills organized by categories
- Services offered
- Contact form submissions
- Analytics and page views
- Site settings

## Backend Implementation

You'll need to implement a backend server (Node.js/Express, Laravel, etc.) that provides these endpoints. The backend should:

1. Connect to the MySQL database
2. Implement the API endpoints
3. Handle authentication for admin functions
4. Validate input data
5. Return data in the expected format

## Development Setup

1. **Start the backend server** on port 3001
2. **Configure environment variables**
3. **Run the frontend** as usual with `npm run dev`

## Production Deployment

1. **Set production API URL** in environment variables
2. **Ensure CORS is configured** on the backend
3. **Implement proper error handling** and logging
4. **Set up database backups** and monitoring

## Migration from Static Data

The components automatically fall back to static data if the API is unavailable, ensuring the site remains functional during development or API outages.

## Future Enhancements

1. **Admin Panel** - Content management interface
2. **Real-time Updates** - WebSocket integration
3. **Caching** - Redis for performance
4. **Image Upload** - File management system
5. **SEO Optimization** - Dynamic meta tags

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if backend server is running
   - Verify API URL in environment variables
   - Check CORS configuration

2. **Data Not Loading**
   - Check browser network tab for errors
   - Verify database connection
   - Check API response format

3. **Form Submission Errors**
   - Validate backend validation rules
   - Check network connectivity
   - Verify API endpoint URLs

## Support

For questions about the API integration or implementation, refer to:
- `src/services/api.ts` for API client code
- `src/hooks/useApi.ts` for data fetching hooks
- `database_schema.sql` for database structure
- `README_DATABASE.md` for database documentation