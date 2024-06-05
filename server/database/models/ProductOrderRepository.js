const AbstractRepository = require("./AbstractRepository");

class ProductOrderRepository extends AbstractRepository {
  constructor() {
    super({ table: "Product_order" });
  }

  async createProductOrder({ product_id, order_id }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (product_id, order_id) VALUES (?, ?)`,
      [product_id, order_id]
    );

    return result.insertId;
  }

  async readProductOrder(product_id, order_id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE product_id = ? AND order_id = ?`,
      [product_id, order_id]
    );

    return rows[0];
  }

  async readAllProductOrder() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async updateProductOrder({ product_id, order_id }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET product_id = ?, order_id = ?`,
      [product_id, order_id]
    );

    return result.affectedRows;
  }

  async deleteProductOrder(product_id, order_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE product_id = ? AND order_id = ?`,
      [product_id, order_id]
    );

    return result.affectedRows;
  }
}

module.exports = ProductOrderRepository;
