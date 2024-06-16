const { app, request, database, tables } = require("../config");

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
      const userToRegister = {
        username: "user33333",
        email: "user33333@user33333.user33333",
        password: "user33333",
      };

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user33333@user33333.user33333",
        password: "user33333",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .get("/api/product_order")
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveProperty("length");

      response.body.forEach((productOrderDuo) => {
        expect(productOrderDuo).toHaveProperty("product_id");
        expect(productOrderDuo).toHaveProperty("order_id");
      });
    });
  });

  describe("GET /api/product_order/product/:product_id/order/:order_id", () => {
    it("should fetch a single product order duo by IDs", async () => {
      const userToRegister = {
        username: "user44444",
        email: "user44444@user44444.user44444",
        password: "user44444",
      };

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user44444@user44444.user44444",
        password: "user44444",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

      const product = {
        title: "Test Product",
        price: 10.99,
        image_url: "test_product.png",
        product_adjective: "Test",
        product_material: "Test Material",
        product_description: "Test Description",
      };
      const order = {
        user_id: userRegistrationResponse.body.insertId,
        total: 100.0,
      };

      const productId = await tables.Product.createProduct(product);
      const orderId = await tables.Purchase.createPurchase(
        userRegistrationResponse.body.insertId,
        order
      );

      const productOrderDuo = { product_id: productId, order_id: orderId };
      await tables.Product_order.createProductOrder(productOrderDuo);

      const response = await request(app)
        .get(`/api/product_order/product/${productId}/order/${orderId}`)
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("product_id");
      expect(response.body).toHaveProperty("order_id");
    });

    it("should return 404 if product order duo not found", async () => {
      const userToRegister = {
        username: "user123456",
        email: "user123456@user123456.user123456",
        password: "user123456",
      };

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user123456@user123456.user123456",
        password: "user123456",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .get("/api/product_order/product/9999/order/9999")
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product_order duo not found");
    });
  });

  describe("POST /api/product_order", () => {
    it("should create a new product order duo", async () => {
      const userToRegister = {
        username: "user54321",
        email: "user54321@user54321.user54321",
        password: "user54321",
      };

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user54321@user54321.user54321",
        password: "user54321",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

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
        .set("Cookie", `token=${userToken}`)
        .send(productOrderDuo);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("affectedRows");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product_order duo added");
    });
  });

  describe("DELETE /api/product_order/product/:product_id/order/:order_id", () => {
    it("should delete a product order duo", async () => {
      const userToRegister = {
        username: "user091",
        email: "user091@user091.user091",
        password: "user091",
      };

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user091@user091.user091",
        password: "user091",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

      const product = {
        title: "Delete Product",
        price: 9.99,
        image_url: "delete_product.png",
        product_adjective: "Delete",
        product_material: "Delete Material",
        product_description: "Delete Description",
      };
      const order = {
        user_id: userRegistrationResponse.body.insertId,
        total: 300.0,
      };

      const productId = await tables.Product.createProduct(product);
      const orderId = await tables.Purchase.createPurchase(
        userRegistrationResponse.body.insertId,
        order
      );

      const productOrderDuo = { product_id: productId, order_id: orderId };
      await tables.Product_order.createProductOrder(productOrderDuo);

      const response = await request(app)
        .delete(`/api/product_order/product/${productId}/order/${orderId}`)
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product_order duo deleted");
    });
  });
});
