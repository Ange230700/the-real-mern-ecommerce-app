const { app, request, database } = require("../config");

describe("Payment API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("POST /api/checkout/payment", () => {
    it("should create a payment intent", async () => {
      const paymentInfo = {
        tokenId: "tok_visa", // Use a valid Stripe test token
        amount: 2000,
      };

      const response = await request(app)
        .post("/api/checkout/payment")
        .send(paymentInfo);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success");
    });

    it("should handle stripe errors", async () => {
      const paymentInfo = {
        tokenId: "invalid_token",
        amount: 2000,
      };

      const response = await request(app)
        .post("/api/checkout/payment")
        .send(paymentInfo);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });
});
