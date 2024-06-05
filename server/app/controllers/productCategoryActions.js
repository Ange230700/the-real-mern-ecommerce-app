// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseProductCategory = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const productCategoryDuos =
      await tables.Product_category.readAllProductCategory();

    // Respond with the items in JSON format
    response.status(200).json(productCategoryDuos);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const readProductCategory = async (request, response, next) => {
  try {
    const { product_id, category_id } = request.params;

    // Fetch a specific item from the database based on the provided ID
    const productCategory = await tables.Product_category.readProductCategory(
      product_id,
      category_id
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
const editProductCategory = async (request, response, next) => {
  try {
    // Extract the item ID from the request parameters
    const { product_id, category_id } = request.params;

    // Extract the item data from the request body
    const productCategory = request.body;

    // Update the item in the database
    await tables.Product_category.updateProductCategory(
      product_id,
      category_id,
      productCategory
    );

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const addProductCategory = async (request, response, next) => {
  try {
    // Extract the item data from the request body
    const productCategory = request.body;

    // Insert the item into the database
    const insertId =
      await tables.Product_category.createProductCategory(productCategory);

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
const destroyProductCategory = async (request, response, next) => {
  try {
    // Extract the item ID from the request parameters
    const { product_id, category_id } = request.params;

    // Delete the item from the database
    await tables.Product_category.deleteProductCategory(
      product_id,
      category_id
    );

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browseProductCategory,
  readProductCategory,
  editProductCategory,
  addProductCategory,
  destroyProductCategory,
};
