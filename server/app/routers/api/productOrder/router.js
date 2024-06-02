const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import productOrder-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/productOrderActions");

// Route to get a list of productOrders
router.get("/", browse);

// Route to get a specific productOrder by ID
router.get("/:id", read);

// Route to add a new productOrder
router.post("/", add);

// Route to edit a specific productOrder by ID
router.put("/:id", edit);

// Route to delete a specific productOrder by ID
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
