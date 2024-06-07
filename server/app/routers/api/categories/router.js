const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { verifyTokenAndAdmin } = require("../../../middlewares/authMiddleware");

// Import category-related actions
const {
  browseCategories,
  browseCategoriesByProduct,
  readCategory,
  readCategoryByProduct,
  editCategory,
  addCategory,
  destroyCategory,
} = require("../../../controllers/categoryActions");

// Route to get a list of categories
router.get("/", browseCategories);
router.get("/product/:product_id", browseCategoriesByProduct);

// Route to get a specific category by ID
router.get("/category/:category_id", readCategory);
router.get("/category/:category_id/product/:product_id", readCategoryByProduct);

// Route to add a new category
router.post("/category", verifyTokenAndAdmin, addCategory);

// Route to edit a specific category by ID
router.put("/category/:category_id", verifyTokenAndAdmin, editCategory);

// Route to delete a specific category by ID
router.delete("/category/:category_id", verifyTokenAndAdmin, destroyCategory);

module.exports = router;
