const CryptoJS = require("crypto-js");
const tables = require("../../database/tables");
const { duration, createToken } = require("../middlewares/authMiddleware");

const register = async (request, response) => {
  try {
    const { username, email, password, is_admin } = request.body;

    if (!username || !email || !password) {
      return response.status(400).json({
        error: "Make sure you provided all the required fields.",
      });
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

    const token = createToken({ username, is_admin });

    response.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: duration,
    });

    return response.status(201).json({
      insertId,
      token,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    if (error.message === "Email already in use") {
      return response.status(400).json({ error: error.message });
    }
    return response.status(500).json({ error: error.message });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ error: "Invalid email or password" });
    }

    const user = await tables.Auth.findUserByEmail(email);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
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

    const token = createToken(userWithoutPassword);

    return response.status(200).json({ ...userWithoutPassword, token });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
