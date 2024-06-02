const AbstractRepository = require("./AbstractRepository");

class ProductCategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "product_category" });
  }

  async create({ productId, categoryId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (productId, categoryId) VALUES (?, ?)`,
      [productId, categoryId]
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

  async update(id, { productId, categoryId }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET productId = ?, categoryId = ? WHERE id = ?`,
      [productId, categoryId, id]
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

module.exports = ProductCategoryRepository;
