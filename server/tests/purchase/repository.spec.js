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

    const id_for_created_user = await tables.Auth.createUser(user);

    const purchase = {
      user_id: id_for_created_user,
      total: 100.0,
    };

    const id_for_created_order = await tables.Purchase.createPurchase(
      id_for_created_user,
      purchase
    );

    expect(id_for_created_order).toBeTruthy();
    expect(typeof id_for_created_order).toBe("number");
    expect(id_for_created_order).toBeGreaterThan(0);

    const total = Number(purchase.total);
    expect(typeof total).toBe("number");
    expect(total).toBe(purchase.total);
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

    const id_for_created_user = await tables.Auth.createUser(user);

    const purchase = {
      user_id: id_for_created_user,
      total: 200.0,
    };

    const id_for_created_order = await tables.Purchase.createPurchase(
      id_for_created_user,
      purchase
    );

    const order = await tables.Purchase.readPurchase(
      id_for_created_order,
      id_for_created_user
    );

    expect(order).toBeTruthy();
    expect(order).toHaveProperty("user_id");
    expect(order).toHaveProperty("total");
    expect(order.user_id).toBe(id_for_created_user);

    const total = Number(order.total);
    expect(typeof total).toBe("number");
    expect(total).toBe(purchase.total);
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

    const id_for_created_user = await tables.Auth.createUser(user);

    const purchase = {
      user_id: id_for_created_user,
      total: 300.0,
    };

    const id_for_created_purchase = await tables.Purchase.createPurchase(
      id_for_created_user,
      purchase
    );

    const updatedPurchase = { total: 400.0 };

    const updatedRows = await tables.Purchase.updatePurchase(
      id_for_created_purchase,
      id_for_created_user,
      updatedPurchase
    );

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");

    const total = Number(updatedPurchase.total);
    expect(typeof total).toBe("number");
    expect(total).toBe(updatedPurchase.total);
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

    const id_for_created_user = await tables.Auth.createUser(user);

    const purchase = {
      user_id: id_for_created_user,
      total: 500.0,
    };

    const insertId = await tables.Purchase.createPurchase(
      id_for_created_user,
      purchase
    );

    const deletedRows = await tables.Purchase.deletePurchase(
      insertId,
      id_for_created_user
    );

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");

    const total = Number(purchase.total);
    expect(typeof total).toBe("number");
    expect(total).toBe(purchase.total);
  });
});
