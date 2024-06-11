const { app, request, database, CryptoJS } = require("../config");

describe("Users API", () => {
  beforeAll(async () => {
    const adminUser = {
      username: "test_admin1",
      email: "test.admin1@example.com",
      password: CryptoJS.AES.encrypt(
        "password1",
        process.env.APP_SECRET
      ).toString(),
      is_admin: true,
    };

    await database.query(
      `INSERT INTO User (username, email, password, is_admin) VALUES (?, ?, ?, ?)`,
      [
        adminUser.username,
        adminUser.email,
        adminUser.password,
        adminUser.is_admin,
      ]
    );

    const adminUser2 = {
      username: "test_admin2",
      email: "test.admin2@example.com",
      password: CryptoJS.AES.encrypt(
        "password2",
        process.env.APP_SECRET
      ).toString(),
      is_admin: true,
    };

    await database.query(
      `INSERT INTO User (username, email, password, is_admin) VALUES (?, ?, ?, ?)`,
      [
        adminUser2.username,
        adminUser2.email,
        adminUser2.password,
        adminUser2.is_admin,
      ]
    );

    const adminUser3 = {
      username: "test_admin3",
      email: "test.admin3@example.com",
      password: CryptoJS.AES.encrypt(
        "password3",
        process.env.APP_SECRET
      ).toString(),
      is_admin: true,
    };

    await database.query(
      `INSERT INTO User (username, email, password, is_admin) VALUES (?, ?, ?, ?)`,
      [
        adminUser3.username,
        adminUser3.email,
        adminUser3.password,
        adminUser3.is_admin,
      ]
    );

    const nonAdminUser = {
      username: "test_user15",
      email: "test.user15@example.com",
      password: CryptoJS.AES.encrypt(
        "password15",
        process.env.APP_SECRET
      ).toString(),
      is_admin: false,
    };

    await database.query(
      `INSERT INTO User (username, email, password, is_admin) VALUES (?, ?, ?, ?)`,
      [
        nonAdminUser.username,
        nonAdminUser.email,
        nonAdminUser.password,
        nonAdminUser.is_admin,
      ]
    );

    const nonAdminUser2 = {
      username: "test_user16",
      email: "test.user16@example.com",
      password: CryptoJS.AES.encrypt(
        "password16",
        process.env.APP_SECRET
      ).toString(),
      is_admin: false,
    };

    await database.query(
      `INSERT INTO User (username, email, password, is_admin) VALUES (?, ?, ?, ?)`,
      [
        nonAdminUser2.username,
        nonAdminUser2.email,
        nonAdminUser2.password,
        nonAdminUser2.is_admin,
      ]
    );
  });

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
        email: "test.admin1@example.com",
        password: "password1",
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
        email: "test.user15@example.com",
        password: "password15",
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
        email: "test.admin2@example.com",
        password: "password2",
      };

      const adminLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(adminUserCredentials);

      expect(adminLoginResponse.body).toHaveProperty("token");

      const adminToken = adminLoginResponse.body.token;

      const response = await request(app)
        .get("/api/users/user/13")
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userId");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("is_admin");
    });

    it("should be unauthorized for non-admin users", async () => {
      const userCredentials = {
        email: "test.user16@example.com",
        password: "password16",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .get("/api/users/user/13")
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You are not allowed to do that!");
    });
  });
});
