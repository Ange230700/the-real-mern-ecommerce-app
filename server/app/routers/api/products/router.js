const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  // verifyToken,
  // verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../../../middlewares/authMiddleware");

// Import product-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/productActions");

// Route to get a list of products
router.get("/", browse);

// Route to get a specific product by ID
router.get("/:id", read);

// Route to add a new product
router.post("/", verifyTokenAndAdmin, add);

// Route to edit a specific product by ID
router.put("/:id", verifyTokenAndAdmin, edit);

// Route to delete a specific product by ID
router.delete("/:id", verifyTokenAndAdmin, destroy);

/* ************************************************************************* */

module.exports = router;
