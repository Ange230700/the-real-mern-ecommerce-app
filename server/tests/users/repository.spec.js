const { database, tables, CryptoJS } = require("../config");

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
    const userToCreate = {
      username: "user909",
      email: "user909@user909.user909",
      password: "user909",
      is_admin: 0,
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      userToCreate.password,
      process.env.APP_SECRET
    ).toString();

    userToCreate.password = encryptedPassword;

    const insertId = await tables.Auth.createUser(userToCreate);

    const user = await tables.User.readUser(insertId);

    expect(user).toBeTruthy();
    expect(user).toHaveProperty("userId");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("is_admin");
    expect(user.userId).toBe(insertId);
    expect(typeof user.userId).toBe("number");
    expect(typeof user.username).toBe("string");
    expect(typeof user.is_admin).toBe("number");
  });

  test("updateUser", async () => {
    const userToCreate = {
      username: "user989",
      email: "user989@user989.user989",
      password: "user989",
      is_admin: 0,
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      userToCreate.password,
      process.env.APP_SECRET
    ).toString();

    userToCreate.password = encryptedPassword;

    const insertId = await tables.Auth.createUser(userToCreate);

    const updatedRows = await tables.User.updateUser(insertId, {
      username: "user123",
      email: "user123@user123.user123",
      password: "user123",
    });

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
  });

  test("deleteUser", async () => {
    const userToCreate = {
      username: "user7776",
      email: "user7776@user7776.user7776",
      password: "user7776",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      userToCreate.password,
      process.env.APP_SECRET
    ).toString();

    userToCreate.password = encryptedPassword;

    const insertId = await tables.Auth.createUser(userToCreate);

    const deletedRows = await tables.User.deleteUser(insertId);

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
  });
});
