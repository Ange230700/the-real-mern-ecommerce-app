const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browseItems,
  readItem,
  editItem,
  addItem,
  destroyItem,
} = require("../../../controllers/itemActions");

// Route to get a list of items
router.get("/", browseItems);

// Route to get a specific item by ID
router.get("/item/:item_id", readItem);

// Route to edit an item by ID
router.put("/item/:item_id", editItem);

// Route to add a new item
router.post("/item/", addItem);

// Route to delete an item by ID
router.delete("/item/:item_id", destroyItem);

/* ************************************************************************* */

module.exports = router;
