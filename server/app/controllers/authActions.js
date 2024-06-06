const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const tables = require("../../database/tables");

const register = async (request, response) => {
  try {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      response.status(400).json({
        error: "Make sure you provided a username, an email, and a password.",
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
    });

    if (!insertId) {
      response.status(400).json({ message: "User registration failed." });
    } else {
      response.status(201).json({ message: "User registered successfully." });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await tables.Auth.findUserByEmail(email);

    if (!user.email || !user.password) {
      response.status(401).json({ error: "Invalid email or password" });

      return;
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.APP_SECRET
    );

    const OriginalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== password) {
      response.status(401).json({ error: "Invalid email or password" });

      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        is_admin: user.is_admin,
      },
      process.env.APP_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { password: userPassword, ...userWithoutPassword } = user;

    response.status(200).json({ ...userWithoutPassword, token });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
