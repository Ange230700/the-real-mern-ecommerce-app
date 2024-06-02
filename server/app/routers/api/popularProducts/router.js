const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { verifyTokenAndAdmin } = require("../../../middlewares/authMiddleware");

// Import popularProduct-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/popularProductActions");

// Route to get a list of popularProducts
router.get("/", browse);

// Route to get a specific popularProduct by ID
router.get("/:id", read);

// Route to add a new popularProduct
router.post("/", verifyTokenAndAdmin, add);

// Route to edit a specific popularProduct by ID
router.put("/:id", verifyTokenAndAdmin, edit);

// Route to delete a specific popularProduct by ID
router.delete("/:id", verifyTokenAndAdmin, destroy);

/* ************************************************************************* */

module.exports = router;
