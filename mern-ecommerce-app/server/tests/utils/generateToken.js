const jwt = require("jsonwebtoken");

// Function to generate a JWT for testing
const generateToken = (user) =>
  jwt.sign(user, process.env.APP_SECRET, { expiresIn: "1h" });

module.exports = generateToken;
