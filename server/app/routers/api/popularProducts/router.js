const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { verifyTokenAndAdmin } = require("../../../middlewares/authMiddleware");

// Import popularProduct-related actions
const {
  browsePopularProducts,
  readPopularProduct,
  editPopularProduct,
  addPopularProduct,
  destroyPopularProduct,
} = require("../../../controllers/popularProductActions");

// Route to get a list of popularProducts
router.get("/", browsePopularProducts);

// Route to get a specific popularProduct by ID
router.get("/popular_product/:id", readPopularProduct);

// Route to add a new popularProduct
router.post("/popular_product", verifyTokenAndAdmin, addPopularProduct);

// Route to edit a specific popularProduct by ID
router.put("/popular_product/:id", verifyTokenAndAdmin, editPopularProduct);

// Route to delete a specific popularProduct by ID
router.delete(
  "/popular_product/:id",
  verifyTokenAndAdmin,
  destroyPopularProduct
);

/* ************************************************************************* */

module.exports = router;
