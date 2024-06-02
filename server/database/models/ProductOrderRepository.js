const AbstractRepository = require("./AbstractRepository");

class ProductOrderRepository extends AbstractRepository {
  constructor() {
    super({ table: "product_order" });
  }

  async create({ productId, orderId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (productId, orderId) VALUES (?, ?)`,
      [productId, orderId]
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

  async update(id, { productId, orderId }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET productId = ?, orderId = ? WHERE id = ?`,
      [productId, orderId, id]
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

module.exports = ProductOrderRepository;
