const AbstractRepository = require("./AbstractRepository");

class CartRepository extends AbstractRepository {
  constructor() {
    super({ table: "Cart" });
  }

  async readAllCarts(user_id) {
    const [carts] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE ${this.table}.user_id = ?`,
      [user_id]
    );

    return carts;
  }

  async readCart(cart_id, user_id) {
    const [carts] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE ${this.table}.id = ? AND ${this.table}.user_id = ?`,
      [cart_id, user_id]
    );

    return carts[0];
  }

  async updateCart(cart_id, userId, { user_id }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user_id = COALESCE(?, user_id) WHERE id = ? AND user_id = ?`,
      [user_id, cart_id, userId]
    );

    return result.affectedRows;
  }

  async createCart(userId, { user_id }) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id) VALUES (?)`,
      [user_id]
    );

    return result.insertId;
  }

  async deleteCart(cart_id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
      [cart_id, user_id]
    );

    return result.affectedRows;
  }
}

module.exports = CartRepository;
