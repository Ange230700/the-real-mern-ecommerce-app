const AbstractRepository = require("./AbstractRepository");

class PurchaseRepository extends AbstractRepository {
  constructor() {
    super({ table: "purchase" });
  }

  async create({ user_id, total }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, total) VALUES (?, ?)`,
      [user_id, total]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async update(id, { user_id, total }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user_id = ?, total = ? WHERE id = ?`,
      [user_id, total, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = PurchaseRepository;
