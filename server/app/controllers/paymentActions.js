/*
  eslint-disable no-unused-vars
*/

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (request, response, next) => {
  try {
    const { tokenId, amount } = request.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: tokenId,
      confirm: true,
    });

    response.status(200).send({ success: paymentIntent });
  } catch (error) {
    // console.error("Stripe error:", error); // Add detailed logging
    response.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
