import { Request, Response } from 'express';
import { SkillModel, SkillCategoryModel } from '../models/skillModel';
import { ApiResponse } from '../types/index';

// Get all skills with categories
export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills = await SkillModel.getAll();

    const response: ApiResponse<any[]> = {
      success: true,
      data: skills
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching skills:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch skills'
    };
    res.status(500).json(response);
  }
};

// Get skills by category
export const getSkillsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const catId = parseInt(categoryId as string);

    if (isNaN(catId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid category ID'
      };
      res.status(400).json(response);
      return;
    }

    const skills = await SkillModel.getByCategory(catId);

    const response: ApiResponse<any[]> = {
      success: true,
      data: skills
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching skills by category:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch skills by category'
    };
    res.status(500).json(response);
  }
};

// Get skill by ID
export const getSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const skillId = parseInt(id as string);

    if (isNaN(skillId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid skill ID'
      };
      res.status(400).json(response);
      return;
    }

    const skill = await SkillModel.getById(skillId);

    if (!skill) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Skill not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<any> = {
      success: true,
      data: skill
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching skill:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch skill'
    };
    res.status(500).json(response);
  }
};

// Get all skill categories
export const getSkillCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await SkillCategoryModel.getAll();

    const response: ApiResponse<any[]> = {
      success: true,
      data: categories
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to fetch skill categories'
    };
    res.status(500).json(response);
  }
};

// Create new skill (admin only)
export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const skillData = req.body;

    const skillId = await SkillModel.create(skillData);

    const response: ApiResponse<{ id: number }> = {
      success: true,
      data: { id: skillId },
      message: 'Skill created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating skill:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to create skill'
    };
    res.status(500).json(response);
  }
};

// Update skill (admin only)
export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const skillId = parseInt(id as string);
    const skillData = req.body;

    if (isNaN(skillId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid skill ID'
      };
      res.status(400).json(response);
      return;
    }

    const success = await SkillModel.update(skillId, skillData);

    if (!success) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Skill not found or update failed'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Skill updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating skill:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to update skill'
    };
    res.status(500).json(response);
  }
};

// Delete skill (admin only)
export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const skillId = parseInt(id as string);

    if (isNaN(skillId)) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Invalid skill ID'
      };
      res.status(400).json(response);
      return;
    }

    const success = await SkillModel.delete(skillId);

    if (!success) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        error: 'Skill not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Skill deleted successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting skill:', error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: 'Failed to delete skill'
    };
    res.status(500).json(response);
  }
};