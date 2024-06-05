// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseCategories = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const categories = await tables.Category.readAllCategories();

    // Respond with the items in JSON format
    response.status(200).json(categories);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const browseCategoriesByProduct = async (request, response, next) => {
  try {
    const { product_id } = request.params;

    const categoriesByProduct =
      await tables.Category.readAllCategoriesByProduct(product_id);

    if (categoriesByProduct == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(categoriesByProduct);
    }
  } catch (error) {
    next(error);
  }
};

// The R of BREAD - Read operation
const readCategory = async (request, response, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const category = await tables.Category.readCategory(request.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (category == null) {
      response.sendStatus(404);
    } else {
      response.json(category);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const readCategoryByProduct = async (request, response, next) => {
  try {
    const { category_id, product_id } = request.params;

    const categoryByProduct = await tables.Category.readCategoryByProduct(
      category_id,
      product_id
    );

    if (categoryByProduct == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(categoryByProduct);
    }
  } catch (error) {
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const editCategory = async (request, response, next) => {
  // Extract the item ID from the request parameters
  const { id } = request.params;

  // Extract the item data from the request body
  const category = request.body;

  try {
    // Update the item in the database
    await tables.Category.updateCategory(id, category);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const addCategory = async (request, response, next) => {
  // Extract the item data from the request body
  const category = request.body;

  try {
    // Insert the item into the database
    const insertId = await tables.Category.createCategory(category);

    // Respond with HTTP 201 (Created) and the ID of the new item
    response.status(201).json({
      insertId,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroyCategory = async (request, response, next) => {
  // Extract the item ID from the request parameters
  const { id } = request.params;

  try {
    // Delete the item from the database
    await tables.Category.deleteCategory(id);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browseCategories,
  browseCategoriesByProduct,
  readCategory,
  readCategoryByProduct,
  editCategory,
  addCategory,
  destroyCategory,
};
