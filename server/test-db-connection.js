require("dotenv").config({ path: "./server/.env" });
const mysql = require("mysql2/promise");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

console.info("Testing Database Connection with Environment Variables:");
console.info("DB_HOST:", DB_HOST);
console.info("DB_PORT:", DB_PORT);
console.info("DB_USER:", DB_USER);
console.info("DB_PASSWORD:", DB_PASSWORD);
console.info("DB_NAME:", DB_NAME);

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
    console.info("Database connection successful!");
    await connection.end();
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();
