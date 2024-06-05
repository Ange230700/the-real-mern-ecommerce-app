const CryptoJS = require("crypto-js");

// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseUsers = async (request, response, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.User.readAllUsers();

    // Respond with the users in JSON format
    if (!users) {
      response.status(404);
    } else {
      response.status(200).json(users);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const readUser = async (request, response, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.User.readUser(request.params.id);
    const { password: userPassword, ...userWithoutPassword } = user;

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (!user) {
      response.status(404);
    } else {
      response.json(userWithoutPassword);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const editUser = async (request, response, next) => {
  // Extract the user ID from the request parameters
  const { id } = request.params;
  const { password } = request.body;

  if (password) {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.APP_SECRET
    ).toString();

    request.body.password = encryptedPassword;
  }

  // Extract the user data from the request body
  const user = request.body;

  try {
    // Update the user in the database
    await tables.User.updateUser(id, user);

    // Respond with HTTP 200 (OK)
    response.status(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroyUser = async (request, response, next) => {
  try {
    const { id } = request.params;

    // Delete the user from the database
    await tables.User.deleteUser(id);

    // Respond with HTTP 204 (No Content)
    response.status(204);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browseUsers,
  readUser,
  editUser,
  destroyUser,
};
