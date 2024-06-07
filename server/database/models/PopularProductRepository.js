const AbstractRepository = require("./AbstractRepository");

class PopularProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "Popular_product" });
  }

  async readAllPopularProducts() {
    const [popular_products] = await this.database.query(
      `SELECT * FROM ${this.table}`
    );

    return popular_products;
  }

  async readPopularProduct(popular_product_id) {
    const [popular_products] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [popular_product_id]
    );

    return popular_products[0];
  }

  async updatePopularProduct(popular_product_id, { title, price, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = COALESCE(?, title), price = COALESCE(?, price), image = COALESCE(?, image) WHERE id = ?`,
      [title, price, image, popular_product_id]
    );

    return result.affectedRows;
  }

  async createPopularProduct({ title, price, image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, price, image) VALUES (?, ?, ?)`,
      [title, price, image]
    );

    return result.insertId;
  }

  async deletePopularProduct(popular_product_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [popular_product_id]
    );

    return result.affectedRows;
  }
}

module.exports = PopularProductRepository;
