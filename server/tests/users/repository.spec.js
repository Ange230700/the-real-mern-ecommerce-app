const { database, tables } = require("../config");

describe("UserRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("readAllUsers", async () => {
    const users = await tables.User.readAllUsers();

    expect(users).toBeTruthy();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });
});
