// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browsePurchases = async (request, response, next) => {
  try {
    // Fetch all purchases from the database
    const purchases = await tables.Purchase.readAllPurchases();

    // Respond with the purchases in JSON format
    if (purchases == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(purchases);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const readPurchase = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    // Fetch a specific purchase from the database based on the provided ID
    const purchase = await tables.Purchase.readPurchase(user_id);

    // If the purchase is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the purchase in JSON format
    if (purchase == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(purchase);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const editPurchase = async (request, response, next) => {
  // Extract the purchase ID from the request parameters
  const { user_id } = request.params;

  // Extract the purchase data from the request body
  const purchase = request.body;

  try {
    // Update the purchase in the database
    await tables.Purchase.updatePurchase(user_id, purchase);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const addPurchase = async (request, response, next) => {
  // Extract the purchase data from the request body
  const purchase = request.body;

  try {
    // Insert the purchase into the database
    const insertId = await tables.Purchase.createPurchase(purchase);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted purchase
    response.status(201).json({ insertId });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroyPurchase = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    // Delete the purchase from the database
    await tables.Purchase.deletePurchase(user_id);

    // Respond with HTTP 204 (No Content)
    response.sendStatus(204);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browsePurchases,
  readPurchase,
  editPurchase,
  addPurchase,
  destroyPurchase,
};
