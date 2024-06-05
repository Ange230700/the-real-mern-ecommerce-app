const AbstractRepository = require("./AbstractRepository");

class PopularProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "Popular_product" });
  }

  async createPopularProduct({ title, price, image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (product_id) VALUES (?)`,
      [title, price, image]
    );

    return result.insertId;
  }

  async readPopularProduct(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAllPopularProducts() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async updatePopularProduct(id, { title, price, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, price = ?, image = ? WHERE id = ?`,
      [title, price, image, id]
    );

    return result.affectedRows;
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
