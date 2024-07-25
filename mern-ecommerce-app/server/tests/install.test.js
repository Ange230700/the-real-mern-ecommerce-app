const fs = require("node:fs");
const path = require("node:path");

const { database } = require("./config");

describe("Installation", () => {
  test("You have created /server/.env", async () => {
    expect(fs.existsSync(path.join(__dirname, "..", ".env"))).toBe(true);
  });

  test("You have retained /server/.env.sample", async () => {
    expect(fs.existsSync(path.join(__dirname, "..", ".env.sample"))).toBe(true);
  });

  test("You have filled /server/.env with valid information to connect to your database", async () => {
    const [rows] = await database.query(`SELECT 1`);

    expect(rows.length).toBeGreaterThan(0);
  });

  test("You have executed the db:migrate and db:seed scripts", async () => {
    const [rows] = await database.query(`SELECT * FROM Product`);

    expect(rows.length).toBeGreaterThan(0);
  });
});
