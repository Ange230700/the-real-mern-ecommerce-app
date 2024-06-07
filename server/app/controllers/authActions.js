const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const tables = require("../../database/tables");

const register = async (request, response) => {
  try {
    const { username, email, password, is_admin } = request.body;

    if (!username || !email || !password) {
      response.status(400).json({
        error: "Make sure you provided all the required fields.",
      });
      return;
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.APP_SECRET
    ).toString();

    const insertId = await tables.Auth.createUser({
      username,
      email,
      password: encryptedPassword,
      is_admin,
    });

    if (!insertId) {
      response.status(400).json({ message: "User registration failed." });
    } else {
      response.status(201).json({
        insertId,
        message: "User registered successfully.",
      });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await tables.Auth.findUserByEmail(email);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    if (!user.email || !user.password) {
      return response.status(401).json({ error: "Invalid email or password" });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.APP_SECRET
    );

    const OriginalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== password) {
      return response.status(401).json({ error: "Invalid email or password" });
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    const token = jwt.sign(userWithoutPassword, process.env.APP_SECRET, {
      expiresIn: "1d",
    });

    return response.status(200).json({ ...userWithoutPassword, token });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
