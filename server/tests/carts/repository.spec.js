const { database, tables } = require("../config");

describe("CartRepository", () => {
  beforeAll(async () => {
    const cart = {
      user_id: 5,
      status: "active",
    };

    await tables.Cart.createCart(5, cart);
  });

  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("readAllCarts", async () => {
    const carts = await tables.Cart.readAllCarts(5);

    expect(carts).toBeTruthy();
    expect(Array.isArray(carts)).toBe(true);
  });

  test("readCart", async () => {
    const cart = await tables.Cart.readCart(3, 5);

    expect(cart).toBeTruthy();
    expect(cart).toHaveProperty("cart_id");
    expect(cart).toHaveProperty("user_id");
    expect(cart).toHaveProperty("status");
    expect(cart).toHaveProperty("username");
    expect(cart.user_id).toBe(2);
    expect(typeof cart.cart_id).toBe("number");
    expect(typeof cart.user_id).toBe("number");
    expect(typeof cart.status).toBe("string");
    expect(typeof cart.username).toBe("string");
  });

  test("updateCart", async () => {
    const updatedRows = await tables.Cart.updateCart(3, 2, {
      status: "inactive",
    });

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
    expect(updatedRows).toBeGreaterThan(0);
  });

  test("createCart", async () => {
    const cart = {
      user_id: 1,
      status: "active",
    };

    const insertId = await tables.Cart.createCart(2, cart);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
    expect(insertId).toBeGreaterThan(0);
  });

  test("deleteCart", async () => {
    const deletedRows = await tables.Cart.deleteCart(3, 2);

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
    expect(deletedRows).toBeGreaterThan(0);
  });
});
