const { database, tables } = require("../config");

describe("ProductRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("createProduct", async () => {
    const product = {
      title: "New Product",
      price: 19.99,
      image_url: "new_product.png",
      product_adjective: "New",
      product_material: "Material",
      product_description: "Description",
    };

    const insertId = await tables.Product.createProduct(product);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
  });

  test("readProduct", async () => {
    const product = {
      title: "Read Product",
      price: 29.99,
      image_url: "read_product.png",
      product_adjective: "Read",
      product_material: "Material",
      product_description: "Description",
    };

    const insertId = await tables.Product.createProduct(product);
    const readProduct = await tables.Product.readProduct(insertId);

    expect(readProduct).toBeTruthy();
    expect(readProduct).toHaveProperty("id");
    expect(readProduct).toHaveProperty("title");
    expect(readProduct).toHaveProperty("price");
    expect(readProduct).toHaveProperty("image_url");
    expect(readProduct).toHaveProperty("product_adjective");
    expect(readProduct).toHaveProperty("product_material");
    expect(readProduct).toHaveProperty("product_description");
    expect(readProduct.id).toBe(insertId);
  });

  test("updateProduct", async () => {
    const product = {
      title: "Update Product",
      price: 39.99,
      image_url: "update_product.png",
      product_adjective: "Update",
      product_material: "Material",
      product_description: "Description",
    };

    const insertId = await tables.Product.createProduct(product);

    const updatedProduct = {
      title: "Updated Product",
      price: 49.99,
      image_url: "updated_product.png",
      product_adjective: "Updated",
      product_material: "Updated Material",
      product_description: "Updated Description",
    };

    const updatedRows = await tables.Product.updateProduct(
      insertId,
      updatedProduct
    );

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
  });

  test("deleteProduct", async () => {
    const product = {
      title: "Delete Product",
      price: 59.99,
      image_url: "delete_product.png",
      product_adjective: "Delete",
      product_material: "Material",
      product_description: "Description",
    };

    const insertId = await tables.Product.createProduct(product);
    const deletedRows = await tables.Product.deleteProduct(insertId);

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
  });
});
