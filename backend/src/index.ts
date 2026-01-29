import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { testConnection } from './config/database';
import { authenticateToken, requireAdmin } from './middleware/auth';
import {
  login,
  refreshToken,
  logout,
  getProfile
} from './controllers/authController';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getTags,
  createTag,
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getAllPosts
} from './controllers/blogController';
import {
  getProjects,
  getFeaturedProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from './controllers/projectController';
import {
  getSkills,
  getSkillsByCategory,
  getSkill,
  getSkillCategories,
  createSkill,
  updateSkill,
  deleteSkill
} from './controllers/skillController';
import {
  getServices,
  getService,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService
} from './controllers/serviceController';
import {
  uploadImages,
  uploadProjectImages,
  uploadBlogImages,
  deleteUploadedFile
} from './controllers/uploadController';
import { imageUpload, projectImageUpload, blogImageUpload } from './services/uploadService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.post('/api/auth/login', login);
app.post('/api/auth/refresh', refreshToken);
app.post('/api/auth/logout', authenticateToken, logout);
app.get('/api/auth/profile', authenticateToken, getProfile);

// Blog routes (public)
app.get('/api/blog/posts', getPosts);
app.get('/api/blog/posts/:slug', getPostBySlug);
app.get('/api/blog/categories', getCategories);
app.get('/api/blog/tags', getTags);

// Blog admin routes
app.get('/api/admin/blog/posts', authenticateToken, requireAdmin, getAllPosts);
app.post('/api/admin/blog/posts', authenticateToken, requireAdmin, createPost);
app.put('/api/admin/blog/posts/:id', authenticateToken, requireAdmin, updatePost);
app.delete('/api/admin/blog/posts/:id', authenticateToken, requireAdmin, deletePost);

app.post('/api/admin/blog/categories', authenticateToken, requireAdmin, createCategory);
app.put('/api/admin/blog/categories/:id', authenticateToken, requireAdmin, updateCategory);
app.delete('/api/admin/blog/categories/:id', authenticateToken, requireAdmin, deleteCategory);

app.post('/api/admin/blog/tags', authenticateToken, requireAdmin, createTag);

// Projects routes (public)
app.get('/api/projects', getProjects);
app.get('/api/projects/featured', getFeaturedProjects);
app.get('/api/projects/:id', getProject);

// Projects admin routes
app.post('/api/admin/projects', authenticateToken, requireAdmin, createProject);
app.put('/api/admin/projects/:id', authenticateToken, requireAdmin, updateProject);
app.delete('/api/admin/projects/:id', authenticateToken, requireAdmin, deleteProject);

// Skills routes (public)
app.get('/api/skills', getSkills);
app.get('/api/skills/categories', getSkillCategories);
app.get('/api/skills/category/:categoryId', getSkillsByCategory);
app.get('/api/skills/:id', getSkill);

// Skills admin routes
app.post('/api/admin/skills', authenticateToken, requireAdmin, createSkill);
app.put('/api/admin/skills/:id', authenticateToken, requireAdmin, updateSkill);
app.delete('/api/admin/skills/:id', authenticateToken, requireAdmin, deleteSkill);

// Services routes (public)
app.get('/api/services', getServices);
app.get('/api/services/:id', getService);

// Services admin routes
app.get('/api/admin/services', authenticateToken, requireAdmin, getAllServicesAdmin);
app.post('/api/admin/services', authenticateToken, requireAdmin, createService);
app.put('/api/admin/services/:id', authenticateToken, requireAdmin, updateService);
app.delete('/api/admin/services/:id', authenticateToken, requireAdmin, deleteService);

// Upload routes
app.post('/api/upload/images', authenticateToken, requireAdmin, imageUpload.array('files', 10), uploadImages);
app.post('/api/upload/projects', authenticateToken, requireAdmin, projectImageUpload.array('files', 5), uploadProjectImages);
app.post('/api/upload/blog', authenticateToken, requireAdmin, blogImageUpload.array('files', 5), uploadBlogImages);
app.delete('/api/upload/files/:filename', authenticateToken, requireAdmin, deleteUploadedFile);

// 404 handler
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error:', err);

  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 API available at http://localhost:${PORT}/api`);
      console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();