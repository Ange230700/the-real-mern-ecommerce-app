const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { verifyTokenAndAdmin } = require("../../../middlewares/authMiddleware");

// Import productCategory-related actions
const {
  browseProductCategory,
  readProductCategory,
  editProductCategory,
  addProductCategory,
  destroyProductCategory,
} = require("../../../controllers/productCategoryActions");

// Route to get a list of productCategories
router.get("/", browseProductCategory);

// Route to get a specific productCategory by ID
router.get("/product/:product_id/category/:category_id", readProductCategory);

// Route to add a new productCategory
router.post("/", verifyTokenAndAdmin, addProductCategory);

// Route to edit a specific productCategory by ID
router.put(
  "/product/:product_id/category/:category_id",
  verifyTokenAndAdmin,
  editProductCategory
);

// Route to delete a specific productCategory by ID
router.delete(
  "/product/:product_id/category/:category_id",
  verifyTokenAndAdmin,
  destroyProductCategory
);

/* ************************************************************************* */

module.exports = router;
