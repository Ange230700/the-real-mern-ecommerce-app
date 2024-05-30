const AbstractRepository = require("./AbstractRepository");

class ProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "product" });
  }

  async create(product) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, price, image_url) VALUES (?, ?, ?)`,
      [product.title, product.price, product.image_url]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async update(product) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, price = ?, image_url = ? WHERE id = ?`,
      [product.title, product.price, product.image_url, product.id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = ProductRepository;
