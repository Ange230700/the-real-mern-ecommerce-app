const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { verifyTokenAndAdmin } = require("../../../middlewares/authMiddleware");

// Import product-related actions
const {
  browseProducts,
  browseProductsByCategory,
  readProduct,
  readProductByCategory,
  addProduct,
  editProduct,
  destroyProduct,
} = require("../../../controllers/productActions");

// Route to get a list of products
router.get("/", browseProducts);
router.get("/category/:category_id", browseProductsByCategory);

// Route to get a specific product by product ID and/or category ID
router.get("/product/:id", readProduct);
router.get("/product/:product_id/category/:category_id", readProductByCategory);

// Route to add a new product
router.post("/product", verifyTokenAndAdmin, addProduct);

// Route to edit a specific product by ID
router.put("/product/:id", verifyTokenAndAdmin, editProduct);

// Route to delete a specific product by ID
router.delete("/product/:id", verifyTokenAndAdmin, destroyProduct);

/* ************************************************************************* */

module.exports = router;
