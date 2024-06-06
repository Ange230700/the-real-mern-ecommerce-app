const KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(KEY);

const createPaymentIntent = async (request, response, next) => {
  try {
    // Extract the amount from the request body
    const { tokenId, amount } = request.body;

    // Create a payment intent with the specified amount
    await stripe.paymentIntents.create(
      {
        source: tokenId,
        amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          response.status(500).send({ error: stripeErr });
        } else {
          response.status(200).send({ success: stripeRes });
        }
      }
    );
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

module.exports = {
  createPaymentIntent,
};
