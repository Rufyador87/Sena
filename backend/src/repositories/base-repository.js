import { pool } from '../db/pool.js';

export class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findAll() {
    const result = await pool.query(`SELECT * FROM ${this.tableName} ORDER BY id DESC`);
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }

  async create(payload) {
    const columns = Object.keys(payload);
    const values = Object.values(payload);
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

    const query = `
      INSERT INTO ${this.tableName} (${columns.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id, payload) {
    const columns = Object.keys(payload);
    const values = Object.values(payload);

    if (columns.length === 0) {
      return this.findById(id);
    }

    const setClause = columns.map((column, index) => `${column} = $${index + 1}`).join(', ');

    const query = `
      UPDATE ${this.tableName}
      SET ${setClause}, updated_at = NOW()
      WHERE id = $${columns.length + 1}
      RETURNING *
    `;

    const result = await pool.query(query, [...values, id]);
    return result.rows[0] || null;
  }

  async remove(id) {
    const result = await pool.query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id`, [id]);
    return Boolean(result.rows[0]);
  }
}
