const { database, tables } = require("../config");

describe("PopularProductRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("createPopularProduct => insert into", async () => {
    const product = { title: "Product1", price: 100, image: "image_url" };
    const result = [{ insertId: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const insertId = await tables.Popular_product.createPopularProduct(product);

    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO Popular_product (title, price, image) VALUES (?, ?, ?)",
      [product.title, product.price, product.image]
    );
    expect(insertId).toBe(result[0].insertId);
  });

  test("readPopularProduct => select with id", async () => {
    const product = {
      id: 1,
      title: "Product1",
      price: 100,
      image: "image_url",
    };

    jest.spyOn(database, "query").mockResolvedValueOnce([[product]]);

    const foundProduct = await tables.Popular_product.readPopularProduct(1);

    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM Popular_product WHERE id = ?",
      [1]
    );
    expect(foundProduct).toEqual(product);
  });

  test("updatePopularProduct => update with id", async () => {
    const product = {
      title: "Updated Product1",
      price: 150,
      image: "new_image_url",
    };
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Popular_product.updatePopularProduct(
      1,
      product
    );

    expect(database.query).toHaveBeenCalledWith(
      "UPDATE Popular_product SET title = COALESCE(?, title), price = COALESCE(?, price), image = COALESCE(?, image) WHERE id = ?",
      [product.title, product.price, product.image, 1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });

  test("deletePopularProduct => delete with id", async () => {
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Popular_product.deletePopularProduct(1);

    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM Popular_product WHERE id = ?",
      [1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });
});
