const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../../../middlewares/authMiddleware");

// Import cart-related actions
const {
  browseCarts,
  readCart,
  addCart,
  editCart,
  destroyCart,
} = require("../../../controllers/cartActions");

// Route to get a list of carts
router.get("/user/:user_id", verifyTokenAndAuthorization, browseCarts);

// Route to get a specific cart by ID
router.get(
  "/cart/:cart_id/user/:user_id",
  verifyTokenAndAuthorization,
  readCart
);

// Route to add a new cart
router.post("/cart/user/:user_id", verifyToken, addCart);

// Route to edit a specific cart by ID
router.put(
  "/cart/:cart_id/user/:user_id",
  verifyTokenAndAuthorization,
  editCart
);

// Route to delete a specific cart by ID
router.delete(
  "/cart/:cart_id/user/:user_id",
  verifyTokenAndAuthorization,
  destroyCart
);

/* ************************************************************************* */

module.exports = router;
