// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseUsers = async (request, response, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.User.readAllUsers();

    // Respond with the users in JSON format
    if (!users) {
      response.status(404).json({ message: "No users found" });
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
    const { user_id } = request.params;

    if (!user_id) {
      response.status(400).json({ message: "User ID is required" });
    }

    // Fetch a specific user from the database based on the provided ID
    const user = await tables.User.readUser(user_id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (!user) {
      response.status(404).json({ message: "User not found" });
    } else {
      response.status(200).json(user);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const editUser = async (request, response, next) => {
  try {
    // Extract the user ID and updated user data from the request body
    const { user_id } = request.params;

    if (!user_id) {
      response.status(400).json({ message: "User ID is required" });
    }

    const user = request.body;

    // Update the user in the database
    const affectedRows = await tables.User.updateUser(user_id, user);

    // Respond with the number of affected rows
    if (affectedRows === 0) {
      response.status(404).json({ message: "User not found" });
    } else {
      response.status(200).json({ message: "User updated successfully" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add operation
const addUser = async (request, response, next) => {
  try {
    // Extract the user data from the request body
    const user = request.body;

    // Add the new user to the database
    const user_id = await tables.User.createUser(user);

    // Respond with the ID of the newly added user
    response.status(201).json({ user_id });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroyUser = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    if (!user_id) {
      response.status(400).json({ message: "User ID is required" });
    }

    // Delete the user from the database
    const affectedRows = await tables.User.deleteUser(user_id);

    // Respond with the number of affected rows
    if (affectedRows === 0) {
      response.status(404).json({ message: "User not found" });
    } else {
      response.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

module.exports = {
  browseUsers,
  readUser,
  editUser,
  addUser,
  destroyUser,
};
