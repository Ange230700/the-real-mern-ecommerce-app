const { app, request, database, CryptoJS } = require("../config");

describe("Carts API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/carts/user/:user_id", () => {
    it("should fetch all carts for an authenticated user", async () => {
      const userToRegister = {
        username: "user9000",
        email: "user9000@user9000.user9000",
        password: "user9000",
      };

      const encryptedPassword = CryptoJS.AES.encrypt(
        userToRegister.password,
        process.env.APP_SECRET
      ).toString();

      userToRegister.password = encryptedPassword;

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user9000@user9000.user9000",
        password: "user9000",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .get(`/api/carts/user/${userRegistrationResponse.body.insertId}`)
        .set("Cookie", `token=${userToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveProperty("length");

      response.body.forEach((cart) => {
        expect(cart).toHaveProperty("cart_id");
        expect(cart).toHaveProperty("user_id");
        expect(cart).toHaveProperty("status");
        expect(cart).toHaveProperty("username");
      });
    });
  });
});
