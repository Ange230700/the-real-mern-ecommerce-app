const { database, tables } = require("../config");

describe("AuthRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("createUser", async () => {
    const user = {
      username: "test_user13",
      email: "test.user13@example.com",
      password: "password13",
    };

    const insertId = await tables.Auth.createUser(user);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
  });

  test("findUserByEmail", async () => {
    const user = {
      username: "test_user14",
      email: "test.user14@example.com",
      password: "password14",
    };

    const insertId = await tables.Auth.createUser(user);

    const foundUser = await tables.Auth.findUserByEmail(user.email);

    expect(foundUser).toBeTruthy();

    expect(foundUser).toHaveProperty("userId");
    expect(foundUser).toHaveProperty("username");
    expect(foundUser).toHaveProperty("email");
    expect(foundUser).toHaveProperty("password");
    expect(foundUser).toHaveProperty("is_admin");

    expect(foundUser.userId).toBe(insertId);
    expect(foundUser.username).toBe(user.username);
    expect(foundUser.email).toBe(user.email);
    expect(foundUser.password).toBe(user.password);
    expect(foundUser.is_admin).toBe(0);

    expect(typeof foundUser.userId).toBe("number");
    expect(typeof foundUser.username).toBe("string");
    expect(typeof foundUser.email).toBe("string");
    expect(typeof foundUser.password).toBe("string");
    expect(typeof foundUser.is_admin).toBe("number");
  });
});
