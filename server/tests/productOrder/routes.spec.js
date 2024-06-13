const { app, request, database, tables } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Product Order API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/product_order", () => {
    it("should fetch all product orders", async () => {
      const response = await request(app).get("/api/product_order");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/product_order/product/:product_id/order/:order_id", () => {
    it("should fetch a single product order duo by IDs", async () => {
      const product = {
        title: "Test Product",
        price: 10.99,
        image_url: "test_product.png",
        product_adjective: "Test",
        product_material: "Test Material",
        product_description: "Test Description",
      };
      const order = { user_id: 1, total: 100.0 };

      const productId = await tables.Product.createProduct(product);
      const orderId = await tables.Purchase.createPurchase(1, order);

      const productOrderDuo = { product_id: productId, order_id: orderId };
      await tables.Product_order.createProductOrder(productOrderDuo);

      const response = await request(app).get(
        `/api/product_order/product/${productId}/order/${orderId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("product_id");
      expect(response.body).toHaveProperty("order_id");
    });

    it("should return 404 if product order duo not found", async () => {
      const response = await request(app).get(
        "/api/product_order/product/9999/order/9999"
      );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product_order duo not found");
    });
  });

  describe("POST /api/product_order", () => {
    it("should create a new product order duo", async () => {
      const adminToken = generateToken({ is_admin: true });

      const product = {
        title: "New Product",
        price: 19.99,
        image_url: "new_product.png",
        product_adjective: "New",
        product_material: "New Material",
        product_description: "New Description",
      };
      const order = { user_id: 1, total: 200.0 };

      const productId = await tables.Product.createProduct(product);
      const orderId = await tables.Purchase.createPurchase(1, order);

      const productOrderDuo = { product_id: productId, order_id: orderId };
      const response = await request(app)
        .post("/api/product_order")
        .set("Cookie", `token=${adminToken}`)
        .send(productOrderDuo);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("affectedRows");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product_order duo added");
    });
  });

  describe("DELETE /api/product_order/product/:product_id/order/:order_id", () => {
    it("should delete a product order duo", async () => {
      const adminToken = generateToken({ is_admin: true });

      const product = {
        title: "Delete Product",
        price: 9.99,
        image_url: "delete_product.png",
        product_adjective: "Delete",
        product_material: "Delete Material",
        product_description: "Delete Description",
      };
      const order = { user_id: 1, total: 300.0 };

      const productId = await tables.Product.createProduct(product);
      const orderId = await tables.Purchase.createPurchase(1, order);

      const productOrderDuo = { product_id: productId, order_id: orderId };
      await tables.Product_order.createProductOrder(productOrderDuo);

      const response = await request(app)
        .delete(`/api/product_order/product/${productId}/order/${orderId}`)
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product_order duo deleted");
    });
  });
});
