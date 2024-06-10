const { app, request, CryptoJS } = require("../config");
const database = require("../../database/client");

describe("Auth API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const user = {
        username: "test_user",
        email: "test.user@example.com",
        password: "password123",
      };

      const encryptedPassword = CryptoJS.AES.encrypt(
        user.password,
        process.env.APP_SECRET
      ).toString();

      user.password = encryptedPassword;

      expect(user.password).toBe(encryptedPassword);

      const response = await request(app).post("/api/auth/register").send(user);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("insertId");
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User registered successfully.");
    });
  });

  // describe("POST /api/auth/login", () => {
  //   it("should log in a user", async () => {
  //     const user = {
  //       email: "testuser@example.com",
  //       password: "password123",
  //     };

  //     const response = await request(app).post("/api/auth/login").send(user);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("token");

  //     const { token } = response.body;

  //     jwt.verify.mockImplementation((token_arg, secret, callback) =>
  //       callback(null, { email: user.email })
  //     );

  //     const authResponse = await request(app)
  //       .get("/api/auth")
  //       .set("Authorization", `Bearer ${token}`);

  //     expect(authResponse.status).toBe(200);
  //   });

  //   it("should return 404 for non-existent user", async () => {
  //     const user = {
  //       email: "nonexistent@example.com",
  //       password: "password123",
  //     };

  //     const response = await request(app).post("/api/auth/login").send(user);

  //     expect(response.status).toBe(404);
  //     expect(response.body.error).toBe("User not found");
  //   });

  //   it("should return 401 for incorrect password", async () => {
  //     const user = {
  //       email: "testuser@example.com",
  //       password: "wrongpassword",
  //     };

  //     const response = await request(app).post("/api/auth/login").send(user);

  //     expect(response.status).toBe(401);
  //     expect(response.body.error).toBe("Invalid email or password");
  //   });
  // });
});
