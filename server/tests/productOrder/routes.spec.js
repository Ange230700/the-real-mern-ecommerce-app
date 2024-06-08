const { app, request, database, jwt } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Product Order API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("GET /api/product_order", () => {
    it("should fetch all product orders", async () => {
      const rows = [{ product_id: 1, order_id: 1 }];
      jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

      const user = { userId: 1, is_admin: true };
      const token = generateToken(user);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .get("/api/product_order")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/product_order/product/:product_id/order/:order_id", () => {
    it("should fetch a single product order duo by IDs", async () => {
      const productOrder = { product_id: 1, order_id: 1 };
      jest.spyOn(database, "query").mockResolvedValueOnce([[productOrder]]);

      const user = { userId: 1, is_admin: true };
      const token = generateToken(user);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .get("/api/product_order/product/1/order/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(productOrder);
    });

    it("should return 404 if product order duo not found", async () => {
      jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

      const user = { userId: 1, is_admin: true };
      const token = generateToken(user);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .get("/api/product_order/product/0/order/0")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("Product_order duo not found");
    });
  });

  describe("POST /api/product_order", () => {
    it("should create a new product order duo", async () => {
      const productOrder = { product_id: 1, order_id: 1 };
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const user = { userId: 1, is_admin: true };
      const token = generateToken(user);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .post("/api/product_order")
        .send(productOrder)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Product_order duo added");
    });
  });

  describe("DELETE /api/product_order/product/:product_id/order/:order_id", () => {
    it("should delete a product order duo", async () => {
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const user = { userId: 1, is_admin: true };
      const token = generateToken(user);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .delete("/api/product_order/product/1/order/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Product_order duo deleted");
    });
  });
});
