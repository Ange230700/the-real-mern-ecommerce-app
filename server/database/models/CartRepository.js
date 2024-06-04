const AbstractRepository = require("./AbstractRepository");

class CartRepository extends AbstractRepository {
  constructor() {
    super({ table: "Cart" });
  }

  async createCart({ user_id }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id) VALUES (?)`,
      [user_id]
    );

    return result.insertId;
  }

  async readCart(user_id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.user_id = ?`,
      [user_id]
    );

    return rows[0];
  }

  async readAllCarts() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id`
    );

    return rows;
  }

  async updateCart(id, { user_id }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user_id = ? WHERE id = ?`,
      [user_id, id]
    );

    return result.affectedRows;
  }

  async deleteCart(user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ?`,
      [user_id]
    );

    return result.affectedRows;
  }
}

module.exports = CartRepository;
