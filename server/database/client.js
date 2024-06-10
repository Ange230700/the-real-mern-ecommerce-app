const mysql = require("mysql2/promise");
require("dotenv").config({ path: "./server/.env" });

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const client = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

client.checkConnection = () => {
  client
    .getConnection()
    .then((connection) => {
      console.info(`Using database ${DB_NAME}`);
      connection.release();
    })
    .catch((error) => {
      console.warn(
        "Warning:",
        "Failed to establish a database connection.",
        "Please check your database credentials in the .env file if you need a database access."
      );
      console.warn(error.message);
    });
};

client.databaseName = DB_NAME;

client.on("connection", (connection) => {
  console.info("Database connection established");
  connection.on("error", (err) => {
    console.error("Database connection error:", err.message);
  });
  connection.on("end", () => {
    console.info("Database connection ended");
  });
});

module.exports = client;
