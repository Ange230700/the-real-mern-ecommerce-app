const { database, tables } = require("../config");

describe("CartRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("readAllCarts => select", async () => {
    const rows = [
      { cart_id: 1, user_id: 1, status: "active", username: "john_doe" },
    ];

    jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

    const carts = await tables.Cart.readAllCarts(1);

    expect(database.query).toHaveBeenCalledWith(
      "SELECT Cart.id AS cart_id, Cart.user_id, Cart.status, User.username FROM Cart JOIN User ON Cart.user_id = User.id WHERE Cart.user_id = ? AND Cart.user_id = User.id",
      [1]
    );
    expect(carts).toEqual(rows);
  });

  test("readCart => select with id", async () => {
    const cart = {
      cart_id: 1,
      user_id: 1,
      status: "active",
      username: "john_doe",
    };

    jest.spyOn(database, "query").mockResolvedValueOnce([[cart]]);

    const result = await tables.Cart.readCart(1, 1);

    expect(database.query).toHaveBeenCalledWith(
      "SELECT Cart.id AS cart_id, Cart.user_id, Cart.status, User.username FROM Cart JOIN User ON Cart.user_id = User.id WHERE Cart.user_id = ? AND Cart.user_id = User.id AND Cart.id = ?",
      [1, 1]
    );
    expect(result).toEqual(cart);
  });

  test("createCart => insert into", async () => {
    const cart = {
      user_id: 1,
      status: "active",
    };
    const result = [{ insertId: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const insertId = await tables.Cart.createCart(1, cart);

    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO Cart (user_id, status) VALUES (?, ?)",
      [cart.user_id, cart.status]
    );
    expect(insertId).toBe(result[0].insertId);
  });

  test("updateCart => update with id", async () => {
    const cart = { status: "inactive" };
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Cart.updateCart(1, 1, cart);

    expect(database.query).toHaveBeenCalledWith(
      "UPDATE Cart SET status = COALESCE(?, status) WHERE id = ? AND user_id = ?",
      [cart.status, 1, 1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });

  test("deleteCart => delete with id", async () => {
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Cart.deleteCart(1, 1);

    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM Cart WHERE id = ? AND user_id = ?",
      [1, 1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });
});
