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

  test("readUser", async () => {
    const user = await tables.User.readUser(1);

    expect(user).toBeTruthy();
    expect(user).toHaveProperty("userId");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("is_admin");
    expect(user.userId).toBe(1);
    expect(typeof user.userId).toBe("number");
    expect(typeof user.username).toBe("string");
    expect(typeof user.is_admin).toBe("number");
  });

  test("updateUser", async () => {
    const updatedRows = await tables.User.updateUser(4, {
      username: "test_user2_updated",
      email: "test.user2_updated@example.com",
      password: "password2_updated",
    });

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
  });

  test("deleteUser", async () => {
    const deletedRows = await tables.User.deleteUser(4);

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
  });
});
