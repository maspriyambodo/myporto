import { Request, Response } from 'express';
import { processUploadedFiles, deleteFile } from '../services/uploadService';
import { ApiResponse, FileUploadResult } from '../types/index';

// Upload images (general)
export const uploadImages = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'No files uploaded'
      };
      res.status(400).json(response);
      return;
    }

    const files = Array.isArray(req.files) ? req.files : req.files['files'] || [];
    const uploadedFiles = processUploadedFiles(files);

    const response: ApiResponse<FileUploadResult[]> = {
      success: true,
      data: uploadedFiles,
      message: `${uploadedFiles.length} file(s) uploaded successfully`
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error uploading files:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to upload files'
    };
    res.status(500).json(response);
  }
};

// Upload project images
export const uploadProjectImages = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'No project images uploaded'
      };
      res.status(400).json(response);
      return;
    }

    const files = Array.isArray(req.files) ? req.files : req.files['files'] || [];
    const uploadedFiles = processUploadedFiles(files);

    const response: ApiResponse<FileUploadResult[]> = {
      success: true,
      data: uploadedFiles,
      message: `${uploadedFiles.length} project image(s) uploaded successfully`
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error uploading project images:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to upload project images'
    };
    res.status(500).json(response);
  }
};

// Upload blog images
export const uploadBlogImages = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'No blog images uploaded'
      };
      res.status(400).json(response);
      return;
    }

    const files = Array.isArray(req.files) ? req.files : req.files['files'] || [];
    const uploadedFiles = processUploadedFiles(files);

    const response: ApiResponse<FileUploadResult[]> = {
      success: true,
      data: uploadedFiles,
      message: `${uploadedFiles.length} blog image(s) uploaded successfully`
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error uploading blog images:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to upload blog images'
    };
    res.status(500).json(response);
  }
};

// Delete uploaded file
export const deleteUploadedFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename } = req.params;

    if (!filename) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Filename is required'
      };
      res.status(400).json(response);
      return;
    }

    // Construct file path (this is a simplified version - in production you'd want more security)
    const filePath = `uploads/${filename}`;

    const success = await deleteFile(filePath);

    if (!success) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'File not found or could not be deleted'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'File deleted successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting file:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to delete file'
    };
    res.status(500).json(response);
  }
};