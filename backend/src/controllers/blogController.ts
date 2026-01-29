import { Request, Response } from 'express';
import pool from '../config/database';
import { ApiResponse, PaginatedResponse, BlogPost, BlogCategory, BlogTag } from '../types/index';

// Blog Categories
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, slug, description, created_at FROM blog_categories ORDER BY name'
    );

    res.json({
      success: true,
      data: rows
    } as ApiResponse<BlogCategory[]>);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      res.status(400).json({
        success: false,
        error: 'Name and slug are required'
      } as ApiResponse<null>);
      return;
    }

    // Check if slug already exists
    const [existing] = await pool.execute(
      'SELECT id FROM blog_categories WHERE slug = ?',
      [slug]
    );

    if ((existing as any[]).length > 0) {
      res.status(400).json({
        success: false,
        error: 'Category slug already exists'
      } as ApiResponse<null>);
      return;
    }

    const [result] = await pool.execute(
      'INSERT INTO blog_categories (name, slug, description) VALUES (?, ?, ?)',
      [name, slug, description || null]
    );

    const insertId = (result as any).insertId;

    res.status(201).json({
      success: true,
      data: { id: insertId, name, slug, description },
      message: 'Category created successfully'
    } as ApiResponse<BlogCategory>);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      res.status(400).json({
        success: false,
        error: 'Name and slug are required'
      } as ApiResponse<null>);
      return;
    }

    // Check if category exists
    const [existing] = await pool.execute(
      'SELECT id FROM blog_categories WHERE id = ?',
      [id]
    );

    if ((existing as any[]).length === 0) {
      res.status(404).json({
        success: false,
        error: 'Category not found'
      } as ApiResponse<null>);
      return;
    }

    // Check if slug is taken by another category
    const [slugCheck] = await pool.execute(
      'SELECT id FROM blog_categories WHERE slug = ? AND id != ?',
      [slug, id]
    );

    if ((slugCheck as any[]).length > 0) {
      res.status(400).json({
        success: false,
        error: 'Category slug already exists'
      } as ApiResponse<null>);
      return;
    }

    await pool.execute(
      'UPDATE blog_categories SET name = ?, slug = ?, description = ? WHERE id = ?',
      [name, slug, description || null, id]
    );

    res.json({
      success: true,
      message: 'Category updated successfully'
    } as ApiResponse<null>);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if category has posts
    const [posts] = await pool.execute(
      'SELECT COUNT(*) as count FROM blog_posts WHERE category_id = ?',
      [id]
    );

    if ((posts as any[])[0].count > 0) {
      res.status(400).json({
        success: false,
        error: 'Cannot delete category with existing posts'
      } as ApiResponse<null>);
      return;
    }

    await pool.execute('DELETE FROM blog_categories WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    } as ApiResponse<null>);
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

// Blog Tags
export const getTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, slug, created_at FROM blog_tags ORDER BY name'
    );

    res.json({
      success: true,
      data: rows
    } as ApiResponse<BlogTag[]>);
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      res.status(400).json({
        success: false,
        error: 'Name and slug are required'
      } as ApiResponse<null>);
      return;
    }

    // Check if slug already exists
    const [existing] = await pool.execute(
      'SELECT id FROM blog_tags WHERE slug = ?',
      [slug]
    );

    if ((existing as any[]).length > 0) {
      res.status(400).json({
        success: false,
        error: 'Tag slug already exists'
      } as ApiResponse<null>);
      return;
    }

    const [result] = await pool.execute(
      'INSERT INTO blog_tags (name, slug) VALUES (?, ?)',
      [name, slug]
    );

    const insertId = (result as any).insertId;

    res.status(201).json({
      success: true,
      data: { id: insertId, name, slug },
      message: 'Tag created successfully'
    } as ApiResponse<BlogTag>);
  } catch (error) {
    console.error('Create tag error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

// Blog Posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Get total count
    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM blog_posts WHERE is_published = TRUE'
    );
    const total = (countResult as any[])[0].total;
    const totalPages = Math.ceil(total / limit);

    // Get posts with author and category info
    const [rows] = await pool.execute(`
      SELECT
        bp.id, bp.slug, bp.title, bp.excerpt, bp.content, bp.cover_image_url,
        bp.published_at, bp.updated_at, bp.read_time, bp.featured, bp.views_count, bp.likes_count,
        u.full_name as author_name, u.avatar_url as author_avatar,
        bc.name as category_name, bc.slug as category_slug
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      JOIN blog_categories bc ON bp.category_id = bc.id
      WHERE bp.is_published = TRUE AND bp.published_at IS NOT NULL
      ORDER BY bp.published_at DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    // Get tags for each post
    const postsWithTags = await Promise.all((rows as any[]).map(async (post) => {
      const [tagRows] = await pool.execute(`
        SELECT bt.name, bt.slug
        FROM blog_tags bt
        JOIN blog_post_tags bpt ON bt.id = bpt.tag_id
        WHERE bpt.post_id = ?
      `, [post.id]);

      return {
        ...post,
        tags: tagRows
      };
    }));

    res.json({
      success: true,
      data: postsWithTags,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    } as PaginatedResponse<BlogPost>);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const [rows] = await pool.execute(`
      SELECT
        bp.id, bp.slug, bp.title, bp.excerpt, bp.content, bp.cover_image_url,
        bp.published_at, bp.updated_at, bp.read_time, bp.featured, bp.views_count, bp.likes_count,
        u.full_name as author_name, u.avatar_url as author_avatar, u.bio as author_bio,
        bc.name as category_name, bc.slug as category_slug
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      JOIN blog_categories bc ON bp.category_id = bc.id
      WHERE bp.slug = ? AND bp.is_published = TRUE AND bp.published_at IS NOT NULL
    `, [slug]);

    if ((rows as any[]).length === 0) {
      res.status(404).json({
        success: false,
        error: 'Post not found'
      } as ApiResponse<null>);
      return;
    }

    const post = (rows as any[])[0];

    // Get tags
    const [tagRows] = await pool.execute(`
      SELECT bt.name, bt.slug
      FROM blog_tags bt
      JOIN blog_post_tags bpt ON bt.id = bpt.tag_id
      WHERE bpt.post_id = ?
    `, [post.id]);

    // Increment view count
    await pool.execute(
      'UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?',
      [post.id]
    );

    res.json({
      success: true,
      data: {
        ...post,
        tags: tagRows
      }
    } as ApiResponse<BlogPost>);
  } catch (error) {
    console.error('Get post by slug error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title, slug, excerpt, content, category_id, cover_image_url,
      read_time, featured, is_published, tags
    } = req.body;

    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      } as ApiResponse<null>);
      return;
    }

    if (!title || !slug || !excerpt || !content || !category_id) {
      res.status(400).json({
        success: false,
        error: 'Title, slug, excerpt, content, and category_id are required'
      } as ApiResponse<null>);
      return;
    }

    // Check if slug already exists
    const [existing] = await pool.execute(
      'SELECT id FROM blog_posts WHERE slug = ?',
      [slug]
    );

    if ((existing as any[]).length > 0) {
      res.status(400).json({
        success: false,
        error: 'Post slug already exists'
      } as ApiResponse<null>);
      return;
    }

    const published_at = is_published ? new Date() : null;

    const [result] = await pool.execute(`
      INSERT INTO blog_posts (
        slug, title, excerpt, content, author_id, category_id,
        cover_image_url, published_at, read_time, featured, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      slug, title, excerpt, content, req.user.userId, category_id,
      cover_image_url || null, published_at, read_time || 5, featured || false, is_published || false
    ]);

    const postId = (result as any).insertId;

    // Add tags if provided
    if (tags && Array.isArray(tags)) {
      for (const tagName of tags) {
        // Insert tag if it doesn't exist
        await pool.execute(
          'INSERT IGNORE INTO blog_tags (name, slug) VALUES (?, ?)',
          [tagName, tagName.toLowerCase().replace(/\s+/g, '-')]
        );

        // Get tag ID
        const [tagResult] = await pool.execute(
          'SELECT id FROM blog_tags WHERE name = ?',
          [tagName]
        );

        const tagId = (tagResult as any[])[0].id;

        // Link tag to post
        await pool.execute(
          'INSERT IGNORE INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)',
          [postId, tagId]
        );
      }
    }

    res.status(201).json({
      success: true,
      data: { id: postId },
      message: 'Post created successfully'
    } as ApiResponse<{ id: number }>);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title, slug, excerpt, content, category_id, cover_image_url,
      read_time, featured, is_published, tags
    } = req.body;

    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      } as ApiResponse<null>);
      return;
    }

    // Check if post exists and user owns it
    const [existing] = await pool.execute(
      'SELECT id FROM blog_posts WHERE id = ? AND author_id = ?',
      [id, req.user.userId]
    );

    if ((existing as any[]).length === 0) {
      res.status(404).json({
        success: false,
        error: 'Post not found or access denied'
      } as ApiResponse<null>);
      return;
    }

    // Check if new slug conflicts
    const [slugCheck] = await pool.execute(
      'SELECT id FROM blog_posts WHERE slug = ? AND id != ?',
      [slug, id]
    );

    if ((slugCheck as any[]).length > 0) {
      res.status(400).json({
        success: false,
        error: 'Post slug already exists'
      } as ApiResponse<null>);
      return;
    }

    const published_at = is_published ? new Date() : null;

    await pool.execute(`
      UPDATE blog_posts SET
        slug = ?, title = ?, excerpt = ?, content = ?, category_id = ?,
        cover_image_url = ?, published_at = ?, read_time = ?, featured = ?, is_published = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND author_id = ?
    `, [
      slug, title, excerpt, content, category_id,
      cover_image_url || null, published_at, read_time || 5, featured || false, is_published || false,
      id, req.user.userId
    ]);

    // Update tags
    if (tags && Array.isArray(tags)) {
      // Remove existing tags
      await pool.execute('DELETE FROM blog_post_tags WHERE post_id = ?', [id]);

      // Add new tags
      for (const tagName of tags) {
        await pool.execute(
          'INSERT IGNORE INTO blog_tags (name, slug) VALUES (?, ?)',
          [tagName, tagName.toLowerCase().replace(/\s+/g, '-')]
        );

        const [tagResult] = await pool.execute(
          'SELECT id FROM blog_tags WHERE name = ?',
          [tagName]
        );

        const tagId = (tagResult as any[])[0].id;

        await pool.execute(
          'INSERT IGNORE INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)',
          [id, tagId]
        );
      }
    }

    res.json({
      success: true,
      message: 'Post updated successfully'
    } as ApiResponse<null>);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      } as ApiResponse<null>);
      return;
    }

    // Check if post exists and user owns it
    const [existing] = await pool.execute(
      'SELECT id FROM blog_posts WHERE id = ? AND author_id = ?',
      [id, req.user.userId]
    );

    if ((existing as any[]).length === 0) {
      res.status(404).json({
        success: false,
        error: 'Post not found or access denied'
      } as ApiResponse<null>);
      return;
    }

    // Delete post (tags will be deleted automatically due to foreign key constraints)
    await pool.execute('DELETE FROM blog_posts WHERE id = ? AND author_id = ?', [id, req.user.userId]);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    } as ApiResponse<null>);
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};

// Admin: Get all posts (including drafts)
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Get total count
    const [countResult] = await pool.execute('SELECT COUNT(*) as total FROM blog_posts');
    const total = (countResult as any[])[0].total;
    const totalPages = Math.ceil(total / limit);

    // Get all posts
    const [rows] = await pool.execute(`
      SELECT
        bp.id, bp.slug, bp.title, bp.excerpt, bp.cover_image_url,
        bp.published_at, bp.updated_at, bp.featured, bp.is_published,
        u.full_name as author_name,
        bc.name as category_name
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      JOIN blog_categories bc ON bp.category_id = bc.id
      ORDER BY bp.created_at DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    res.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    } as PaginatedResponse<any>);
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    } as ApiResponse<null>);
  }
};