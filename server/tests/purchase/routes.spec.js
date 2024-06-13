const { app, request, database, tables } = require("../config");
const generateToken = require("../utils/generateToken");

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
      const userToken = generateToken({ userId: 1, is_admin: true });

      const response = await request(app)
        .get("/api/purchases/user/1")
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/purchases/order/:order_id/user/:user_id", () => {
    it("should fetch a single purchase by IDs", async () => {
      const order = { user_id: 1, total: 100.0 };
      const orderId = await tables.Purchase.createPurchase(1, order);

      const userToken = generateToken({ userId: 1, is_admin: true });

      const response = await request(app)
        .get(`/api/purchases/order/${orderId}/user/1`)
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("user_id");
      expect(response.body).toHaveProperty("total");
    });

    it("should return 404 if purchase not found", async () => {
      const userToken = generateToken({ userId: 1, is_admin: true });

      const response = await request(app)
        .get("/api/purchases/order/9999/user/1")
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Purchase not found");
    });
  });

  describe("POST /api/purchases/order/user/:user_id", () => {
    it("should create a new purchase", async () => {
      const userToken = generateToken({ userId: 1, is_admin: true });

      const purchase = { user_id: 1, total: 200.0 };
      const response = await request(app)
        .post("/api/purchases/order/user/1")
        .set("Cookie", `token=${userToken}`)
        .send(purchase);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("insertId");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Purchase added");
    });
  });

  describe("PUT /api/purchases/order/:order_id/user/:user_id", () => {
    it("should update an existing purchase", async () => {
      const userToken = generateToken({ userId: 1, is_admin: true });

      const purchase = { user_id: 1, total: 300.0 };
      const orderId = await tables.Purchase.createPurchase(1, purchase);

      const updatedPurchase = { user_id: 1, total: 400.0 };
      const response = await request(app)
        .put(`/api/purchases/order/${orderId}/user/1`)
        .set("Cookie", `token=${userToken}`)
        .send(updatedPurchase);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Purchase updated");
    });
  });

  describe("DELETE /api/purchases/order/:order_id/user/:user_id", () => {
    it("should delete a purchase", async () => {
      const userToken = generateToken({ userId: 1, is_admin: true });

      const purchase = { user_id: 1, total: 500.0 };
      const orderId = await tables.Purchase.createPurchase(1, purchase);

      const response = await request(app)
        .delete(`/api/purchases/order/${orderId}/user/1`)
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Purchase deleted");
    });
  });
});
