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

  async readPopularProduct(id) {
    const [popular_products] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return popular_products[0];
  }

  async updatePopularProduct(id, { title, price, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, price = ?, image = ? WHERE id = ?`,
      [title, price, image, id]
    );

    return result.affectedRows;
  }

  async createPopularProduct({ title, price, image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (product_id) VALUES (?)`,
      [title, price, image]
    );

    return result.insertId;
  }

  async deletePopularProduct(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = PopularProductRepository;
