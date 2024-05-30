const AbstractRepository = require("./AbstractRepository");

class CartRepository extends AbstractRepository {
  constructor() {
    super({ table: "cart" });
  }

  async create(cart) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id) VALUES (?)`,
      [cart.user_id]
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

  async update(cart) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user_id = ? WHERE id = ?`,
      [cart.user_id, cart.id]
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

module.exports = CartRepository;
