import pool from '../config/database';
import { Service } from '../types/index';

export class ServiceModel {
  // Get all active services
  static async getAll(): Promise<Service[]> {
    const [rows] = await pool.execute(`
      SELECT * FROM services
      WHERE is_active = TRUE
      ORDER BY display_order
    `);

    return (rows as any[]).map(row => ({
      ...row,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    }));
  }

  // Get all services (including inactive)
  static async getAllAdmin(): Promise<Service[]> {
    const [rows] = await pool.execute(`
      SELECT * FROM services
      ORDER BY display_order
    `);

    return (rows as any[]).map(row => ({
      ...row,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    }));
  }

  // Get service by ID
  static async getById(id: number): Promise<Service | null> {
    const [rows] = await pool.execute('SELECT * FROM services WHERE id = ?', [id]);

    if ((rows as any[]).length === 0) {
      return null;
    }

    const row = (rows as any[])[0];
    return {
      ...row,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    };
  }

  // Create new service
  static async create(serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const { title, description, icon_name, display_order, is_active } = serviceData;

    const [result] = await pool.execute(`
      INSERT INTO services (title, description, icon_name, display_order, is_active)
      VALUES (?, ?, ?, ?, ?)
    `, [title, description, icon_name, display_order, is_active]);

    return (result as any).insertId;
  }

  // Update service
  static async update(id: number, serviceData: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> {
    const { title, description, icon_name, display_order, is_active } = serviceData;

    const [result] = await pool.execute(`
      UPDATE services SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        icon_name = COALESCE(?, icon_name),
        display_order = COALESCE(?, display_order),
        is_active = COALESCE(?, is_active)
      WHERE id = ?
    `, [title, description, icon_name, display_order, is_active, id]);

    return (result as any).affectedRows > 0;
  }

  // Delete service
  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM services WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}