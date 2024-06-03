const AbstractRepository = require("./AbstractRepository");

class ProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "category" });
  }

  async create({ name, image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, image) VALUES (?, ?)`,
      [name, image]
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

  async update(id, { name, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, image = ? WHERE id = ?`,
      [name, image, id]
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

module.exports = ProductRepository;
