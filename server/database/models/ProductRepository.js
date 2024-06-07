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
      `SELECT ${this.table}.title, ${this.table}.price, ${this.table}.image_url, ${this.table}.product_adjective, ${this.table}.product_material, ${this.table}.product_description, Category.name, Category.image, Product_category.product_id, Product_category.category_id FROM ${this.table} JOIN product_category ON ${this.table}.id = product_category.product_id JOIN Category ON product_category.category_id = Category.id WHERE Category.id = ?`,
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
      `SELECT ${this.table}.title, ${this.table}.price, ${this.table}.image_url, ${this.table}.product_adjective, ${this.table}.product_material, ${this.table}.product_description, Category.name, Category.image, Product_category.product_id, Product_category.category_id FROM ${this.table} JOIN product_category ON ${this.table}.id = product_category.product_id JOIN Category ON product_category.category_id = Category.id WHERE product_category.product_id = ? AND product_category.category_id = ?`,
      [product_id, category_id]
    );

    return productsByCategory[0];
  }

  async updateProduct(
    product_id,
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
      `UPDATE ${this.table} SET title = COALESCE(?, title), price = COALESCE(?, price), image_url = COALESCE(?, image_url), product_adjective = COALESCE(?, product_adjective), product_material = COALESCE(?, product_material), product_description = COALESCE(?, product_description) WHERE id = ?`,
      [
        title,
        price,
        image_url,
        product_adjective,
        product_material,
        product_description,
        product_id,
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

  async deleteProduct(product_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [product_id]
    );

    return result.affectedRows;
  }
}

module.exports = ProductRepository;
