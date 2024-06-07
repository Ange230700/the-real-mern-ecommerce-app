const AbstractRepository = require("./AbstractRepository");

class CartRepository extends AbstractRepository {
  constructor() {
    super({ table: "Cart" });
  }

  async readAllCarts(user_id) {
    const [carts] = await this.database.query(
      `SELECT ${this.table}.id AS cart_id, ${this.table}.user_id, ${this.table}.status, User.username FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.user_id = ? AND ${this.table}.user_id = User.id`,
      [user_id]
    );

    return carts;
  }

  async readCart(cart_id, user_id) {
    const [carts] = await this.database.query(
      `SELECT ${this.table}.id AS cart_id, ${this.table}.user_id, ${this.table}.status, User.username FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.user_id = ? AND ${this.table}.user_id = User.id AND ${this.table}.id = ?`,
      [user_id, cart_id]
    );

    return carts[0];
  }

  // async updateCart(cart_id, userId, { user_id, status }) {
  //   const [result] = await this.database.query(
  //     `UPDATE ${this.table} SET user_id = COALESCE(?, user_id), status = COALESCE(?, status) WHERE id = ? AND user_id = ?`,
  //     [user_id, status, cart_id, userId]
  //   );

  //   return result.affectedRows;
  // }

  async createCart(userId, { user_id, status }) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (user_id !== Number(userId)) {
      throw new Error("User ID is invalid");
    }

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, status) VALUES (?, ?)`,
      [user_id, status]
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
