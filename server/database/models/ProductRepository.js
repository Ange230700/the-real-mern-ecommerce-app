const AbstractRepository = require("./AbstractRepository");

class ProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "Product" });
  }

  async createProduct({
    title,
    price,
    image_url,
    product_adjective,
    product_material,
    product_description,
  }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, price, image_url, product_adjective, product_material, product_description) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        price,
        image_url,
        product_adjective,
        product_material,
        product_description,
      ]
    );

    return result.insertId;
  }

  async readProduct(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readProductByCategory(productId, categoryId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} INNER JOIN product_category ON ${this.table}.id = product_category.productId WHERE product_category.productId = ? AND product_category.categoryId = ?`,
      [productId, categoryId]
    );

    return rows[0];
  }

  async readAllProducts() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async readAllProductsByCategory(categoryId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} INNER JOIN product_category ON ${this.table}.id = product_category.productId WHERE product_category.categoryId = ?`,
      [categoryId]
    );

    return rows;
  }

  async updateProduct(
    id,
    {
      title,
      price,
      image_url,
      product_adjective,
      product_material,
      product_description,
    }
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, price = ?, image_url = ?, product_adjective = ?, product_material = ?, product_description = ? WHERE id = ?`,
      [
        title,
        price,
        image_url,
        product_adjective,
        product_material,
        product_description,
        id,
      ]
    );

    return result.affectedRows;
  }

  async deleteProduct(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = ProductRepository;
