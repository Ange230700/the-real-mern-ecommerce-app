const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  // verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../../../middlewares/authMiddleware");

// Import user-related actions
const {
  browse,
  read,
  edit,
  // add,
  destroy,
} = require("../../../controllers/userActions");

// Route to get a list of users
router.get("/", verifyTokenAndAdmin, browse);

// Route to get a specific user by ID
router.get("/:id", verifyTokenAndAdmin, read);

// Route to edit a specific user by ID
router.put("/:id", verifyTokenAndAuthorization, edit);

// // Route to add a new user
// router.post("/", add);

// Route to delete a specific user by ID
router.delete("/:id", verifyTokenAndAuthorization, destroy);

/* ************************************************************************* */

module.exports = router;
