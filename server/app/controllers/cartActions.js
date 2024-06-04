// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseCarts = async (request, response, next) => {
  try {
    // Fetch all carts from the database
    const carts = await tables.Cart.readAllCarts();

    // Respond with the carts in JSON format
    if (carts == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(carts);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const readCart = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    // Fetch a specific cart from the database based on the provided ID
    const cart = await tables.Cart.readCart(user_id);

    // If the cart is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the cart in JSON format
    if (cart == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(cart);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const editCart = async (request, response, next) => {
  // Extract the cart ID from the request parameters
  const { user_id } = request.params;

  // Extract the cart data from the request body
  const cart = request.body;

  try {
    // Update the cart in the database
    await tables.Cart.updateCart(user_id, cart);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const addCart = async (request, response, next) => {
  // Extract the cart data from the request body
  const cart = request.body;

  try {
    // Insert the cart into the database
    const insertId = await tables.Cart.createCart(cart);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted cart
    response.status(201).json({ insertId });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroyCart = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    // Delete the cart from the database
    await tables.Cart.deleteCart(user_id);

    // Respond with HTTP 204 (No Content)
    response.sendStatus(204);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browseCarts,
  readCart,
  editCart,
  addCart,
  destroyCart,
};
