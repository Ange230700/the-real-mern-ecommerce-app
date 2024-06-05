const AbstractRepository = require("./AbstractRepository");

class CartRepository extends AbstractRepository {
  constructor() {
    super({ table: "Cart" });
  }

  async createCartAsUser(user_id, cart) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} JOIN User ON ${this.table}.user_id = User.id (user_id) VALUES (?) WHERE User.id = ?`,
      [cart.user_id, user_id]
    );

    return result.insertId;
  }

  async readCartAsUser(id, user_id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.id = ? AND ${this.table}.user_id = ?`,
      [id, user_id]
    );

    return rows[0];
  }

  async readAllCartsAsUser(user_id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.user_id = ?`,
      [user_id]
    );

    return rows;
  }

  async updateCartAsUser(id, user_id, cart) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} JOIN User ON ${this.table}.user_id = User.id SET ${this.table}.user_id = COALESCE(?, ${this.table}.user_id) WHERE ${this.table}.id = ? AND ${this.table}.user_id = ?`,
      [cart.user_id, id, user_id]
    );

    return result.affectedRows;
  }

  async deleteCartAsUser(id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.id = ? AND ${this.table}.user_id = ?`,
      [id, user_id]
    );

    return result.affectedRows;
  }
}

module.exports = CartRepository;
