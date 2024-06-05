const AbstractRepository = require("./AbstractRepository");

class AuthRepository extends AbstractRepository {
  constructor() {
    super({ table: "User" });
  }

  async createUser({ username, email, password }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );

    return result.insertId;
  }

  async findUserByEmail(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    return rows[0];
  }
}

module.exports = AuthRepository;
