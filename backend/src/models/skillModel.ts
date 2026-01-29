import pool from '../config/database';
import { Skill, SkillCategory } from '../types/index';

export class SkillModel {
  // Get all skills with categories
  static async getAll(): Promise<Skill[]> {
    const [rows] = await pool.execute(`
      SELECT
        s.*,
        sc.name as category_name
      FROM skills s
      JOIN skill_categories sc ON s.category_id = sc.id
      ORDER BY sc.display_order, s.display_order
    `);

    return (rows as any[]).map(row => ({
      ...row,
      created_at: new Date(row.created_at),
      category: {
        id: row.category_id,
        name: row.category_name,
        display_order: row.category_display_order,
        created_at: new Date(row.category_created_at)
      }
    }));
  }

  // Get skills by category
  static async getByCategory(categoryId: number): Promise<Skill[]> {
    const [rows] = await pool.execute(`
      SELECT
        s.*,
        sc.name as category_name
      FROM skills s
      JOIN skill_categories sc ON s.category_id = sc.id
      WHERE s.category_id = ?
      ORDER BY s.display_order
    `, [categoryId]);

    return (rows as any[]).map(row => ({
      ...row,
      created_at: new Date(row.created_at),
      category: {
        id: row.category_id,
        name: row.category_name,
        display_order: row.category_display_order,
        created_at: new Date(row.category_created_at)
      }
    }));
  }

  // Get skill by ID
  static async getById(id: number): Promise<Skill | null> {
    const [rows] = await pool.execute(`
      SELECT
        s.*,
        sc.name as category_name
      FROM skills s
      JOIN skill_categories sc ON s.category_id = sc.id
      WHERE s.id = ?
    `, [id]);

    if ((rows as any[]).length === 0) {
      return null;
    }

    const row = (rows as any[])[0];
    return {
      ...row,
      created_at: new Date(row.created_at),
      category: {
        id: row.category_id,
        name: row.category_name,
        display_order: row.category_display_order,
        created_at: new Date(row.category_created_at)
      }
    };
  }

  // Create new skill
  static async create(skillData: Omit<Skill, 'id' | 'created_at' | 'category'>): Promise<number> {
    const { category_id, name, proficiency_level, display_order } = skillData;

    const [result] = await pool.execute(`
      INSERT INTO skills (category_id, name, proficiency_level, display_order)
      VALUES (?, ?, ?, ?)
    `, [category_id, name, proficiency_level, display_order]);

    return (result as any).insertId;
  }

  // Update skill
  static async update(id: number, skillData: Partial<Omit<Skill, 'id' | 'created_at' | 'category'>>): Promise<boolean> {
    const { category_id, name, proficiency_level, display_order } = skillData;

    const [result] = await pool.execute(`
      UPDATE skills SET
        category_id = COALESCE(?, category_id),
        name = COALESCE(?, name),
        proficiency_level = COALESCE(?, proficiency_level),
        display_order = COALESCE(?, display_order)
      WHERE id = ?
    `, [category_id, name, proficiency_level, display_order, id]);

    return (result as any).affectedRows > 0;
  }

  // Delete skill
  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM skills WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}

export class SkillCategoryModel {
  // Get all skill categories
  static async getAll(): Promise<SkillCategory[]> {
    const [rows] = await pool.execute(`
      SELECT * FROM skill_categories
      ORDER BY display_order
    `);

    return (rows as any[]).map(row => ({
      ...row,
      created_at: new Date(row.created_at)
    }));
  }

  // Get category by ID
  static async getById(id: number): Promise<SkillCategory | null> {
    const [rows] = await pool.execute('SELECT * FROM skill_categories WHERE id = ?', [id]);

    if ((rows as any[]).length === 0) {
      return null;
    }

    const row = (rows as any[])[0];
    return {
      ...row,
      created_at: new Date(row.created_at)
    };
  }

  // Create new category
  static async create(categoryData: Omit<SkillCategory, 'id' | 'created_at'>): Promise<number> {
    const { name, display_order } = categoryData;

    const [result] = await pool.execute(`
      INSERT INTO skill_categories (name, display_order)
      VALUES (?, ?)
    `, [name, display_order]);

    return (result as any).insertId;
  }

  // Update category
  static async update(id: number, categoryData: Partial<Omit<SkillCategory, 'id' | 'created_at'>>): Promise<boolean> {
    const { name, display_order } = categoryData;

    const [result] = await pool.execute(`
      UPDATE skill_categories SET
        name = COALESCE(?, name),
        display_order = COALESCE(?, display_order)
      WHERE id = ?
    `, [name, display_order, id]);

    return (result as any).affectedRows > 0;
  }

  // Delete category
  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM skill_categories WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}