import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { FileUploadResult } from '../types/index';

const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

// Ensure upload directories exist
const ensureDirectoryExists = async (dirPath: string): Promise<void> => {
  try {
    await stat(dirPath);
  } catch (error) {
    await mkdir(dirPath, { recursive: true });
  }
};

// Configure multer storage
const createStorage = (destination: string) => {
  return multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        await ensureDirectoryExists(destination);
        cb(null, destination);
      } catch (error) {
        cb(error as Error, destination);
      }
    },
    filename: (req, file, cb) => {
      // Generate unique filename with timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extension);
      cb(null, `${basename}-${uniqueSuffix}${extension}`);
    }
  });
};

// File filter function
const createFileFilter = (allowedTypes: string[], maxSize: number = 5 * 1024 * 1024) => {
  return (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Check file type
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error(`File type ${file.mimetype} not allowed. Allowed types: ${allowedTypes.join(', ')}`));
    }

    // Check file size
    if (file.size > maxSize) {
      return cb(new Error(`File size ${file.size} exceeds maximum allowed size of ${maxSize} bytes`));
    }

    cb(null, true);
  };
};

// Create upload middleware for different types
export const createUploadMiddleware = (
  destination: string,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxSize: number = 5 * 1024 * 1024,
  maxFiles: number = 1
) => {
  const storage = createStorage(destination);
  const fileFilter = createFileFilter(allowedTypes, maxSize);

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
      files: maxFiles
    }
  });
};

// Specific upload middlewares
export const imageUpload = createUploadMiddleware(
  path.join(__dirname, '../../uploads/images'),
  ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  5 * 1024 * 1024, // 5MB
  10
);

export const projectImageUpload = createUploadMiddleware(
  path.join(__dirname, '../../uploads/projects'),
  ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  10 * 1024 * 1024, // 10MB
  5
);

export const blogImageUpload = createUploadMiddleware(
  path.join(__dirname, '../../uploads/blog'),
  ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  10 * 1024 * 1024, // 10MB
  5
);

// Process uploaded files and return file info
export const processUploadedFiles = (files: Express.Multer.File[]): FileUploadResult[] => {
  return files.map(file => ({
    filename: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: `/uploads/${path.relative(path.join(__dirname, '../../uploads'), file.path).replace(/\\/g, '/')}`
  }));
};

// Delete file utility
export const deleteFile = async (filePath: string): Promise<boolean> => {
  try {
    await promisify(fs.unlink)(filePath);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

// Get file info
export const getFileInfo = async (filePath: string): Promise<fs.Stats | null> => {
  try {
    return await stat(filePath);
  } catch (error) {
    return null;
  }
};