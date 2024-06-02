const AbstractRepository = require("./AbstractRepository");

class AuthRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "auth" as configuration
    super({ table: "user" });
  }

  // Create
  async create({ username, email, password }) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // Find by email
  async findByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }
}

module.exports = AuthRepository;
