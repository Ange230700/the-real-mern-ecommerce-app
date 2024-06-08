const { app, request, database, jwt } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Purchase API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("GET /api/purchases/user/:user_id", () => {
    it("should fetch all purchases for a user", async () => {
      const rows = [{ id: 1, user_id: 1, total: 100 }];
      jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .get("/api/purchases/user/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/purchases/order/:order_id/user/:user_id", () => {
    it("should fetch a single purchase by IDs", async () => {
      const purchase = { id: 1, user_id: 1, total: 100 };
      jest.spyOn(database, "query").mockResolvedValueOnce([[purchase]]);

      const user = { userId: 1, is_admin: true };
      const token = generateToken(user);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .get("/api/purchases/order/1/user/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(purchase);
    });

    it("should return 404 if purchase not found", async () => {
      jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

      const user = { userId: 1, is_admin: true };
      const token = generateToken(user);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .get("/api/purchases/order/0/user/0")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("Purchase not found");
    });
  });

  describe("POST /api/purchases/order/user/:user_id", () => {
    it("should create a new purchase", async () => {
      const purchase = { user_id: 1, total: 100 };
      const result = { insertId: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const user = { userId: 1 };
      const token = generateToken(user);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .post("/api/purchases/order/user/1")
        .send(purchase)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Purchase added");
    });
  });

  describe("PUT /api/purchases/order/:order_id/user/:user_id", () => {
    it("should update an existing purchase", async () => {
      const purchase = { user_id: 1, total: 150 };
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .put("/api/purchases/order/1/user/1")
        .send(purchase)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Purchase updated");
    });
  });

  describe("DELETE /api/purchases/order/:order_id/user/:user_id", () => {
    it("should delete a purchase", async () => {
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .delete("/api/purchases/order/1/user/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Purchase deleted");
    });
  });
});
