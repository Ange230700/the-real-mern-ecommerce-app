const AbstractRepository = require("./AbstractRepository");

class PurchaseRepository extends AbstractRepository {
  constructor() {
    super({ table: "Purchase" });
  }

  async createPurchase({ user_id, total }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, total) VALUES (?, ?)`,
      [user_id, total]
    );

    return result.insertId;
  }

  async readPurchase(user_id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id WHERE ${this.table}.user_id = ?`,
      [user_id]
    );

    return rows[0];
  }

  async readAllPurchases() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.user_id = User.id`
    );

    return rows;
  }

  async updatePurchase(id, { user_id, total }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user_id = ?, total = ? WHERE id = ?`,
      [user_id, total, id]
    );

    return result.affectedRows;
  }

  async deletePurchase(user_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ?`,
      [user_id]
    );

    return result.affectedRows;
  }
}

module.exports = PurchaseRepository;
