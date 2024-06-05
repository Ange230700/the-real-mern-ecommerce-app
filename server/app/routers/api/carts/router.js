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
  browseCartsAsUser,
  readCartAsUser,
  addCartAsUser,
  editCartAsUser,
  destroyCartAsUser,
} = require("../../../controllers/cartActions");

// Route to get a list of carts
router.get("/user/:user_id", verifyTokenAndAuthorization, browseCartsAsUser);

// Route to get a specific cart by ID
router.get(
  "/cart/:id/user/:user_id",
  verifyTokenAndAuthorization,
  readCartAsUser
);

// Route to add a new cart
router.post("/cart/user/:user_id", verifyToken, addCartAsUser);

// Route to edit a specific cart by ID
router.put(
  "/cart/:id/user/:user_id",
  verifyTokenAndAuthorization,
  editCartAsUser
);

// Route to delete a specific cart by ID
router.delete(
  "/cart/:id/user/:user_id",
  verifyTokenAndAuthorization,
  destroyCartAsUser
);

/* ************************************************************************* */

module.exports = router;
