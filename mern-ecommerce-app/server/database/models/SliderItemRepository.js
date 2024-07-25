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

  async readSliderItem(slider_item_id) {
    const [slider_items] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [slider_item_id]
    );

    return slider_items[0];
  }

  async updateSliderItem(slider_item_id, { title, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = COALESCE(?, title), image = COALESCE(?, image) WHERE id = ?`,
      [title, image, slider_item_id]
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

  async deleteSliderItem(slider_item_id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [slider_item_id]
    );

    return result.affectedRows;
  }
}

module.exports = SliderItemRepository;
