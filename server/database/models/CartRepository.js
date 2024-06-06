const AbstractRepository = require("./AbstractRepository");

class CartRepository extends AbstractRepository {
  constructor() {
    super({ table: "Cart" });
  }

  async readAllCarts() {
    const [carts] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id`
    );

    return carts;
  }

  async readCart(cart_id) {
    const [carts] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.id = ?`,
      [cart_id]
    );

    return carts[0];
  }

  async updateCart(cart_id, { user_id }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user_id = COALESCE(?, user_id) WHERE id = ?`,
      [user_id, cart_id]
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

  async deleteCart(id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );

    return result.affectedRows;
  }
}

module.exports = CartRepository;
