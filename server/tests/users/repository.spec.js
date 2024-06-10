const { database, tables } = require("../config");

describe("UserRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("readAllUsers", async () => {
    const users = await tables.User.readAllUsers();

    expect(users).toBeTruthy();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  // test("readUser => select with id", async () => {
  //   const user = { userId: 1, username: "john_doe", is_admin: false };
  //   jest.spyOn(database, "query").mockResolvedValueOnce([[user]]);
  //   const foundUser = await tables.User.readUser(1);
  //   expect(database.query).toHaveBeenCalledWith(
  //     "SELECT id AS userId, username, is_admin FROM User WHERE id = ?",
  //     [1]
  //   );
  //   expect(foundUser).toEqual(user);
  // });

  // test("updateUser => update with id", async () => {
  //   const user = { username: "john_doe_updated" };
  //   const result = [{ affectedRows: 1 }];
  //   jest.spyOn(database, "query").mockResolvedValueOnce([result]);
  //   const affectedRows = await tables.User.updateUser(1, user);
  //   expect(database.query).toHaveBeenCalledWith(
  //     "UPDATE User SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password), is_admin = COALESCE(?, is_admin) WHERE id = ?",
  //     [user.username, user.email, user.password, user.is_admin, 1]
  //   );
  //   expect(affectedRows).toBe(result[0].affectedRows);
  // });

  // test("deleteUser => delete with id", async () => {
  //   const result = [{ affectedRows: 1 }];
  //   jest.spyOn(database, "query").mockResolvedValueOnce([result]);
  //   const affectedRows = await tables.User.deleteUser(1);
  //   expect(database.query).toHaveBeenCalledWith(
  //     "DELETE FROM User WHERE id = ?",
  //     [1]
  //   );
  //   expect(affectedRows).toBe(result[0].affectedRows);
  // });
});
