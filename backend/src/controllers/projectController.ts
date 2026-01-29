import { Request, Response } from 'express';
import { ProjectModel } from '../models/projectModel';
import { ApiResponse } from '../types/index';

// Get all projects
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await ProjectModel.getAll();

    const response: ApiResponse<any[]> = {
      success: true,
      data: projects
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching projects:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch projects'
    };
    res.status(500).json(response);
  }
};

// Get featured projects
export const getFeaturedProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await ProjectModel.getFeatured();

    const response: ApiResponse<any[]> = {
      success: true,
      data: projects
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch featured projects'
    };
    res.status(500).json(response);
  }
};

// Get project by ID
export const getProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id as string);

    if (isNaN(projectId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid project ID'
      };
      res.status(400).json(response);
      return;
    }

    const project = await ProjectModel.getById(projectId);

    if (!project) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Project not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<any> = {
      success: true,
      data: project
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching project:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch project'
    };
    res.status(500).json(response);
  }
};

// Create new project (admin only)
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectData = req.body;

    const projectId = await ProjectModel.create(projectData);

    const response: ApiResponse<{ id: number }> = {
      success: true,
      data: { id: projectId },
      message: 'Project created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating project:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to create project'
    };
    res.status(500).json(response);
  }
};

// Update project (admin only)
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id as string);
    const projectData = req.body;

    if (isNaN(projectId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid project ID'
      };
      res.status(400).json(response);
      return;
    }

    const success = await ProjectModel.update(projectId, projectData);

    if (!success) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Project not found or update failed'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Project updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating project:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to update project'
    };
    res.status(500).json(response);
  }
};

// Delete project (admin only)
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id as string);

    if (isNaN(projectId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid project ID'
      };
      res.status(400).json(response);
      return;
    }

    const success = await ProjectModel.delete(projectId);

    if (!success) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Project not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Project deleted successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting project:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to delete project'
    };
    res.status(500).json(response);
  }
};