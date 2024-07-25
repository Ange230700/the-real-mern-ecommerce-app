const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (request, response) => {
  try {
    const product = await stripe.products.create({
      name: "T-shirt",
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 2000,
      currency: "usd",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
    });

    response.redirect(303, session.url);
  } catch (error) {
    // console.error("Stripe error:", error); // Add detailed logging
    response.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
