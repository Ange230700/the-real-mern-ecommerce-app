const AbstractRepository = require("./AbstractRepository");

class ProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "Category" });
  }

  async createCategory({ name, image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, image) VALUES (?, ?)`,
      [name, image]
    );

    return result.insertId;
  }

  async readCategory(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readCategoryByProduct(category_id, product_id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN product_category ON ${this.table}.id = product_category.category_id WHERE product_category.category_id = ? AND product_category.product_id = ?`,
      [category_id, product_id]
    );

    return rows[0];
  }

  async readAllCategories() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async readAllCategoriesByProduct(product_id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN product_category ON ${this.table}.id = product_category.category_id WHERE product_category.product_id = ?`,
      [product_id]
    );

    return rows;
  }

  async updateCategory(id, { name, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, image = ? WHERE id = ?`,
      [name, image, id]
    );

    return result.affectedRows;
  }

  async deleteCategory(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = ProductRepository;
