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
router.get("/product/:product_id", readProduct);
router.get("/product/:product_id/category/:category_id", readProductByCategory);

// Route to add a new product
router.post("/product/user/:user_id", verifyTokenAndAdmin, addProduct);

// Route to edit a specific product by ID
router.put(
  "/product/:product_id/user/:user_id",
  verifyTokenAndAdmin,
  editProduct
);

// Route to delete a specific product by ID
router.delete(
  "/product/:product_id/user/:user_id",
  verifyTokenAndAdmin,
  destroyProduct
);

/* ************************************************************************* */

module.exports = router;
