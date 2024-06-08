const { database, tables } = require("../config");

describe("PurchaseRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("createPurchase => insert into", async () => {
    const purchase = { user_id: 1, total: 100 };
    const result = [{ insertId: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const insertId = await tables.Purchase.createPurchase(1, purchase);

    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO Purchase (user_id, total) VALUES (?, ?)",
      [purchase.user_id, purchase.total]
    );
    expect(insertId).toBe(result[0].insertId);
  });

  test("readPurchase => select with ids", async () => {
    const purchase = { id: 1, user_id: 1, total: 100 };

    jest.spyOn(database, "query").mockResolvedValueOnce([[purchase]]);

    const foundPurchase = await tables.Purchase.readPurchase(1, 1);

    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM Purchase WHERE id = ? AND user_id = ?",
      [1, 1]
    );
    expect(foundPurchase).toEqual(purchase);
  });

  test("updatePurchase => update with ids", async () => {
    const purchase = { user_id: 1, total: 150 };
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Purchase.updatePurchase(1, 1, purchase);

    expect(database.query).toHaveBeenCalledWith(
      "UPDATE Purchase SET total = COALESCE(?, total) WHERE id = ? AND user_id = ?",
      [purchase.total, 1, 1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });

  test("deletePurchase => delete with ids", async () => {
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Purchase.deletePurchase(1, 1);

    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM Purchase WHERE id = ? AND user_id = ?",
      [1, 1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });
});
