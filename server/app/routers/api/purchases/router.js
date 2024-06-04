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
  browsePurchases,
  readPurchase,
  editPurchase,
  addPurchase,
  destroyPurchase,
} = require("../../../controllers/purchaseActions");

// Route to get a list of orders
router.get("/admin", verifyTokenAndAdmin, browsePurchases);

// Route to get a specific order by ID
router.get("/order/user/:user_id", verifyTokenAndAuthorization, readPurchase);

// Route to edit a specific order by ID
router.put("/order/user/:user_id", verifyTokenAndAdmin, editPurchase);

// Route to add a new order
router.post("/order/user/", verifyToken, addPurchase);

// Route to delete a specific order by ID
router.delete("/order/user/:user_id", verifyTokenAndAdmin, destroyPurchase);

/* ************************************************************************* */

module.exports = router;
