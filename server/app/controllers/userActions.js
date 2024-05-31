const CryptoJS = require("crypto-js");

// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const users = await tables.user.readAll();

    // Respond with the items in JSON format
    response.status(200).json(users);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const read = async (request, response, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.user.read(request.params.id);
    const { password: userPassword, ...userWithoutPassword } = user;

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      response.sendStatus(404);
    } else {
      response.json(userWithoutPassword);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (request, response, next) => {
  // Extract the item ID from the request parameters
  const { id } = request.params;

  if (request.body.password) {
    const { password } = request.body;

    if (password) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.APP_SECRET
      ).toString();

      request.body.password = encryptedPassword;
    }
  }

  // Extract the item data from the request body
  const user = request.body;

  try {
    // Update the item in the database
    await tables.user.update(id, user);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (request, response, next) => {
  try {
    // Delete the item from the database
    await tables.user.delete(request.params.id);

    // Respond with HTTP 204 (No Content)
    response.sendStatus(204);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  destroy,
};
