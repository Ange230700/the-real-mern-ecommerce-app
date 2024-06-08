const { app, request, database, jwt } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Product Category API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("GET /api/product_category", () => {
    it("should fetch all product categories", async () => {
      const rows = [{ product_id: 1, category_id: 1 }];
      jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

      const response = await request(app).get("/api/product_category");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/product_category/product/:product_id/category/:category_id", () => {
    it("should fetch a single product category duo by IDs", async () => {
      const productCategory = { product_id: 1, category_id: 1 };
      jest.spyOn(database, "query").mockResolvedValueOnce([[productCategory]]);

      const response = await request(app).get(
        "/api/product_category/product/1/category/1"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(productCategory);
    });

    it("should return 404 if product category duo not found", async () => {
      jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

      const response = await request(app).get(
        "/api/product_category/product/0/category/0"
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("Product_category duo not found");
    });
  });

  describe("POST /api/product_category", () => {
    it("should create a new product category duo", async () => {
      const productCategory = { product_id: 1, category_id: 1 };
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .post("/api/product_category")
        .send(productCategory)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Product_category duo added");
    });
  });

  describe("DELETE /api/product_category/product/:product_id/category/:category_id", () => {
    it("should delete a product category duo", async () => {
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .delete("/api/product_category/product/1/category/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Product_category duo deleted");
    });
  });
});
