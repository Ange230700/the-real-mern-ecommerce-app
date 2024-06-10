const AbstractRepository = require("./AbstractRepository");

class AuthRepository extends AbstractRepository {
  constructor() {
    super({ table: "User" });
  }

  async createUser({ username, email, password }) {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );

    return result.insertId;
  }

  async findUserByEmail(email) {
    const [users] = await this.database.query(
      `SELECT id AS userId, username, email, password, is_admin FROM ${this.table} WHERE email = ?`,
      [email]
    );

    return users[0];
  }
}

module.exports = AuthRepository;
