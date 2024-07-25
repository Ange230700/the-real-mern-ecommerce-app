const AbstractRepository = require("./AbstractRepository");

class ItemRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "Item" });
  }

  // The C of CRUD - Create operation

  async createItem({ title, user_id }) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, user_id) VALUES (?, ?)`,
      [title, user_id]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readItem(item_id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [items] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [item_id]
    );

    // Return the first row of the result, which represents the item
    return items[0];
  }

  async readAllItems() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [items] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of items
    return items;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async updateItem(item_id, { title, user_id }) {
    // Execute the SQL UPDATE query to modify an existing item in the "item" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, user_id = ? WHERE id = ?`,
      [title, user_id, item_id]
    );

    // Return the number of affected rows (0 or 1)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async deleteItem(item_id) {
    // Execute the SQL DELETE query to remove an item from the "item" table
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [item_id]
    );

    // Return the number of affected rows (0 or 1)
    return result.affectedRows;
  }
}

module.exports = ItemRepository;
