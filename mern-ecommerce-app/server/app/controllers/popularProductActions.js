const tables = require("../../database/tables");

const browsePopularProducts = async (request, response, next) => {
  try {
    const popular_products =
      await tables.Popular_product.readAllPopularProducts();

    if (!popular_products) {
      response.status(404).json({ message: "No popular products found" });
    } else {
      response.status(200).json(popular_products);
    }
  } catch (error) {
    next(error);
  }
};

const readPopularProduct = async (request, response, next) => {
  try {
    const { popular_product_id } = request.params;

    if (!popular_product_id) {
      response.status(400).json({ message: "Missing popular product ID" });
      return;
    }

    const popular_product =
      await tables.Popular_product.readPopularProduct(popular_product_id);

    if (!popular_product) {
      response.status(404).json({ message: "Popular product not found" });
    } else {
      response.status(200).json(popular_product);
    }
  } catch (error) {
    next(error);
  }
};

const editPopularProduct = async (request, response, next) => {
  try {
    const { popular_product_id } = request.params;

    if (!popular_product_id) {
      response.status(400).json({ message: "Missing popular product ID" });
      return;
    }

    const popular_product = request.body;

    const affectedRows = await tables.Popular_product.updatePopularProduct(
      popular_product_id,
      popular_product
    );

    if (!affectedRows) {
      response.status(404).json({ message: "Popular product not found" });
    } else {
      response.status(200).json({ message: "Popular product updated" });
    }
  } catch (error) {
    next(error);
  }
};

const addPopularProduct = async (request, response, next) => {
  try {
    const popular_product = request.body;

    if (
      !popular_product.title ||
      !popular_product.price ||
      !popular_product.image
    ) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const insertId =
      await tables.Popular_product.createPopularProduct(popular_product);

    if (!insertId) {
      response.status(404).json({ message: "Popular product not found" });
    } else {
      response.status(201).json({
        insertId,
        message: "Popular product added",
      });
    }
  } catch (error) {
    next(error);
  }
};

const destroyPopularProduct = async (request, response, next) => {
  try {
    const { popular_product_id } = request.params;

    if (!popular_product_id) {
      response.status(400).json({ message: "Missing popular product ID" });
      return;
    }

    const affectedRows =
      await tables.Popular_product.deletePopularProduct(popular_product_id);

    if (!affectedRows) {
      response.status(404).json({ message: "Popular product not found" });
    } else {
      response.status(200).json({ message: "Popular product deleted" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browsePopularProducts,
  readPopularProduct,
  editPopularProduct,
  addPopularProduct,
  destroyPopularProduct,
};
