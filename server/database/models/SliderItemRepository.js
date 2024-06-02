const AbstractRepository = require("./AbstractRepository");

class SliderItemRepository extends AbstractRepository {
  constructor() {
    super({ table: "sliderItem" });
  }

  async create({ title, image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, image) VALUES (?, ?)`,
      [title, image]
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

  async update(id, { title, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, image = ? WHERE id = ?`,
      [title, image, id]
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

module.exports = SliderItemRepository;
