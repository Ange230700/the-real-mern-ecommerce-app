const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { verifyTokenAndAdmin } = require("../../../middlewares/authMiddleware");

// Import sliderItem-related actions
const {
  browseSliderItems,
  readSliderItem,
  editSliderItem,
  addSliderItem,
  destroySliderItem,
} = require("../../../controllers/sliderItemActions");

// Route to get a list of sliderItems
router.get("/", browseSliderItems);

// Route to get a specific sliderItem by ID
router.get("/slider_item/:slider_item_id", readSliderItem);

// Route to add a new sliderItem
router.post("/slider_item", verifyTokenAndAdmin, addSliderItem);

// Route to edit a specific sliderItem by ID
router.put("/slider_item/:slider_item_id", verifyTokenAndAdmin, editSliderItem);

// Route to delete a specific sliderItem by ID
router.delete(
  "/slider_item/:slider_item_id",
  verifyTokenAndAdmin,
  destroySliderItem
);

module.exports = router;
