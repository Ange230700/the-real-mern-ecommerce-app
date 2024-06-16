const { database, tables, CryptoJS } = require("../config");

describe("PurchaseRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("createPurchase", async () => {
    const user = {
      username: "user4334",
      email: "user4334@user4334.user4334",
      password: "user4334",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertIdUser = await tables.Auth.createUser(user);

    const purchase = {
      user_id: insertIdUser,
      total: 100,
    };

    const insertId = await tables.Purchase.createPurchase(
      insertIdUser,
      purchase
    );

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
    expect(insertId).toBeGreaterThan(0);
  });

  test("readPurchase", async () => {
    const user = {
      username: "user3443",
      email: "user3443@user3443.user3443",
      password: "user3443",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertIdUser = await tables.Auth.createUser(user);

    const purchase = {
      user_id: insertIdUser,
      total: 200,
    };

    const insertId = await tables.Purchase.createPurchase(
      insertIdUser,
      purchase
    );

    const order = await tables.Purchase.readPurchase(insertId, insertIdUser);

    expect(order).toBeTruthy();
    expect(order).toHaveProperty("user_id");
    expect(order).toHaveProperty("total");
  });

  test("updatePurchase", async () => {
    const user = {
      username: "user34343434",
      email: "user34343434@user34343434.user34343434",
      password: "user34343434",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertIdUser = await tables.Auth.createUser(user);

    const purchase = {
      user_id: insertIdUser,
      total: 300,
    };

    const insertId = await tables.Purchase.createPurchase(
      insertIdUser,
      purchase
    );

    const updatedPurchase = { total: 400 };

    const updatedRows = await tables.Purchase.updatePurchase(
      insertId,
      insertIdUser,
      updatedPurchase
    );

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
  });

  test("deletePurchase", async () => {
    const user = {
      username: "user1101",
      email: "user1101@user1101.user1101",
      password: "user1101",
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.APP_SECRET
    ).toString();

    user.password = encryptedPassword;

    const insertIdUser = await tables.Auth.createUser(user);

    const purchase = {
      user_id: insertIdUser,
      total: 500,
    };

    const insertId = await tables.Purchase.createPurchase(
      insertIdUser,
      purchase
    );

    const deletedRows = await tables.Purchase.deletePurchase(
      insertId,
      insertIdUser
    );

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
  });
});
