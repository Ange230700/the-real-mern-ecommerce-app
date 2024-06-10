const mysql = require("mysql2/promise");
require("dotenv").config({ path: "./server/.env" });

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// console.info("Environment Variables Loaded in Database Client:");
// console.info("DB_HOST:", DB_HOST);
// console.info("DB_PORT:", DB_PORT);
// console.info("DB_USER:", DB_USER);
// console.info("DB_PASSWORD:", DB_PASSWORD);
// console.info("DB_NAME:", DB_NAME);

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

module.exports = client;
