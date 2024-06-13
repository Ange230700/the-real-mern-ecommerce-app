const { app, request, database, tables } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Product Category API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/product_category", () => {
    it("should fetch all product categories", async () => {
      const response = await request(app).get("/api/product_category");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/product_category/product/:product_id/category/:category_id", () => {
    it("should fetch a single product category duo by IDs", async () => {
      const category = { name: "Test Category", image: "test.png" };
      const product = {
        title: "Test Product",
        price: 10.99,
        image_url: "test_product.png",
        product_adjective: "Test",
        product_material: "Test Material",
        product_description: "Test Description",
      };

      const categoryId = await tables.Category.createCategory(category);
      const productId = await tables.Product.createProduct(product);

      await tables.Product_category.createProductCategory({
        product_id: productId,
        category_id: categoryId,
      });

      const response = await request(app).get(
        `/api/product_category/product/${productId}/category/${categoryId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("product_id");
      expect(response.body).toHaveProperty("category_id");
      expect(response.body.product_id).toBe(productId);
      expect(response.body.category_id).toBe(categoryId);
    });

    it("should return 404 if product category duo not found", async () => {
      const response = await request(app).get(
        "/api/product_category/product/9999/category/9999"
      );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product_category duo not found");
    });
  });

  describe("POST /api/product_category", () => {
    it("should create a new product category duo", async () => {
      const adminToken = generateToken({ is_admin: true });

      const category = { name: "New Category", image: "new.png" };
      const product = {
        title: "New Product",
        price: 19.99,
        image_url: "new_product.png",
        product_adjective: "New",
        product_material: "Material",
        product_description: "Description",
      };

      const categoryId = await tables.Category.createCategory(category);
      const productId = await tables.Product.createProduct(product);

      const response = await request(app)
        .post("/api/product_category")
        .set("Cookie", `token=${adminToken}`)
        .send({ product_id: productId, category_id: categoryId });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("affectedRows");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product_category duo added");
    });
  });

  describe("DELETE /api/product_category/product/:product_id/category/:category_id", () => {
    it("should delete a product category duo", async () => {
      const adminToken = generateToken({ is_admin: true });

      const category = { name: "Delete Category", image: "delete.png" };
      const product = {
        title: "Delete Product",
        price: 29.99,
        image_url: "delete_product.png",
        product_adjective: "Delete",
        product_material: "Material",
        product_description: "Description",
      };

      const categoryId = await tables.Category.createCategory(category);
      const productId = await tables.Product.createProduct(product);

      await tables.Product_category.createProductCategory({
        product_id: productId,
        category_id: categoryId,
      });

      const response = await request(app)
        .delete(
          `/api/product_category/product/${productId}/category/${categoryId}`
        )
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product_category duo deleted");
    });
  });
});
