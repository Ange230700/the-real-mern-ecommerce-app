const { database, tables } = require("../config");

describe("PurchaseRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("createPurchase", async () => {
    const user = { user_id: 1, total: 100 };

    const insertId = await tables.Purchase.createPurchase(user.user_id, user);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
  });

  test("readPurchase", async () => {
    const user = { user_id: 1, total: 200 };

    const insertId = await tables.Purchase.createPurchase(user.user_id, user);
    const readPurchase = await tables.Purchase.readPurchase(
      insertId,
      user.user_id
    );

    expect(readPurchase).toBeTruthy();
    expect(readPurchase).toHaveProperty("user_id");
    expect(readPurchase).toHaveProperty("total");
    expect(readPurchase.user_id).toBe(user.user_id);
    expect(readPurchase.total).toBe(user.total);
  });

  test("updatePurchase", async () => {
    const user = { user_id: 1, total: 300 };

    const insertId = await tables.Purchase.createPurchase(user.user_id, user);

    const updatedPurchase = { user_id: 1, total: 400 };
    const updatedRows = await tables.Purchase.updatePurchase(
      insertId,
      user.user_id,
      updatedPurchase
    );

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
  });

  test("deletePurchase", async () => {
    const user = { user_id: 1, total: 500 };

    const insertId = await tables.Purchase.createPurchase(user.user_id, user);
    const deletedRows = await tables.Purchase.deletePurchase(
      insertId,
      user.user_id
    );

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
  });
});
