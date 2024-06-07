const { database, tables } = require("../config");

describe("ProductRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("readAllProducts => select", async () => {
    const rows = [{ id: 1, title: "Product 1", price: 100.0 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

    const products = await tables.Product.readAllProducts();

    expect(database.query).toHaveBeenCalledWith("SELECT * FROM Product");
    expect(products).toEqual(rows);
  });

  test("readProduct => select with id", async () => {
    const product = { id: 1, title: "Product 1", price: 100.0 };

    jest.spyOn(database, "query").mockResolvedValueOnce([[product]]);

    const foundProduct = await tables.Product.readProduct(1);

    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM Product WHERE id = ?",
      [1]
    );
    expect(foundProduct).toEqual(product);
  });

  test("createProduct => insert into", async () => {
    const product = {
      title: "Product 1",
      price: 100.0,
      image_url: "http://example.com/image.jpg",
      product_adjective: "Amazing",
      product_material: "Metal",
      product_description: "This is a great product.",
    };
    const result = [{ insertId: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const insertId = await tables.Product.createProduct(product);

    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO Product (title, price, image_url, product_adjective, product_material, product_description) VALUES (?, ?, ?, ?, ?, ?)",
      [
        product.title,
        product.price,
        product.image_url,
        product.product_adjective,
        product.product_material,
        product.product_description,
      ]
    );
    expect(insertId).toBe(result[0].insertId);
  });

  test("updateProduct => update with id", async () => {
    const product = { title: "Updated Product" };
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Product.updateProduct(1, product);

    expect(database.query).toHaveBeenCalledWith(
      "UPDATE Product SET title = COALESCE(?, title), price = COALESCE(?, price), image_url = COALESCE(?, image_url), product_adjective = COALESCE(?, product_adjective), product_material = COALESCE(?, product_material), product_description = COALESCE(?, product_description) WHERE id = ?",
      [
        product.title,
        product.price,
        product.image_url,
        product.product_adjective,
        product.product_material,
        product.product_description,
        1,
      ]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });

  test("deleteProduct => delete with id", async () => {
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Product.deleteProduct(1);

    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM Product WHERE id = ?",
      [1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });
});
