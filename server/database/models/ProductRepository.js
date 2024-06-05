const AbstractRepository = require("./AbstractRepository");

class ProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "Product" });
  }

  async readAllProducts() {
    const [products] = await this.database.query(`SELECT * FROM ${this.table}`);

    return products;
  }

  async readAllProductsByCategory(category_id) {
    const [productsByCategory] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN product_category ON ${this.table}.id = product_category.product_id WHERE product_category.category_id = ?`,
      [category_id]
    );

    return productsByCategory;
  }

  async readProduct(id) {
    const [products] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return products[0];
  }

  async readProductByCategory(product_id, category_id) {
    const [productsByCategory] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN product_category ON ${this.table}.id = product_category.product_id WHERE product_category.product_id = ? AND product_category.category_id = ?`,
      [product_id, category_id]
    );

    return productsByCategory[0];
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

  async deleteProduct(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = ProductRepository;
