const { app, request, database } = require("../config");

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
      const userCredentials = {
        email: "user@user.user",
        password: "user",
      };

      const userLoginResponse = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(userLoginResponse.body).toHaveProperty("token");
      expect(userLoginResponse.body.token).toBeTruthy();

      const userToken = userLoginResponse.body.token;

      const response = await request(app)
        .get("/api/carts/user/2")
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
