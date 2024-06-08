const { app, request, database, stripe } = require("../config");

describe("Payment API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("POST /api/checkout/payment", () => {
    it("should create a payment intent", async () => {
      const paymentInfo = { tokenId: "tok_visa", amount: 2000 };
      const stripeResponse = {
        id: "pi_1GqIC8ClCIKljWzOABLUwRJK",
        amount: 2000,
      };

      jest
        .spyOn(stripe.paymentIntents, "create")
        .mockResolvedValueOnce(stripeResponse);

      const response = await request(app)
        .post("/api/checkout/payment")
        .send(paymentInfo);

      expect(response.status).toBe(200);
      expect(response.body.success).toEqual(stripeResponse);
    });

    it("should handle stripe errors", async () => {
      const paymentInfo = { tokenId: "tok_invalid", amount: 2000 };
      const stripeError = new Error("Stripe error");

      jest
        .spyOn(stripe.paymentIntents, "create")
        .mockRejectedValueOnce(stripeError);

      const response = await request(app)
        .post("/api/checkout/payment")
        .send(paymentInfo);

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual(stripeError.message);
    });
  });
});
