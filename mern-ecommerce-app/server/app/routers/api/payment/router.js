const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import payment-related actions
const { createPaymentIntent } = require("../../../controllers/paymentActions");

// Route to create a payment intent
router.post("/payment", createPaymentIntent);

/* ************************************************************************* */

module.exports = router;
