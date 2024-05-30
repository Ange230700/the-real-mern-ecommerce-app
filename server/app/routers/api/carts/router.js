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
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/cartActions");

// Route to get a list of carts
router.get("/", verifyTokenAndAdmin, browse);

// Route to get a specific cart by ID
router.get("/:id", verifyTokenAndAuthorization, read);

// Route to add a new cart
router.post("/", verifyToken, add);

// Route to edit a specific cart by ID
router.put("/:id", verifyTokenAndAuthorization, edit);

// Route to delete a specific cart by ID
router.delete("/:id", verifyTokenAndAuthorization, destroy);

/* ************************************************************************* */

module.exports = router;
