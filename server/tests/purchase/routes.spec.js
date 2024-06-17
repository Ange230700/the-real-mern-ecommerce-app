const { app, request, database, tables } = require("../config");

describe("Purchase API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/purchases/user/:user_id", () => {
    it("should fetch all purchases for a user", async () => {
      const adminToRegister = {
        username: "admin777",
        email: "admin777@admin777.admin777",
        password: "admin777",
        is_admin: true,
      };

      const adminRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminToRegister);

      expect(adminRegistrationResponse.status).toBe(201);
      expect(adminRegistrationResponse.body).toHaveProperty("insertId");

      const adminCredentials = {
        email: "admin777@admin777.admin777",
        password: "admin777",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const response = await request(app)
        .get(`/api/purchases/user/${adminRegistrationResponse.body.insertId}`)
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/purchases/order/:order_id/user/:user_id", () => {
    it("should fetch a single purchase by IDs", async () => {
      const adminToRegister = {
        username: "admin888",
        email: "admin888@admin888.admin888",
        password: "admin888",
        is_admin: true,
      };

      const adminRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminToRegister);

      expect(adminRegistrationResponse.status).toBe(201);
      expect(adminRegistrationResponse.body).toHaveProperty("insertId");

      const adminCredentials = {
        email: "admin888@admin888.admin888",
        password: "admin888",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const order = {
        user_id: adminRegistrationResponse.body.insertId,
        total: 100.0,
      };

      const orderId = await tables.Purchase.createPurchase(
        adminRegistrationResponse.body.insertId,
        order
      );

      const response = await request(app)
        .get(
          `/api/purchases/order/${orderId}/user/${adminRegistrationResponse.body.insertId}`
        )
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("user_id");
      expect(response.body).toHaveProperty("total");
    });

    it("should return 404 if purchase not found", async () => {
      const adminToRegister = {
        username: "admin999",
        email: "admin999@admin999.admin999",
        password: "admin999",
        is_admin: true,
      };

      const adminRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminToRegister);

      expect(adminRegistrationResponse.status).toBe(201);
      expect(adminRegistrationResponse.body).toHaveProperty("insertId");

      const adminCredentials = {
        email: "admin999@admin999.admin999",
        password: "admin999",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const response = await request(app)
        .get(
          `/api/purchases/order/9999/user/${adminRegistrationResponse.body.insertId}`
        )
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Purchase not found");
    });
  });

  describe("POST /api/purchases/order/user/:user_id", () => {
    it("should create a new purchase", async () => {
      const adminToRegister = {
        username: "admin225",
        email: "admin225@admin225.admin225",
        password: "admin225",
        is_admin: true,
      };

      const adminRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminToRegister);

      expect(adminRegistrationResponse.status).toBe(201);
      expect(adminRegistrationResponse.body).toHaveProperty("insertId");

      const adminCredentials = {
        email: "admin225@admin225.admin225",
        password: "admin225",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const purchase = {
        user_id: adminRegistrationResponse.body.insertId,
        total: 200.0,
      };

      const response = await request(app)
        .post(
          `/api/purchases/order/user/${adminRegistrationResponse.body.insertId}`
        )
        .set("Cookie", `token=${adminToken}`)
        .send(purchase);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("insertId");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Purchase added");
    });
  });

  describe("PUT /api/purchases/order/:order_id/user/:user_id", () => {
    it("should update an existing purchase", async () => {
      const adminToRegister = {
        username: "admin336",
        email: "admin336@admin336.admin336",
        password: "admin336",
        is_admin: true,
      };

      const adminRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminToRegister);

      expect(adminRegistrationResponse.status).toBe(201);
      expect(adminRegistrationResponse.body).toHaveProperty("insertId");

      const adminCredentials = {
        email: "admin336@admin336.admin336",
        password: "admin336",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const purchase = {
        user_id: adminRegistrationResponse.body.insertId,
        total: 300.0,
      };

      const orderId = await tables.Purchase.createPurchase(
        adminRegistrationResponse.body.insertId,
        purchase
      );

      const updatedPurchase = { total: 400.0 };

      const response = await request(app)
        .put(
          `/api/purchases/order/${orderId}/user/${adminRegistrationResponse.body.insertId}`
        )
        .set("Cookie", `token=${adminToken}`)
        .send(updatedPurchase);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Purchase updated");
    });
  });

  describe("DELETE /api/purchases/order/:order_id/user/:user_id", () => {
    it("should delete a purchase", async () => {
      const adminToRegister = {
        username: "admin447",
        email: "admin447@admin447.admin447",
        password: "admin447",
        is_admin: true,
      };

      const adminRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminToRegister);

      expect(adminRegistrationResponse.status).toBe(201);
      expect(adminRegistrationResponse.body).toHaveProperty("insertId");

      const adminCredentials = {
        email: "admin447@admin447.admin447",
        password: "admin447",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const purchase = {
        user_id: adminRegistrationResponse.body.insertId,
        total: 500.0,
      };
      const orderId = await tables.Purchase.createPurchase(
        adminRegistrationResponse.body.insertId,
        purchase
      );

      const response = await request(app)
        .delete(
          `/api/purchases/order/${orderId}/user/${adminRegistrationResponse.body.insertId}`
        )
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Purchase deleted");
    });
  });
});
