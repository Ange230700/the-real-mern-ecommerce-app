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

// Import order-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/orderActions");

// Route to get a list of orders
router.get("/", verifyTokenAndAdmin, browse);

// Route to get a specific order by ID
router.get("/:id", verifyTokenAndAuthorization, read);

// Route to add a new order
router.post("/", verifyToken, add);

// Route to edit a specific order by ID
router.put("/:id", verifyTokenAndAuthorization, edit);

// Route to delete a specific order by ID
router.delete("/:id", verifyTokenAndAuthorization, destroy);

/* ************************************************************************* */

module.exports = router;
