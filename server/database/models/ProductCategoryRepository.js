const AbstractRepository = require("./AbstractRepository");

class ProductCategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "Product_category" });
  }

  async readAllProductCategory() {
    const [productCategoryDuos] = await this.database.query(
      `SELECT * FROM ${this.table}`
    );

    return productCategoryDuos;
  }

  async readProductCategory(product_id, category_id) {
    const [productCategoryDuos] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE product_id = ? AND category_id = ?`,
      [product_id, category_id]
    );

    return productCategoryDuos[0];
  }

  async updateProductCategory(
    productId,
    categoryId,
    { product_id, category_id }
  ) {
    if (!product_id || !category_id) {
      throw new Error("Missing required fields");
    }

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET product_id = ?, category_id = ?`,
      [product_id, category_id]
    );

    return result.affectedRows;
  }

  async createProductCategory({ product_id, category_id }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (product_id, category_id) VALUES (?, ?)`,
      [product_id, category_id]
    );

    return result.insertId;
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
