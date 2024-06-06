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

  async readUser(id) {
    const [users] = await this.database.query(
      `SELECT id AS userId, username, is_admin FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return users[0];
  }

  async updateUser(id, { username, email, password, is_admin }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password), is_admin = COALESCE(?, is_admin) WHERE id = ?`,
      [username, email, password, is_admin, id]
    );

    return result.affectedRows;
  }

  async deleteUser(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = UserRepository;
