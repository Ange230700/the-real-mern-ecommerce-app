const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { verifyTokenAndAdmin } = require("../../../middlewares/authMiddleware");

// Import productCategory-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/productCategoryActions");

// Route to get a list of productCategories
router.get("/", browse);

// Route to get a specific productCategory by ID
router.get("/:id", read);

// Route to add a new productCategory
router.post("/", verifyTokenAndAdmin, add);

// Route to edit a specific productCategory by ID
router.put("/:id", verifyTokenAndAdmin, edit);

// Route to delete a specific productCategory by ID
router.delete("/:id", verifyTokenAndAdmin, destroy);

/* ************************************************************************* */

module.exports = router;
