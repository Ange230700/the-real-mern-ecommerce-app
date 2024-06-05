const AbstractRepository = require("./AbstractRepository");

class ProductCategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "Product_category" });
  }

  async createProductCategory({ product_id, category_id }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (product_id, category_id) VALUES (?, ?)`,
      [product_id, category_id]
    );

    return result.insertId;
  }

  async readProductCategory(product_id, category_id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE product_id = ? AND category_id = ?`,
      [product_id, category_id]
    );

    return rows[0];
  }

  async readAllProductCategory() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async updateProductCategory({ product_id, category_id }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET product_id = ?, category_id = ?`,
      [product_id, category_id]
    );

    return result.affectedRows;
  }

  async deleteProductCategory(product_id, category_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE product_id = ? AND category_id = ?`,
      [product_id, category_id]
    );

    return result.affectedRows;
  }
}

module.exports = ProductCategoryRepository;
