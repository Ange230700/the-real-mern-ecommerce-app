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

  async readCartAsUser(id, user_id) {
    const [carts] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.id = ? AND ${this.table}.user_id = ?`,
      [id, user_id]
    );

    return carts[0];
  }

  async updateCartAsUser(id, userId, { user_id }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user_id = ? WHERE id = ? AND user_id = ?`,
      [user_id, id, userId]
    );

    return result.affectedRows;
  }

  async createCartAsUser(userId, { user_id }) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id) VALUES (?)`,
      [user_id]
    );

    return result.insertId;
  }

  async deleteCartAsUser(id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );

    return result.affectedRows;
  }
}

module.exports = CartRepository;
