// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseProductOrder = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const productCategories = await tables.Product_order.readAllProductOrder();

    // Respond with the items in JSON format
    response.status(200).json(productCategories);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const readProductOrder = async (request, response, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const productCategory = await tables.Product_order.readProductOrder(
      request.params.id
    );

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (productCategory == null) {
      response.sendStatus(404);
    } else {
      response.json(productCategory);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const editProductOrder = async (request, response, next) => {
  // Extract the item ID from the request parameters
  const { id } = request.params;

  // Extract the item data from the request body
  const productCategory = request.body;

  try {
    // Update the item in the database
    await tables.Product_order.updateProductOrder(id, productCategory);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const addProductOrder = async (request, response, next) => {
  // Extract the item data from the request body
  const productCategory = request.body;

  try {
    // Insert the item into the database
    const insertId =
      await tables.Product_order.createProductOrder(productCategory);

    // Respond with HTTP 201 (Created)
    response.status(201).json({
      insertId,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroyProductOrder = async (request, response, next) => {
  // Extract the item ID from the request parameters
  const { id } = request.params;

  try {
    // Delete the item from the database
    await tables.Product_order.deleteProductOrder(id);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

module.exports = {
  browseProductOrder,
  readProductOrder,
  editProductOrder,
  addProductOrder,
  destroyProductOrder,
};
