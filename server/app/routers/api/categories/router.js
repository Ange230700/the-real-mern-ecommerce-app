const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { verifyTokenAndAdmin } = require("../../../middlewares/authMiddleware");

// Import category-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/categoryActions");

// Route to get a list of categories
router.get("/", browse);

// Route to get a specific category by ID
router.get("/:id", read);

// Route to add a new category
router.post("/", verifyTokenAndAdmin, add);

// Route to edit a specific category by ID
router.put("/:id", verifyTokenAndAdmin, edit);

// Route to delete a specific category by ID
router.delete("/:id", verifyTokenAndAdmin, destroy);

module.exports = router;
