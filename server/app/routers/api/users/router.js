const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  browseUsers,
  readUser,
  editUser,
  addUser,
  destroyUser,
} = require("../../../controllers/userActions");

// Route to get a list of users
router.get("/", browseUsers);

// Route to get a specific user by ID
router.get("/user/:user_id", readUser);

// Route to edit a user by ID
router.put("/user/:user_id", editUser);

// Route to add a new user
router.post("/user/", addUser);

// Route to delete a user by ID
router.delete("/user/:user_id", destroyUser);

/* ************************************************************************* */

module.exports = router;
