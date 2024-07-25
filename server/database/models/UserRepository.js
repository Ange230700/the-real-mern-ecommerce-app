const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "User" });
  }

  async readAllUsers() {
    const [users] = await this.database.query(
      `SELECT id AS userId, username, is_admin FROM ${this.table}`
    );

    return users;
  }

  async readUser(user_id) {
    if (!user_id) {
      throw new Error("User ID is required");
    }

    const [users] = await this.database.query(
      `SELECT id AS userId, username, is_admin FROM ${this.table} WHERE id = ?`,
      [user_id]
    );

    return users[0];
  }

  async updateUser(user_id, { username, email, password, is_admin }) {
    if (!user_id) {
      throw new Error("User ID is required");
    }

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password), is_admin = COALESCE(?, is_admin) WHERE id = ?`,
      [username, email, password, is_admin, user_id]
    );

    return result.affectedRows;
  }

  async deleteUser(user_id) {
    if (!user_id) {
      throw new Error("User ID is required");
    }

    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [user_id]
    );

    return result.affectedRows;
  }
}

module.exports = UserRepository;
