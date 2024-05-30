// Import access to database tables

// Import the crypto-js library
const CryptoJS = require("crypto-js");

// Import the JWT library
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

// Register a new user
const register = async (request, response) => {
  const { username, email, password } = request.body;

  // Encrypt the password
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.APP_SECRET
  ).toString();

  try {
    // Insert the user into the database
    const insertId = await tables.user.create({
      username,
      email,
      password: encryptedPassword,
    });

    response.status(201).json({
      insertId,
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
    });
  }
};

// Login a user
const login = async (request, response) => {
  const { email, password } = request.body;

  try {
    // Fetch the user from the database based on the provided email
    const user = await tables.user.findByEmail(email);

    if (user == null) {
      response.status(401).json({
        error: "Invalid email or password",
      });
      return;
    }

    // Decrypt the password
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.APP_SECRET
    );

    const OriginalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== password) {
      response.status(401).json({
        error: "Invalid email or password",
      });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.APP_SECRET,
      {
        expiresIn: "1h",
      }
    );

    response.json({
      token,
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
    });
  }
};

// Ready to export the controller functions
module.exports = {
  register,
  login,
};
