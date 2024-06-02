const AbstractRepository = require("./AbstractRepository");

class PopularProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "popularProduct" });
  }

  async create({ title, price, image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (product_id) VALUES (?)`,
      [title, price, image]
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

  async update(id, { title, price, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, price = ?, image = ? WHERE id = ?`,
      [title, price, image, id]
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

module.exports = PopularProductRepository;
