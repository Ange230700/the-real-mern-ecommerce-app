const { database, tables } = require("../config");

describe("ProductOrderRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("createProductOrder => insert into", async () => {
    const productOrder = { product_id: 1, order_id: 1 };
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows =
      await tables.Product_order.createProductOrder(productOrder);

    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO Product_order (product_id, order_id) VALUES (?, ?)",
      [productOrder.product_id, productOrder.order_id]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });

  test("readProductOrder => select with ids", async () => {
    const productOrder = { product_id: 1, order_id: 1 };

    jest.spyOn(database, "query").mockResolvedValueOnce([[productOrder]]);

    const foundProductOrder = await tables.Product_order.readProductOrder(1, 1);

    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM Product_order WHERE product_id = ? AND order_id = ?",
      [1, 1]
    );
    expect(foundProductOrder).toEqual(productOrder);
  });

  test("deleteProductOrder => delete with ids", async () => {
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Product_order.deleteProductOrder(1, 1);

    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM Product_order WHERE product_id = ? AND order_id = ?",
      [1, 1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });
});
