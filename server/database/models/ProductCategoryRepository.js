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

  async createProductCategory({ product_id, category_id }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (product_id, category_id) VALUES (?, ?)`,
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
