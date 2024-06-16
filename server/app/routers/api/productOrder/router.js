const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  // verifyToken,
  verifyTokenAndAuthorization,
  // verifyTokenAndAdmin,
} = require("../../../middlewares/authMiddleware");

// Import productOrder-related actions
const {
  browseProductOrder,
  readProductOrder,
  addProductOrder,
  destroyProductOrder,
} = require("../../../controllers/productOrderActions");

// Route to get a list of productOrders
router.get("/user/:user_id", verifyTokenAndAuthorization, browseProductOrder);

// Route to get a specific productOrder by ID
router.get(
  "/product/:product_id/order/:order_id/user/:user_id",
  verifyTokenAndAuthorization,
  readProductOrder
);

// Route to add a new productOrder
router.post("/user/:user_id", verifyTokenAndAuthorization, addProductOrder);

// Route to delete a specific productOrder by ID
router.delete(
  "/product/:product_id/order/:order_id/user/:user_id",
  verifyTokenAndAuthorization,
  destroyProductOrder
);

/* ************************************************************************* */

module.exports = router;
