const { app, request, database } = require("../config");

describe("Products API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("GET /api/products", () => {
    it("should fetch all products", async () => {
      const rows = [{ id: 1, title: "Product 1", price: 100.0 }];

      jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

      const response = await request(app).get("/api/products");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/products/product/:product_id", () => {
    it("should fetch a single product by ID", async () => {
      const product = { id: 1, title: "Product 1", price: 100.0 };

      jest.spyOn(database, "query").mockResolvedValueOnce([[product]]);

      const response = await request(app).get("/api/products/product/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });

    it("should return 404 if product not found", async () => {
      jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

      const response = await request(app).get("/api/products/product/0");

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("Product not found");
    });
  });

  describe("POST /api/products/product", () => {
    it("should add a new product", async () => {
      const product = {
        title: "Product 1",
        price: 100.0,
        image_url: "http://example.com/image.jpg",
        product_adjective: "Amazing",
        product_material: "Metal",
        product_description: "This is a great product.",
      };
      const result = [{ insertId: 1 }];

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const response = await request(app)
        .post("/api/products/product")
        .send(product);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Product added");
    });
  });

  describe("PUT /api/products/product/:product_id", () => {
    it("should update an existing product", async () => {
      const product = { title: "Updated Product" };
      const result = [{ affectedRows: 1 }];

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const response = await request(app)
        .put("/api/products/product/1")
        .send(product);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Product updated");
    });
  });

  describe("DELETE /api/products/product/:product_id", () => {
    it("should delete a product", async () => {
      const result = [{ affectedRows: 1 }];

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const response = await request(app).delete("/api/products/product/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Product deleted");
    });
  });
});
