const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
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
router.get("/admin", verifyTokenAndAdmin, browseCarts);

// Route to get a specific cart by ID
router.get("/cart/user/:user_id", verifyTokenAndAuthorization, readCart);

// Route to add a new cart
router.post("/cart/user", verifyToken, addCart);

// Route to edit a specific cart by ID
router.put("/cart/user/:user_id", verifyTokenAndAuthorization, editCart);

// Route to delete a specific cart by ID
router.delete("/cart/user/:user_id", verifyTokenAndAuthorization, destroyCart);

/* ************************************************************************* */

module.exports = router;
