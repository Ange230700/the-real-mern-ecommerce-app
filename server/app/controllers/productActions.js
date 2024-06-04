// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseProducts = async (request, response, next) => {
  try {
    // Fetch all products from the database
    const products = await tables.product.readAllProducts();

    // Respond with the products in JSON format
    if (products == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(products);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const browseProductsByCategory = async (request, response, next) => {
  try {
    const { categoryId } = request.params;

    const productsByCategory =
      await tables.product.readAllProductsByCategory(categoryId);

    response.status(200).json(productsByCategory);
  } catch (error) {
    next(error);
  }
};

// The R of BREAD - Read operation
const readProduct = async (request, response, next) => {
  try {
    const { id } = request.params;

    // Fetch a specific product from the database based on the provided ID
    const product = await tables.product.readProduct(id);

    // If the product is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the product in JSON format
    if (product == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(product);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// get productId and categoryId from request params
const readProductByCategory = async (request, response, next) => {
  try {
    const { productId, categoryId } = request.params;

    const productByCategory = await tables.product.readProductByCategory(
      productId,
      categoryId
    );

    if (productByCategory == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(productByCategory);
    }
  } catch (error) {
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const editProduct = async (request, response, next) => {
  // Extract the product ID from the request parameters
  const { id } = request.params;

  // Extract the product data from the request body
  const product = request.body;

  try {
    // Update the product in the database
    await tables.product.updateProduct(id, product);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const addProduct = async (request, response, next) => {
  // Extract the product data from the request body
  const product = request.body;

  try {
    // Insert the product into the database
    const id = await tables.product.createProduct(product);

    // Respond with the ID of the newly created product
    response.json({ id });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroyProduct = async (request, response, next) => {
  try {
    // Delete the product from the database
    await tables.product.deleteProduct(request.params.id);

    // Respond with HTTP 204 (No Content)
    response.sendStatus(204);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Export the functions to be used as middleware
module.exports = {
  browseProducts,
  browseProductsByCategory,
  readProduct,
  readProductByCategory,
  editProduct,
  addProduct,
  destroyProduct,
};
