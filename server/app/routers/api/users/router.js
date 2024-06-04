const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../../../middlewares/authMiddleware");

// Import user-related actions
const {
  browseUsers,
  readUser,
  editUser,
  destroyUser,
} = require("../../../controllers/userActions");

// Route to get a list of users
router.get("/", verifyTokenAndAdmin, browseUsers);

// Route to get a specific user by ID
router.get("/user/:id", verifyTokenAndAdmin, readUser);

// Route to edit a specific user by ID
router.put("/user/:id", verifyTokenAndAuthorization, editUser);

// Route to delete a specific user by ID
router.delete("/user/:id", verifyTokenAndAuthorization, destroyUser);

/* ************************************************************************* */

module.exports = router;
