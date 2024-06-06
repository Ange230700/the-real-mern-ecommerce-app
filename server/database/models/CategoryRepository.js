const AbstractRepository = require("./AbstractRepository");

class ProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "Category" });
  }

  async readAllCategories() {
    const [categories] = await this.database.query(
      `SELECT * FROM ${this.table}`
    );

    return categories;
  }

  async readAllCategoriesByProduct(product_id) {
    const [categoriesByProduct] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN product_category ON ${this.table}.id = product_category.category_id WHERE product_category.product_id = ?`,
      [product_id]
    );

    return categoriesByProduct;
  }

  async readCategory(id) {
    const [categories] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return categories[0];
  }

  async readCategoryByProduct(category_id, product_id) {
    const [categoriesByProduct] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN product_category ON ${this.table}.id = product_category.category_id WHERE product_category.category_id = ? AND product_category.product_id = ?`,
      [category_id, product_id]
    );

    return categoriesByProduct[0];
  }

  async updateCategory(id, { name, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, image = ? WHERE id = ?`,
      [name, image, id]
    );

    return result.affectedRows;
  }

  async createCategory({ name, image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, image) VALUES (?, ?)`,
      [name, image]
    );

    return result.insertId;
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
