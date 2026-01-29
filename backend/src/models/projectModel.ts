import pool from '../config/database';
import { Project } from '../types/index';

export class ProjectModel {
  // Get all projects
  static async getAll(): Promise<Project[]> {
    const [rows] = await pool.execute(`
      SELECT
        p.*,
        GROUP_CONCAT(pt.technology_name) as technologies
      FROM projects p
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      GROUP BY p.id
      ORDER BY p.display_order, p.created_at DESC
    `);

    return (rows as any[]).map(row => ({
      ...row,
      technologies: row.technologies ? row.technologies.split(',') : [],
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    }));
  }

  // Get featured projects
  static async getFeatured(): Promise<Project[]> {
    const [rows] = await pool.execute(`
      SELECT
        p.*,
        GROUP_CONCAT(pt.technology_name) as technologies
      FROM projects p
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      WHERE p.featured = TRUE
      GROUP BY p.id
      ORDER BY p.display_order, p.created_at DESC
    `);

    return (rows as any[]).map(row => ({
      ...row,
      technologies: row.technologies ? row.technologies.split(',') : [],
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    }));
  }

  // Get project by ID
  static async getById(id: number): Promise<Project | null> {
    const [rows] = await pool.execute(`
      SELECT
        p.*,
        GROUP_CONCAT(pt.technology_name) as technologies
      FROM projects p
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      WHERE p.id = ?
      GROUP BY p.id
    `, [id]);

    if ((rows as any[]).length === 0) {
      return null;
    }

    const row = (rows as any[])[0];
    return {
      ...row,
      technologies: row.technologies ? row.technologies.split(',') : [],
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    };
  }

  // Create new project
  static async create(projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const {
      title,
      description,
      problem,
      solution,
      result,
      image_url,
      project_url,
      github_url,
      featured,
      display_order,
      technologies
    } = projectData;

    const [insertResult] = await pool.execute(`
      INSERT INTO projects (
        title, description, problem, solution, result,
        image_url, project_url, github_url, featured, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, description, problem, solution, result,
      image_url, project_url, github_url, featured, display_order
    ]);

    const projectId = (insertResult as any).insertId;

    // Insert technologies if provided
    if (technologies && technologies.length > 0) {
      const techValues = technologies.map(tech => [projectId, tech]);
      await pool.execute(`
        INSERT INTO project_technologies (project_id, technology_name)
        VALUES ${techValues.map(() => '(?, ?)').join(', ')}
      `, techValues.flat());
    }

    return projectId;
  }

  // Update project
  static async update(id: number, projectData: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> {
    const {
      title,
      description,
      problem,
      solution,
      result,
      image_url,
      project_url,
      github_url,
      featured,
      display_order,
      technologies
    } = projectData;

    const [updateResult] = await pool.execute(`
      UPDATE projects SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        problem = COALESCE(?, problem),
        solution = COALESCE(?, solution),
        result = COALESCE(?, result),
        image_url = COALESCE(?, image_url),
        project_url = COALESCE(?, project_url),
        github_url = COALESCE(?, github_url),
        featured = COALESCE(?, featured),
        display_order = COALESCE(?, display_order)
      WHERE id = ?
    `, [
      title, description, problem, solution, result,
      image_url, project_url, github_url, featured, display_order, id
    ]);

    // Update technologies if provided
    if (technologies !== undefined) {
      // Delete existing technologies
      await pool.execute('DELETE FROM project_technologies WHERE project_id = ?', [id]);

      // Insert new technologies
      if (technologies.length > 0) {
        const techValues = technologies.map(tech => [id, tech]);
        await pool.execute(`
          INSERT INTO project_technologies (project_id, technology_name)
          VALUES ${techValues.map(() => '(?, ?)').join(', ')}
        `, techValues.flat());
      }
    }

    return (updateResult as any).affectedRows > 0;
  }

  // Delete project
  static async delete(id: number): Promise<boolean> {
    const [deleteResult] = await pool.execute('DELETE FROM projects WHERE id = ?', [id]);
    return (deleteResult as any).affectedRows > 0;
  }
}