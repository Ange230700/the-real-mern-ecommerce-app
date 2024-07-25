const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "User" });
  }

  // The C of CRUD - Create operation

  async createUser({ username, password }) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, password) VALUES (?, ?)`,
      [username, password]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readUser(user_id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [users] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [user_id]
    );

    // Return the first row of the result, which represents the user
    return users[0];
  }

  async readAllUsers() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [users] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of users
    return users;
  }

  // The U of CRUD - Update operation

  async updateUser(user_id, { username, password }) {
    // Execute the SQL UPDATE query to modify an existing user in the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET username = ?, password = ? WHERE id = ?`,
      [username, password, user_id]
    );

    // Return the number of affected rows (0 or 1)
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation

  async deleteUser(user_id) {
    // Execute the SQL DELETE query to remove a user by its ID
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [user_id]
    );

    // Return the number of affected rows (0 or 1)
    return result.affectedRows;
  }
}

module.exports = UserRepository;
