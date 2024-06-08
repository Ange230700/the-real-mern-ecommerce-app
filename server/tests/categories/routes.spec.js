const { app, request, database, jwt } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Categories API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("GET /api/categories", () => {
    it("should fetch all categories", async () => {
      const rows = [{ id: 1, name: "Electronics", image: "image_url" }];
      jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

      const response = await request(app).get("/api/categories");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/categories/category/:category_id", () => {
    it("should fetch a single category by ID", async () => {
      const category = { id: 1, name: "Electronics", image: "image_url" };
      jest.spyOn(database, "query").mockResolvedValueOnce([[category]]);

      const response = await request(app).get("/api/categories/category/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(category);
    });

    it("should return 404 if category not found", async () => {
      jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

      const response = await request(app).get("/api/categories/category/0");

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("Category not found");
    });
  });

  describe("POST /api/categories/category", () => {
    it("should create a new category", async () => {
      const category = { name: "Electronics", image: "image_url" };
      const result = { insertId: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .post("/api/categories/category")
        .send(category)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Category added");
    });
  });

  describe("PUT /api/categories/category/:category_id", () => {
    it("should update an existing category", async () => {
      const category = { name: "Updated Electronics", image: "new_image_url" };
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .put("/api/categories/category/1")
        .send(category)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Category updated");
    });
  });

  describe("DELETE /api/categories/category/:category_id", () => {
    it("should delete a category", async () => {
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .delete("/api/categories/category/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Category deleted");
    });
  });
});
