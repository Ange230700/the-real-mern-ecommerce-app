const AbstractRepository = require("./AbstractRepository");

class OrderRepository extends AbstractRepository {
  constructor() {
    super({ table: "order" });
  }

  async create(order) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, total) VALUES (?, ?)`,
      [order.user_id, order.total]
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

  async update(order) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user_id = ?, total = ? WHERE id = ?`,
      [order.user_id, order.total, order.id]
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

module.exports = OrderRepository;
