const { app, request, database } = require("../config");

describe("Users API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/users", () => {
    it("should fetch all users as an admin", async () => {
      const adminUserCredentials = {
        email: "admin@admin.admin",
        password: "admin",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminUserCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");

      const adminToken = adminLoginResponse.body.token;

      const response = await request(app)
        .get("/api/users")
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      response.body.forEach((user) => {
        expect(user).toHaveProperty("userId");
        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("is_admin");
      });
    });

    it("should be unauthorized for non-admin users", async () => {
      const userCredentials = {
        email: "user@user.user",
        password: "user",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .get("/api/users")
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You are not allowed to do that!");
    });
  });

  describe("GET /api/users/:user_id", () => {
    it("should fetch a user by ID as an admin", async () => {
      const adminUserCredentials = {
        email: "admin@admin.admin",
        password: "admin",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminUserCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");

      const adminToken = adminLoginResponse.body.token;

      const response = await request(app)
        .get("/api/users/user/2")
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userId");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("is_admin");
    });

    it("should be unauthorized for non-admin users", async () => {
      const userCredentials = {
        email: "user@user.user",
        password: "user",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .get("/api/users/user/2")
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You are not allowed to do that!");
    });
  });

  describe("PUT /api/users/:user_id", () => {
    it("should edit an authenticated user's own profile", async () => {
      const userCredentials = {
        email: "user@user.user",
        password: "user",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");

      const userToken = userLoginResponse.body.token;

      const updatedUser = {
        username: "updated_user17",
        email: "user@user.user",
        password: "user",
      };

      const response = await request(app)
        .put("/api/users/user/2")
        .set("Cookie", `token=${userToken}`)
        .send(updatedUser);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User updated successfully");
    });
  });

  describe("DELETE /api/users/:user_id", () => {
    it("should delete an authenticated user's own profile", async () => {
      const userToRegister = {
        username: "user2",
        email: "user2@user2.user2",
        password: "user2",
      };

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user2@user2.user2",
        password: "user2",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .delete("/api/users/user/6")
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User deleted successfully");
    });
  });
});
