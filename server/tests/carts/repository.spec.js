const { database, tables, CryptoJS } = require("../config");

describe("CartRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("createCart", async () => {
    const user = {
      username: "user88",
      email: "user88@user88.user88",
      password: "user88",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertIdUser = await tables.Auth.createUser(user);

    const cart = {
      user_id: insertIdUser,
      status: "some_status",
    };

    const insertId = await tables.Cart.createCart(insertIdUser, cart);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
    expect(insertId).toBeGreaterThan(0);
  });

  test("readAllCarts", async () => {
    const user = {
      username: "user89",
      email: "user89@user89.user89",
      password: "user89",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertIdUser = await tables.Auth.createUser(user);

    const carts = await tables.Cart.readAllCarts(insertIdUser);

    expect(carts).toBeTruthy();
    expect(Array.isArray(carts)).toBe(true);
  });

  test("readCart", async () => {
    const user = {
      username: "user555",
      email: "user555@user555.user555",
      password: "user555",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertIdUser = await tables.Auth.createUser(user);

    const cartToCreate = {
      user_id: insertIdUser,
      status: "some_status",
    };

    const insertIdCart = await tables.Cart.createCart(
      insertIdUser,
      cartToCreate
    );

    const cart = await tables.Cart.readCart(insertIdCart, insertIdUser);

    expect(cart).toBeTruthy();
    expect(cart).toHaveProperty("cart_id");
    expect(cart).toHaveProperty("user_id");
    expect(cart).toHaveProperty("status");
    expect(cart).toHaveProperty("username");
    expect(cart.user_id).toBe(insertIdUser);
    expect(typeof cart.cart_id).toBe("number");
    expect(typeof cart.user_id).toBe("number");
    expect(typeof cart.status).toBe("string");
    expect(typeof cart.username).toBe("string");
  });

  test("updateCart", async () => {
    const user = {
      username: "user556",
      email: "user556@user556.user556",
      password: "user556",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertIdUser = await tables.Auth.createUser(user);

    const cartToCreate = {
      user_id: insertIdUser,
      status: "test_status",
    };

    const insertIdCart = await tables.Cart.createCart(
      insertIdUser,
      cartToCreate
    );

    const updatedRows = await tables.Cart.updateCart(
      insertIdCart,
      insertIdUser,
      { status: "updated_status" }
    );

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
    expect(updatedRows).toBeGreaterThan(0);
  });

  test("deleteCart", async () => {
    const user = {
      username: "user557",
      email: "user557@user557.user557",
      password: "user557",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertIdUser = await tables.Auth.createUser(user);

    const cartToCreate = {
      user_id: insertIdUser,
      status: "test_status",
    };

    const insertIdCart = await tables.Cart.createCart(
      insertIdUser,
      cartToCreate
    );

    const deletedRows = await tables.Cart.deleteCart(
      insertIdCart,
      insertIdUser
    );

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
    expect(deletedRows).toBeGreaterThan(0);
  });
});
