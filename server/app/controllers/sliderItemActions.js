// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const sliderItems = await tables.sliderItem.readAll();

    // Respond with the items in JSON format
    response.status(200).json(sliderItems);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const read = async (request, response, next) => {
  try {
    // Fetch the item from the database
    const sliderItem = await tables.sliderItem.read(request.params.id);

    // Respond with the item in JSON format
    response.status(200).json(sliderItem);
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
  const sliderItem = request.body;

  try {
    // Update the item in the database
    await tables.sliderItem.update(id, sliderItem);

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
  const sliderItem = request.body;

  try {
    // Insert the item into the database
    const insertId = await tables.sliderItem.create(sliderItem);

    // Respond with the item ID in JSON format
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
  // Extract the item ID from the request parameters
  const { id } = request.params;

  try {
    // Delete the item from the database
    await tables.sliderItem.delete(id);

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
