const { app, request, database, jwt } = require("../config");

describe("Auth API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const user = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/auth/register").send(user);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User registered successfully.");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should log in a user", async () => {
      const user = {
        email: "testuser@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/auth/login").send(user);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");

      const { token } = response.body;

      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, { email: user.email })
      );

      const authResponse = await request(app)
        .get("/api/auth")
        .set("Authorization", `Bearer ${token}`);

      expect(authResponse.status).toBe(200);
    });

    it("should return 404 for non-existent user", async () => {
      const user = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/auth/login").send(user);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("User not found");
    });

    it("should return 401 for incorrect password", async () => {
      const user = {
        email: "testuser@example.com",
        password: "wrongpassword",
      };

      const response = await request(app).post("/api/auth/login").send(user);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Invalid email or password");
    });
  });
});
