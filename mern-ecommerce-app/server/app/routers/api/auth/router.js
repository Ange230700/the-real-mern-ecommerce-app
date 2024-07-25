const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// § Import auth-related actions
const { register, login } = require("../../../controllers/authActions");

// % Route to register a new user
router.post("/register", register);

// % Route to log in a user
router.post("/login", login);

/* ************************************************************************* */

module.exports = router;
