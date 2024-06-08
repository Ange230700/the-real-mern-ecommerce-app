const { app, request, database, jwt } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Popular Products API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("GET /api/popular_products", () => {
    it("should fetch all popular products", async () => {
      const rows = [
        { id: 1, title: "Product1", price: 100, image: "image_url" },
      ];
      jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

      const response = await request(app).get("/api/popular_products");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/popular_products/popular_product/:popular_product_id", () => {
    it("should fetch a single popular product by ID", async () => {
      const product = {
        id: 1,
        title: "Product1",
        price: 100,
        image: "image_url",
      };
      jest.spyOn(database, "query").mockResolvedValueOnce([[product]]);

      const response = await request(app).get(
        "/api/popular_products/popular_product/1"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });

    it("should return 404 if popular product not found", async () => {
      jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

      const response = await request(app).get(
        "/api/popular_products/popular_product/0"
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("Popular product not found");
    });
  });

  describe("POST /api/popular_products/popular_product", () => {
    it("should create a new popular product", async () => {
      const product = { title: "Product1", price: 100, image: "image_url" };
      const result = { insertId: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .post("/api/popular_products/popular_product")
        .send(product)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Popular product added");
    });
  });

  describe("PUT /api/popular_products/popular_product/:popular_product_id", () => {
    it("should update an existing popular product", async () => {
      const product = {
        title: "Updated Product1",
        price: 150,
        image: "new_image_url",
      };
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .put("/api/popular_products/popular_product/1")
        .send(product)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Popular product updated");
    });
  });

  describe("DELETE /api/popular_products/popular_product/:popular_product_id", () => {
    it("should delete a popular product", async () => {
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .delete("/api/popular_products/popular_product/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Popular product deleted");
    });
  });
});
