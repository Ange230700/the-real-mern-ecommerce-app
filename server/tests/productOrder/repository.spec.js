const { database, tables } = require("../config");

describe("ProductOrderRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("createProductOrder", async () => {
    // const category = { name: "Test Category", image: "test.png" };
    const product = {
      title: "Test Product",
      price: 10.99,
      image_url: "test_product.png",
      product_adjective: "Test",
      product_material: "Test Material",
      product_description: "Test Description",
    };

    // const categoryId = await tables.Category.createCategory(category);
    const productId = await tables.Product.createProduct(product);
    const order = { user_id: 1, total: 100 }; // Assuming there's a user with ID 1

    const orderId = await tables.Purchase.createPurchase(1, order);

    const productOrderDuo = { product_id: productId, order_id: orderId };
    const insertId =
      await tables.Product_order.createProductOrder(productOrderDuo);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
  });

  test("readProductOrder", async () => {
    // const category = { name: "Read Category", image: "read.png" };
    const product = {
      title: "Read Product",
      price: 15.99,
      image_url: "read_product.png",
      product_adjective: "Read",
      product_material: "Read Material",
      product_description: "Read Description",
    };

    // const categoryId = await tables.Category.createCategory(category);
    const productId = await tables.Product.createProduct(product);
    const order = { user_id: 1, total: 100 }; // Assuming there's a user with ID 1

    const orderId = await tables.Purchase.createPurchase(1, order);

    const productOrderDuo = { product_id: productId, order_id: orderId };
    await tables.Product_order.createProductOrder(productOrderDuo);

    const readProductOrder = await tables.Product_order.readProductOrder(
      productId,
      orderId
    );

    expect(readProductOrder).toBeTruthy();
    expect(readProductOrder).toHaveProperty("product_id");
    expect(readProductOrder).toHaveProperty("order_id");
    expect(readProductOrder.product_id).toBe(productId);
    expect(readProductOrder.order_id).toBe(orderId);
  });

  test("deleteProductOrder", async () => {
    // const category = { name: "Delete Category", image: "delete.png" };
    const product = {
      title: "Delete Product",
      price: 20.99,
      image_url: "delete_product.png",
      product_adjective: "Delete",
      product_material: "Delete Material",
      product_description: "Delete Description",
    };

    // const categoryId = await tables.Category.createCategory(category);
    const productId = await tables.Product.createProduct(product);
    const order = { user_id: 1, total: 100 }; // Assuming there's a user with ID 1

    const orderId = await tables.Purchase.createPurchase(1, order);

    const productOrderDuo = { product_id: productId, order_id: orderId };
    await tables.Product_order.createProductOrder(productOrderDuo);

    const deletedRows = await tables.Product_order.deleteProductOrder(
      productId,
      orderId
    );

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
  });
});
