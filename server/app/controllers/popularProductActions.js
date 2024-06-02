// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const popularProducts = await tables.popularProduct.readAll();

    // Respond with the items in JSON format
    response.status(200).json(popularProducts);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const read = async (request, response, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const popularProduct = await tables.popularProduct.read(request.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (popularProduct == null) {
      response.sendStatus(404);
    } else {
      response.json(popularProduct);
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

  // Extract the item data from the request body
  const popularProduct = request.body;

  try {
    // Update the item in the database
    await tables.popularProduct.update(id, popularProduct);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (request, response, next) => {
  // Extract the item data from the request body
  const popularProduct = request.body;

  try {
    // Insert the item into the database
    const insertId = await tables.popularProduct.create(popularProduct);

    // Respond with the ID of the inserted item
    response.status(201).json({
      insertId,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroy = async (request, response, next) => {
  try {
    // Delete a specific item from the database based on the provided ID
    await tables.popularProduct.delete(request.params.id);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
