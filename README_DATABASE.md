# MySQL Database Schema for Portfolio Website Backend

This document describes the MySQL database schema designed for MasBodo's portfolio website backend.

## Overview

The database schema supports a full-featured portfolio website with blog functionality, project showcase, skills management, services, contact forms, and analytics. It includes proper relationships, indexes, views, and stored procedures for optimal performance.

## Database Structure

### Core Tables

#### 1. `users`
Stores user information (primarily for the portfolio owner and potential admin users).
- **Primary Key**: `id` (AUTO_INCREMENT)
- **Key Fields**: `username`, `email`, `password_hash`, `full_name`
- **Social Links**: `linkedin_url`, `github_url`, `website_url`

#### 2. `blog_posts`
Main content table for blog articles.
- **Primary Key**: `id` (AUTO_INCREMENT)
- **Key Fields**: `slug`, `title`, `excerpt`, `content`
- **Relationships**: `author_id` → `users.id`, `category_id` → `blog_categories.id`
- **Features**: `views_count`, `likes_count`, `featured`, `is_published`

#### 3. `blog_categories`
Categorization for blog posts.
- **Primary Key**: `id` (AUTO_INCREMENT)
- **Key Fields**: `name`, `slug`, `description`

#### 4. `blog_tags` & `blog_post_tags`
Tag system for blog posts (many-to-many relationship).
- **Purpose**: Flexible tagging system for content organization

#### 5. `projects`
Portfolio projects showcase.
- **Primary Key**: `id` (AUTO_INCREMENT)
- **Key Fields**: `title`, `description`, `problem`, `solution`, `result`
- **Features**: `featured`, `display_order`, technology stack via `project_technologies`

#### 6. `skills` & `skill_categories`
Skills organized by categories (Frontend, Backend, DevOps, Database).
- **Features**: Proficiency levels (`Beginner`, `Intermediate`, `Advanced`, `Expert`)

#### 7. `services`
Professional services offered.
- **Key Fields**: `title`, `description`, `icon_name`

#### 8. `contact_messages`
Contact form submissions.
- **Features**: Status tracking (`is_read`, `is_responded`), IP logging

### Additional Tables

#### 9. `testimonials` (Optional)
Client testimonials and reviews.

#### 10. `site_settings`
Dynamic site configuration.

#### 11. `page_views`
Analytics and page view tracking.

## Key Features

### Relationships & Constraints
- **Foreign Keys**: Proper referential integrity
- **Indexes**: Optimized for common queries
- **Triggers**: Automatic timestamp updates

### Views
- `published_blog_posts`: Published posts with author and category info
- `blog_posts_with_tags`: Posts with concatenated tags
- `active_skills`: Skills with category information
- `active_services`: Active services in display order
- `featured_projects`: Featured projects with technologies

### Stored Procedures
- `create_blog_post()`: Standardized blog post creation
- `increment_post_views()`: Thread-safe view counting
- `add_blog_post_tags()`: Bulk tag assignment

### Performance Optimizations
- **Indexes**: Strategic indexing on frequently queried columns
- **Full-text Search**: Content search capabilities
- **Composite Indexes**: Multi-column indexes for complex queries

## Installation

1. **Create Database**:
```sql
CREATE DATABASE portfolio_db;
USE portfolio_db;
```

2. **Run Schema**:
```bash
mysql -u root -p portfolio_db < database_schema.sql
```

3. **Configure User** (uncomment and modify in schema):
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON portfolio_db.* TO 'portfolio_user'@'localhost' IDENTIFIED BY 'your_secure_password';
FLUSH PRIVILEGES;
```

## Data Migration

The schema includes sample data for:
- Default user (MasBodo)
- Blog categories
- Skills and categories
- Services
- Sample projects
- Site settings

For production, update:
- User credentials
- Sample content with real data
- Site settings

## API Integration Points

### Blog Management
- **GET** `/api/blog/posts` - List published posts
- **GET** `/api/blog/posts/{slug}` - Single post with tags
- **POST** `/api/blog/posts/{id}/view` - Increment view count

### Projects
- **GET** `/api/projects` - Featured projects
- **GET** `/api/projects/{id}` - Project details

### Contact
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact` - List messages (admin only)

### Skills & Services
- **GET** `/api/skills` - Skills by category
- **GET** `/api/services` - Active services

## Security Considerations

1. **Password Hashing**: Use bcrypt for password storage
2. **SQL Injection**: Use prepared statements in application code
3. **Input Validation**: Validate all user inputs
4. **Rate Limiting**: Implement rate limiting for contact forms
5. **Access Control**: Role-based access for admin functions

## Backup Strategy

```sql
# Full backup
mysqldump -u portfolio_user -p portfolio_db > backup_$(date +%Y%m%d).sql

# Selective backup (data only)
mysqldump -u portfolio_user -p --no-create-info portfolio_db > data_backup.sql
```

## Monitoring

### Key Metrics to Monitor
- Blog post views and engagement
- Contact form submissions
- Page view analytics
- Database performance (slow queries)

### Useful Queries
```sql
-- Top performing blog posts
SELECT title, views_count, likes_count
FROM blog_posts
WHERE is_published = TRUE
ORDER BY views_count DESC
LIMIT 10;

-- Recent contact messages
SELECT name, email, subject, created_at
FROM contact_messages
WHERE is_read = FALSE
ORDER BY created_at DESC;

-- Popular tags
SELECT bt.name, COUNT(bpt.post_id) as post_count
FROM blog_tags bt
JOIN blog_post_tags bpt ON bt.id = bpt.tag_id
GROUP BY bt.id
ORDER BY post_count DESC;
```

## Future Enhancements

1. **Comments System**: Add comments table for blog posts
2. **Newsletter**: Email subscription management
3. **File Attachments**: Support for file uploads
4. **Multi-language**: Content internationalization
5. **SEO Optimization**: Meta tags and sitemap generation

## Support

For questions about this schema or implementation, refer to the inline comments in `database_schema.sql` or contact the development team.