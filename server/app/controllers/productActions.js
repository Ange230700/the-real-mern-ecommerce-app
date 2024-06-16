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

    if (!category_id) {
      response.status(400).json({ message: "Category ID is required" });
      return;
    }

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
    const { product_id } = request.params;

    if (!product_id) {
      response.status(400).json({ message: "Product ID is required" });
      return;
    }

    const product = await tables.Product.readProduct(product_id);

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

    if (!product_id || !category_id) {
      response
        .status(400)
        .json({ message: "Product ID and Category ID required" });
      return;
    }

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
    const { product_id } = request.params;

    if (!product_id) {
      response.status(400).json({ message: "Product ID is required" });
      return;
    }

    const product = request.body;

    const affectedRows = await tables.Product.updateProduct(
      product_id,
      product
    );

    if (!affectedRows) {
      response.status(404).json({ message: "Product not found" });
    } else {
      response.status(200).json({ message: "Product updated" });
    }
  } catch (error) {
    next(error);
  }
};

const addProduct = async (request, response, next) => {
  try {
    const product = request.body;

    if (
      !product.title ||
      !product.price ||
      !product.image_url ||
      !product.product_adjective ||
      !product.product_material ||
      !product.product_description
    ) {
      response.status(400).json({ message: "All fields are required" });
    }

    const insertId = await tables.Product.createProduct(product);

    if (!insertId) {
      response.status(404).json({ message: "Product not added" });
    } else {
      response.status(201).json({
        insertId,
        message: "Product added",
      });
    }
  } catch (error) {
    next(error);
  }
};

const destroyProduct = async (request, response, next) => {
  try {
    const { product_id } = request.params;

    if (!product_id) {
      response.status(400).json({ message: "Product ID is required" });
      return;
    }

    const affectedRows = await tables.Product.deleteProduct(product_id);

    if (!affectedRows) {
      response.status(404).json({ message: "Product not found" });
    } else {
      response.status(200).json({ message: "Product deleted" });
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
