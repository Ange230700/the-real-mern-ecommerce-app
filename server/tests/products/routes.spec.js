const { app, request, database, tables } = require("../config");

describe("Products API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/products", () => {
    it("should fetch all products", async () => {
      const response = await request(app).get("/api/products");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/products/product/:product_id", () => {
    it("should fetch a single product by ID", async () => {
      const product = {
        title: "Test Product",
        price: 10.99,
        image_url: "test_product.png",
        product_adjective: "Test",
        product_material: "Test Material",
        product_description: "Test Description",
      };

      const productId = await tables.Product.createProduct(product);
      const response = await request(app).get(
        `/api/products/product/${productId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("price");
    });

    it("should return 404 if product not found", async () => {
      const response = await request(app).get("/api/products/product/9999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product not found");
    });
  });

  describe("POST /api/products/product/user/:user_id", () => {
    it("should add a new product", async () => {
      const adminToRegister = {
        username: "admin898989",
        email: "admin898989@admin898989.admin898989",
        password: "admin898989",
        is_admin: true,
      };

      const adminRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminToRegister);

      expect(adminRegistrationResponse.status).toBe(201);
      expect(adminRegistrationResponse.body).toHaveProperty("insertId");

      const adminCredentials = {
        email: "admin898989@admin898989.admin898989",
        password: "admin898989",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const product = {
        title: "New Product",
        price: 19.99,
        image_url: "new_product.png",
        product_adjective: "New",
        product_material: "New Material",
        product_description: "New Description",
      };
      const response = await request(app)
        .post(
          `/api/products/product/user/${adminRegistrationResponse.body.insertId}`
        )
        .set("Cookie", `token=${adminToken}`)
        .send(product);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("insertId");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product added");
    });
  });

  describe("PUT /api/products/product/:product_id/user/:user_id", () => {
    it("should update an existing product", async () => {
      const adminToRegister = {
        username: "admin989898",
        email: "admin989898@admin989898.admin989898",
        password: "admin989898",
        is_admin: true,
      };

      const adminRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminToRegister);

      expect(adminRegistrationResponse.status).toBe(201);
      expect(adminRegistrationResponse.body).toHaveProperty("insertId");

      const adminCredentials = {
        email: "admin989898@admin989898.admin989898",
        password: "admin989898",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const product = {
        title: "Update Product",
        price: 39.99,
        image_url: "update_product.png",
        product_adjective: "Update",
        product_material: "Update Material",
        product_description: "Update Description",
      };
      const productId = await tables.Product.createProduct(product);

      const updatedProduct = {
        title: "Updated Product",
        price: 49.99,
        image_url: "updated_product.png",
        product_adjective: "Updated",
        product_material: "Updated Material",
        product_description: "Updated Description",
      };
      const response = await request(app)
        .put(
          `/api/products/product/${productId}/user/${adminRegistrationResponse.body.insertId}`
        )
        .set("Cookie", `token=${adminToken}`)
        .send(updatedProduct);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product updated");
    });
  });

  describe("DELETE /api/products/product/:product_id/user/:user_id", () => {
    it("should delete a product", async () => {
      const adminToRegister = {
        username: "admin195",
        email: "admin195@admin195.admin195",
        password: "admin195",
        is_admin: true,
      };

      const adminRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminToRegister);

      expect(adminRegistrationResponse.status).toBe(201);
      expect(adminRegistrationResponse.body).toHaveProperty("insertId");

      const adminCredentials = {
        email: "admin195@admin195.admin195",
        password: "admin195",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const product = {
        title: "Delete Product",
        price: 9.99,
        image_url: "delete_product.png",
        product_adjective: "Delete",
        product_material: "Delete Material",
        product_description: "Delete Description",
      };
      const productId = await tables.Product.createProduct(product);

      const response = await request(app)
        .delete(
          `/api/products/product/${productId}/user/${adminRegistrationResponse.body.insertId}`
        )
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Product deleted");
    });
  });
});
