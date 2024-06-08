const { database, tables } = require("../config");

describe("ProductCategoryRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("createProductCategory => insert into", async () => {
    const productCategory = { product_id: 1, category_id: 1 };
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows =
      await tables.Product_category.createProductCategory(productCategory);

    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO Product_category (product_id, category_id) VALUES (?, ?)",
      [productCategory.product_id, productCategory.category_id]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });

  test("readProductCategory => select with ids", async () => {
    const productCategory = { product_id: 1, category_id: 1 };

    jest.spyOn(database, "query").mockResolvedValueOnce([[productCategory]]);

    const foundProductCategory =
      await tables.Product_category.readProductCategory(1, 1);

    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM Product_category WHERE product_id = ? AND category_id = ?",
      [1, 1]
    );
    expect(foundProductCategory).toEqual(productCategory);
  });

  test("deleteProductCategory => delete with ids", async () => {
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Product_category.deleteProductCategory(
      1,
      1
    );

    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM Product_category WHERE product_id = ? AND category_id = ?",
      [1, 1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });
});
