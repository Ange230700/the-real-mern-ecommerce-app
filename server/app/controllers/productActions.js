const tables = require("../../database/tables");

const browseProducts = async (request, response, next) => {
  try {
    const products = await tables.Product.readAllProducts();

    if (!products) {
      response.status(404).json({ message: "Products not found" });
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

    if (!productsByCategory) {
      response.status(404).json({ message: "Products not found" });
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

    if (!product) {
      response.status(404).json({ message: "Product not found" });
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

    if (!productByCategory) {
      response.status(404).json({ message: "Product not found" });
    } else {
      response.status(200).json(productByCategory);
    }
  } catch (error) {
    next(error);
  }
};

const editProduct = async (request, response, next) => {
  try {
    const { id } = request.params;

    const product = request.body;

    const affectedRows = await tables.Product.updateProduct(id, product);

    if (!affectedRows) {
      response.status(404).json({ message: "Product not found" });
    } else {
      response.status(200);
    }
  } catch (error) {
    next(error);
  }
};

const addProduct = async (request, response, next) => {
  try {
    const product = request.body;

    const insertId = await tables.Product.createProduct(product);

    if (!insertId) {
      response.status(404).json({ message: "Product not added" });
    } else {
      response.status(200).json({ insertId, message: "Product added" });
    }
  } catch (error) {
    next(error);
  }
};

const destroyProduct = async (request, response, next) => {
  try {
    const { id } = request.params;

    const affectedRows = await tables.Product.deleteProduct(id);

    if (!affectedRows) {
      response.status(404).json({ message: "Product not found" });
    } else {
      response.status(204).json({ message: "Product deleted" });
    }
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
