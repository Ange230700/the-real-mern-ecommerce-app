const { database, tables, CryptoJS } = require("../config");

describe("AuthRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("createUser", async () => {
    const user = {
      username: "user0000",
      email: "user0000@user0000.user0000",
      password: "user0000",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertId = await tables.Auth.createUser(user);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
  });

  test("findUserByEmail", async () => {
    const foundUser = await tables.Auth.findUserByEmail(
      "user0000@user0000.user0000"
    );

    expect(foundUser).toBeTruthy();

    expect(foundUser).toHaveProperty("userId");
    expect(foundUser).toHaveProperty("username");
    expect(foundUser).toHaveProperty("email");
    expect(foundUser).toHaveProperty("password");
    expect(foundUser).toHaveProperty("is_admin");
    expect(foundUser.is_admin).toBe(0);
    expect(typeof foundUser.userId).toBe("number");
    expect(typeof foundUser.username).toBe("string");
    expect(typeof foundUser.email).toBe("string");
    expect(typeof foundUser.password).toBe("string");
    expect(typeof foundUser.is_admin).toBe("number");
  });
});
