const AbstractRepository = require("./AbstractRepository");

class CartRepository extends AbstractRepository {
  constructor() {
    super({ table: "cart" });
  }

  async create({ userId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (userId) VALUES (?)`,
      [userId]
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

  async update(id, { userId }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET userId = ? WHERE id = ?`,
      [userId, id]
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

module.exports = CartRepository;
