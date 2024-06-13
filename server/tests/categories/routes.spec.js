const { app, request, database, tables } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Categories API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/categories", () => {
    it("should fetch all categories", async () => {
      const response = await request(app).get("/api/categories");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/categories/category/:category_id", () => {
    it("should fetch a single category by ID", async () => {
      const category = { name: "Fetch Category", image: "fetch.png" };

      const insertId = await tables.Category.createCategory(category);
      const response = await request(app).get(
        `/api/categories/category/${insertId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("image");
    });

    it("should return 404 if category not found", async () => {
      const response = await request(app).get("/api/categories/category/9999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Category not found");
    });
  });

  describe("POST /api/categories/category", () => {
    it("should create a new category", async () => {
      const adminToken = generateToken({ is_admin: true });

      const category = { name: "New Category", image: "new.png" };
      const response = await request(app)
        .post("/api/categories/category")
        .set("Cookie", `token=${adminToken}`)
        .send(category);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("insertId");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Category added");
    });
  });

  describe("PUT /api/categories/category/:category_id", () => {
    it("should update an existing category", async () => {
      const adminToken = generateToken({ is_admin: true });

      const category = { name: "Update Category", image: "update.png" };
      const insertId = await tables.Category.createCategory(category);

      const updatedCategory = {
        name: "Updated Category",
        image: "updated.png",
      };
      const response = await request(app)
        .put(`/api/categories/category/${insertId}`)
        .set("Cookie", `token=${adminToken}`)
        .send(updatedCategory);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Category updated");
    });
  });

  describe("DELETE /api/categories/category/:category_id", () => {
    it("should delete a category", async () => {
      const adminToken = generateToken({ is_admin: true });

      const category = { name: "Delete Category", image: "delete.png" };
      const insertId = await tables.Category.createCategory(category);

      const response = await request(app)
        .delete(`/api/categories/category/${insertId}`)
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Category deleted");
    });
  });
});
