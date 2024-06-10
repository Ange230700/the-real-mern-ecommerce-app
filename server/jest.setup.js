require("dotenv").config({ path: "./server/.env" });

console.info("Environment Variables Loaded in Jest Setup:");
console.info("DB_HOST:", process.env.DB_HOST);
console.info("DB_PORT:", process.env.DB_PORT);
console.info("DB_USER:", process.env.DB_USER);
console.info("DB_PASSWORD:", process.env.DB_PASSWORD);
console.info("DB_NAME:", process.env.DB_NAME);
