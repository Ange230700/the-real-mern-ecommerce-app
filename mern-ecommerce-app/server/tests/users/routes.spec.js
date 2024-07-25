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
      const adminUserToRegister = {
        username: "admin6",
        email: "admin6@admin6.admin6",
        password: "admin6",
        is_admin: true,
      };

      const adminUserRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminUserToRegister);

      expect(adminUserRegistrationResponse.status).toBe(201);
      expect(adminUserRegistrationResponse.body).toHaveProperty("insertId");

      const adminUserCredentials = {
        email: "admin6@admin6.admin6",
        password: "admin6",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminUserCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

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
      const userToRegister = {
        username: "user3",
        email: "user3@user3.user3",
        password: "user3",
      };

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user3@user3.user3",
        password: "user3",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

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
      const adminUserToRegister = {
        username: "admin7",
        email: "admin7@admin7.admin7",
        password: "admin7",
        is_admin: true,
      };

      const adminUserRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(adminUserToRegister);

      expect(adminUserRegistrationResponse.status).toBe(201);
      expect(adminUserRegistrationResponse.body).toHaveProperty("insertId");

      const adminUserCredentials = {
        email: "admin7@admin7.admin7",
        password: "admin7",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminUserCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");
      expect(adminLoginResponse.body.token).toBeTruthy();

      const adminToken = adminLoginResponse.body.token;

      const response = await request(app)
        .get(`/api/users/user/${adminUserRegistrationResponse.body.insertId}`)
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userId");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("is_admin");
    });

    it("should be unauthorized for non-admin users", async () => {
      const userToRegister = {
        username: "user40",
        email: "user40@user40.user40",
        password: "user40",
      };

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user40@user40.user40",
        password: "user40",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .get(`/api/users/user/${userRegistrationResponse.body.insertId}`)
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You are not allowed to do that!");
    });
  });

  describe("PUT /api/users/:user_id", () => {
    it("should edit an authenticated user's own profile", async () => {
      const userToRegister = {
        username: "user100",
        email: "user100@user100.user100",
        password: "user100",
      };

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user100@user100.user100",
        password: "user100",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

      const updatedUser = {
        username: "updated_user17",
        email: "user100@user1000.user10",
        password: "user1000",
      };

      const response = await request(app)
        .put(`/api/users/user/${userRegistrationResponse.body.insertId}`)
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
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .delete(`/api/users/user/${userRegistrationResponse.body.insertId}`)
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User deleted successfully");
    });
  });
});
