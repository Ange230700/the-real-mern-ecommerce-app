const AbstractRepository = require("./AbstractRepository");

class SliderItemRepository extends AbstractRepository {
  constructor() {
    super({ table: "Slider_item" });
  }

  async readAllSliderItems() {
    const [slider_items] = await this.database.query(
      `SELECT * FROM ${this.table}`
    );

    return slider_items;
  }

  async readSliderItem(id) {
    const [slider_items] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return slider_items[0];
  }

  async updateSliderItem(id, { title, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, image = ? WHERE id = ?`,
      [title, image, id]
    );

    return result.affectedRows;
  }

  async createSliderItem({ title, image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, image) VALUES (?, ?)`,
      [title, image]
    );

    return result.insertId;
  }

  async deleteSliderItem(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = SliderItemRepository;
