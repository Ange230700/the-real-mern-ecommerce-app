const { app, request, database, tables } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Popular Products API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/popular_products", () => {
    it("should fetch all popular products", async () => {
      const response = await request(app).get("/api/popular_products");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/popular_products/popular_product/:popular_product_id", () => {
    it("should fetch a single popular product by ID", async () => {
      const popularProduct = {
        title: "Popular Product Fetch",
        price: 29.99,
        image: "fetch.png",
      };

      const insertId =
        await tables.Popular_product.createPopularProduct(popularProduct);
      const response = await request(app).get(
        `/api/popular_products/popular_product/${insertId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("price");
      expect(response.body).toHaveProperty("image");
    });

    it("should return 404 if popular product not found", async () => {
      const response = await request(app).get(
        "/api/popular_products/popular_product/9999"
      );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Popular product not found");
    });
  });

  describe("POST /api/popular_products/popular_product", () => {
    it("should create a new popular product", async () => {
      const adminToken = generateToken({ is_admin: true });

      const popularProduct = {
        title: "New Popular Product",
        price: 19.99,
        image: "new.png",
      };
      const response = await request(app)
        .post("/api/popular_products/popular_product")
        .set("Cookie", `token=${adminToken}`)
        .send(popularProduct);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("insertId");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Popular product added");
    });
  });

  describe("PUT /api/popular_products/popular_product/:popular_product_id", () => {
    it("should update an existing popular product", async () => {
      const adminToken = generateToken({ is_admin: true });

      const popularProduct = {
        title: "Update Popular Product",
        price: 39.99,
        image: "update.png",
      };
      const insertId =
        await tables.Popular_product.createPopularProduct(popularProduct);

      const updatedPopularProduct = {
        title: "Updated Popular Product",
        price: 49.99,
        image: "updated.png",
      };
      const response = await request(app)
        .put(`/api/popular_products/popular_product/${insertId}`)
        .set("Cookie", `token=${adminToken}`)
        .send(updatedPopularProduct);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Popular product updated");
    });
  });

  describe("DELETE /api/popular_products/popular_product/:popular_product_id", () => {
    it("should delete a popular product", async () => {
      const adminToken = generateToken({ is_admin: true });

      const popularProduct = {
        title: "Delete Popular Product",
        price: 9.99,
        image: "delete.png",
      };
      const insertId =
        await tables.Popular_product.createPopularProduct(popularProduct);

      const response = await request(app)
        .delete(`/api/popular_products/popular_product/${insertId}`)
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Popular product deleted");
    });
  });
});
