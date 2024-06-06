const CryptoJS = require("crypto-js");

const tables = require("../../database/tables");

const browseUsers = async (request, response, next) => {
  try {
    const users = await tables.User.readAllUsers();

    if (!users) {
      response.status(404).json({ message: "No users found" });
    } else {
      response.status(200).json(users);
    }
  } catch (error) {
    next(error);
  }
};

const readUser = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await tables.User.readUser(id);

    const { password: userPassword, ...userWithoutPassword } = user;

    if (!user) {
      response.status(404).json({ message: "User not found" });
    } else {
      response.json(...userWithoutPassword);
    }
  } catch (error) {
    next(error);
  }
};

const editUser = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { password } = request.body;

    if (password) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.APP_SECRET
      ).toString();

      request.body.password = encryptedPassword;
    }

    const user = request.body;

    if (!user.username || !user.email || !user.password) {
      response.status(400).json({ message: "All fields are required" });
    }

    const affectedRows = await tables.User.updateUser(id, user);

    if (!affectedRows) {
      response.status(404).json({ message: "User not found" });
    } else {
      response.status(200).json({ message: "User updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const destroyUser = async (request, response, next) => {
  try {
    const { id } = request.params;

    const affectedRows = await tables.User.deleteUser(id);

    if (!affectedRows) {
      response.status(404).json({ message: "User not found" });
    } else {
      response.status(204).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseUsers,
  readUser,
  editUser,
  destroyUser,
};
