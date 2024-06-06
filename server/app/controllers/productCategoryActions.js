const tables = require("../../database/tables");

const browseProductCategory = async (request, response, next) => {
  try {
    const productCategoryDuos =
      await tables.Product_category.readAllProductCategory();

    if (!productCategoryDuos) {
      response.status(404).json({ message: "No product_category duo found" });
    } else {
      response.status(200).json(productCategoryDuos);
    }
  } catch (error) {
    next(error);
  }
};

const readProductCategory = async (request, response, next) => {
  try {
    const { product_id, category_id } = request.params;

    const productCategoryDuo =
      await tables.Product_category.readProductCategory(
        product_id,
        category_id
      );

    if (!productCategoryDuo) {
      response.status(404);
    } else {
      response.json(productCategoryDuo);
    }
  } catch (error) {
    next(error);
  }
};

const editProductCategory = async (request, response, next) => {
  try {
    const { product_id, category_id } = request.params;

    const productCategory = request.body;

    if (!productCategory.product_id || !productCategory.category_id) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const affectedRows = await tables.Product_category.updateProductCategory(
      product_id,
      category_id,
      productCategory
    );

    if (!affectedRows) {
      response.status(404).json({ message: "Product_category duo not found" });
    } else {
      response.status(200).json({ message: "Product_category duo updated" });
    }
  } catch (error) {
    next(error);
  }
};

const addProductCategory = async (request, response, next) => {
  try {
    const productCategoryDuo = request.body;

    if (!productCategoryDuo.product_id || !productCategoryDuo.category_id) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const insertId =
      await tables.Product_category.createProductCategory(productCategoryDuo);

    if (!insertId) {
      response.status(404).json({ message: "Product_category duo not found" });
    } else {
      response.status(201).json({
        insertId,
        message: "Product_category duo added",
      });
    }
  } catch (error) {
    next(error);
  }
};

const destroyProductCategory = async (request, response, next) => {
  try {
    const { product_id, category_id } = request.params;

    const affectedRows = await tables.Product_category.deleteProductCategory(
      product_id,
      category_id
    );

    if (!affectedRows) {
      response.status(404).json({ message: "Product_category duo not found" });
    } else {
      response.status(200).json({ message: "Product_category duo deleted" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseProductCategory,
  readProductCategory,
  editProductCategory,
  addProductCategory,
  destroyProductCategory,
};
