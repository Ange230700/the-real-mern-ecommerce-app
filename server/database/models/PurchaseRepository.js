const AbstractRepository = require("./AbstractRepository");

class PurchaseRepository extends AbstractRepository {
  constructor() {
    super({ table: "Purchase" });
  }

  async readAllPurchases(user_id) {
    const [purchases] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.user_id = ?`,
      [user_id]
    );

    return purchases;
  }

  async readPurchase(id, user_id) {
    const [purchases] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.id = ? AND ${this.table}.user_id = ?`,
      [id, user_id]
    );

    return purchases[0];
  }

  async updatePurchase(id, userId, { user_id, total }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user_id = ?, total = ? WHERE id = ? AND user_id = ?`,
      [user_id, total, id, userId]
    );

    return result.affectedRows;
  }

  async createPurchase(userId, { user_id, total }) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, total) VALUES (?, ?)`,
      [user_id, total]
    );

    return result.insertId;
  }

  async deletePurchase(id, user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );

    return result.affectedRows;
  }
}

module.exports = PurchaseRepository;
