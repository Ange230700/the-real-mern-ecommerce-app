const tables = require("../../database/tables");

const browseProducts = async (request, response, next) => {
  try {
    const products = await tables.Product.readAllProducts();

    if (products == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(products);
    }
  } catch (error) {
    next(error);
  }
};

const browseProductsByCategory = async (request, response, next) => {
  try {
    const { category_id } = request.params;

    const productsByCategory =
      await tables.Product.readAllProductsByCategory(category_id);

    if (productsByCategory == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(productsByCategory);
    }
  } catch (error) {
    next(error);
  }
};

const readProduct = async (request, response, next) => {
  try {
    const { id } = request.params;

    const product = await tables.Product.readProduct(id);

    if (product == null) {
      response.sendStatus(404);
    } else {
      response.status(200).json(product);
    }
  } catch (error) {
    next(error);
  }
};

const readProductByCategory = async (request, response, next) => {
  try {
    const { product_id, category_id } = request.params;

    const productByCategory = await tables.Product.readProductByCategory(
      product_id,
      category_id
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

const editProduct = async (request, response, next) => {
  const { id } = request.params;

  const product = request.body;

  try {
    await tables.Product.updateProduct(id, product);

    response.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (request, response, next) => {
  const product = request.body;

  try {
    const id = await tables.Product.createProduct(product);

    response.json({ id });
  } catch (error) {
    next(error);
  }
};

const destroyProduct = async (request, response, next) => {
  try {
    await tables.Product.deleteProduct(request.params.id);

    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseProducts,
  browseProductsByCategory,
  readProduct,
  readProductByCategory,
  editProduct,
  addProduct,
  destroyProduct,
};
