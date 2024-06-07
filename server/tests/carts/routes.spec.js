const { app, request, database } = require("../config");

describe("Carts API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("GET /api/carts/user/:user_id", () => {
    it("should fetch all carts for a user", async () => {
      const rows = [
        { cart_id: 1, user_id: 1, status: "active", username: "john_doe" },
      ];

      jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

      const response = await request(app).get("/api/carts/user/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/carts/cart/:cart_id/user/:user_id", () => {
    it("should fetch a single cart by ID", async () => {
      const cart = {
        cart_id: 1,
        user_id: 1,
        status: "active",
        username: "john_doe",
      };

      jest.spyOn(database, "query").mockResolvedValueOnce([[cart]]);

      const response = await request(app).get("/api/carts/cart/1/user/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(cart);
    });

    it("should return 404 if cart not found", async () => {
      jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

      const response = await request(app).get("/api/carts/cart/0/user/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Cart not found" });
    });
  });

  describe("POST /api/carts/cart/user/:user_id", () => {
    it("should add a new cart", async () => {
      const cart = {
        user_id: 1,
        status: "active",
      };
      const result = [{ insertId: 1 }];

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const response = await request(app)
        .post("/api/carts/cart/user/1")
        .send(cart);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: "Cart created" });
    });
  });

  describe("PUT /api/carts/cart/:cart_id/user/:user_id", () => {
    it("should update an existing cart", async () => {
      const cart = { status: "inactive" };
      const result = [{ affectedRows: 1 }];

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const response = await request(app)
        .put("/api/carts/cart/1/user/1")
        .send(cart);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Cart updated" });
    });
  });

  describe("DELETE /api/carts/cart/:cart_id/user/:user_id", () => {
    it("should delete a cart", async () => {
      const result = [{ affectedRows: 1 }];

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const response = await request(app).delete("/api/carts/cart/1/user/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Cart deleted" });
    });
  });
});
