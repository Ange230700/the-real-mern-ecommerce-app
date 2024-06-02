const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { verifyTokenAndAdmin } = require("../../../middlewares/authMiddleware");

// Import sliderItem-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/sliderItemActions");

// Route to get a list of sliderItems
router.get("/", browse);

// Route to get a specific sliderItem by ID
router.get("/:id", read);

// Route to add a new sliderItem
router.post("/", verifyTokenAndAdmin, add);

// Route to edit a specific sliderItem by ID
router.put("/:id", verifyTokenAndAdmin, edit);

// Route to delete a specific sliderItem by ID
router.delete("/:id", verifyTokenAndAdmin, destroy);

module.exports = router;
