// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseItems = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const items = await tables.Item.readAllItems();

    // Respond with the items in JSON format
    if (!items) {
      response.status(404).json({ message: "No items found" });
    } else {
      response.status(200).json(items);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const readItem = async (request, response, next) => {
  try {
    const { item_id } = request.params;

    if (!item_id) {
      response.status(400).json({ message: "Item ID is required" });
    }

    // Fetch a specific item from the database based on the provided ID
    const item = await tables.Item.readItem(item_id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (!item) {
      response.status(404).json({ message: "Item not found" });
    } else {
      response.status(200).json(item);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const editItem = async (request, response, next) => {
  try {
    // Extract the item ID and updated item data from the request body
    const { item_id } = request.params;

    if (!item_id) {
      response.status(400).json({ message: "Item ID is required" });
    }

    const item = request.body;

    // Update the item in the database
    const affectedRows = await tables.Item.updateItem(item_id, item);

    // If the item was not found, respond with HTTP 404 (Not Found)
    // If the item was updated successfully, respond with HTTP 200 (OK)
    if (!affectedRows) {
      response.status(404).json({ message: "Item not found" });
    } else {
      response.status(200).json({ message: "Item updated successfully" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const addItem = async (request, response, next) => {
  try {
    // Extract the item data from the request body
    const item = request.body;

    if (!item.title || !item.user_id) {
      response.status(400).json({ message: "Item data is incomplete" });
    }

    // Insert the item into the database
    const insertId = await tables.Item.createItem(item);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    if (!insertId) {
      response.status(400).json({ message: "Item could not be added" });
    } else {
      response
        .status(201)
        .json({ insertId, message: "Item added successfully" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroyItem = async (request, response, next) => {
  try {
    // Extract the item ID from the request parameters
    const { item_id } = request.params;

    if (!item_id) {
      response.status(400).json({ message: "Item ID is required" });
    }

    // Delete the item from the database
    const affectedRows = await tables.Item.deleteItem(item_id);

    // If the item was not found, respond with HTTP 404 (Not Found)
    // If the item was deleted successfully, respond with HTTP 200 (OK)
    if (!affectedRows) {
      response.status(404).json({ message: "Item not found" });
    } else {
      response.status(200).json({ message: "Item deleted successfully" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browseItems,
  readItem,
  editItem,
  addItem,
  destroyItem,
};
