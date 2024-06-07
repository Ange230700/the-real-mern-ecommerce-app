const { database, tables } = require("../config");

describe("AuthRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("createUser => insert into", async () => {
    const user = {
      username: "testuser",
      email: "testuser@example.com",
      password: "encryptedpassword",
    };
    const result = [{ insertId: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const insertId = await tables.Auth.createUser(user);

    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO User (username, email, password) VALUES (?, ?, ?)",
      [user.username, user.email, user.password]
    );
    expect(insertId).toBe(result[0].insertId);
  });

  test("findUserByEmail => select with email", async () => {
    const user = {
      userId: 1,
      username: "testuser",
      email: "testuser@example.com",
      password: "encryptedpassword",
    };

    jest.spyOn(database, "query").mockResolvedValueOnce([[user]]);

    const foundUser = await tables.Auth.findUserByEmail("testuser@example.com");

    expect(database.query).toHaveBeenCalledWith(
      "SELECT id AS userId, username, email, password, is_admin FROM User WHERE email = ?",
      ["testuser@example.com"]
    );
    expect(foundUser).toEqual(user);
  });
});
