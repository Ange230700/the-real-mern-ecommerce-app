const AbstractRepository = require("./AbstractRepository");

class PurchaseRepository extends AbstractRepository {
  constructor() {
    super({ table: "Purchase" });
  }

  async readAllPurchases(user_id) {
    const [purchases] = await this.database.query(
      `SELECT ${this.table}.user_id, ${this.table}.total, User.username, User.is_admin FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.user_id = ?`,
      [user_id]
    );

    return purchases;
  }

  async readPurchase(order_id, user_id) {
    const [purchases] = await this.database.query(
      `SELECT ${this.table}.user_id, ${this.table}.total, User.username, User.is_admin FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.id = ? AND ${this.table}.user_id = ?`,
      [order_id, user_id]
    );

    return purchases[0];
  }

  async updatePurchase(order_id, user_id, { total }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET total = COALESCE(?, total) WHERE id = ? AND user_id = ?`,
      [total, order_id, user_id]
    );

    return result.affectedRows;
  }

  async createPurchase(user_id, { total }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, total) VALUES (?, ?)`,
      [user_id, total]
    );

    return result.insertId;
  }

  async deletePurchase(order_id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
      [order_id, user_id]
    );

    return result.affectedRows;
  }
}

module.exports = PurchaseRepository;
