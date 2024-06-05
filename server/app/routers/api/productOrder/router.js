const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import productOrder-related actions
const {
  browseProductOrder,
  readProductOrder,
  addProductOrder,
  editProductOrder,
  destroyProductOrder,
} = require("../../../controllers/productOrderActions");

// Route to get a list of productOrders
router.get("/", browseProductOrder);

// Route to get a specific productOrder by ID
router.get("/product/:product_id/order/:order_id", readProductOrder);

// Route to add a new productOrder
router.post("/", addProductOrder);

// Route to edit a specific productOrder by ID
router.put("/product/:product_id/order/:order_id", editProductOrder);

// Route to delete a specific productOrder by ID
router.delete("/product/:product_id/order/:order_id", destroyProductOrder);

/* ************************************************************************* */

module.exports = router;
