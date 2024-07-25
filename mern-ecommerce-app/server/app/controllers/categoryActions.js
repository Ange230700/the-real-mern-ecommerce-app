const tables = require("../../database/tables");

const browseCategories = async (request, response, next) => {
  try {
    const categories = await tables.Category.readAllCategories();

    if (!categories) {
      response.status(404).json({ message: "No categories found" });
    } else {
      response.status(200).json(categories);
    }
  } catch (error) {
    next(error);
  }
};

const browseCategoriesByProduct = async (request, response, next) => {
  try {
    const { product_id } = request.params;

    if (!product_id) {
      response.status(400).json({ message: "Product ID is required" });
      return;
    }

    const categoriesByProduct =
      await tables.Category.readAllCategoriesByProduct(product_id);

    if (!categoriesByProduct) {
      response.status(404).json({ message: "No categories found" });
    } else {
      response.status(200).json(categoriesByProduct);
    }
  } catch (error) {
    next(error);
  }
};

const readCategory = async (request, response, next) => {
  try {
    const { category_id } = request.params;

    if (!category_id) {
      response.status(400).json({ message: "Category ID is required" });
      return;
    }

    const category = await tables.Category.readCategory(category_id);

    if (!category) {
      response.status(404).json({ message: "Category not found" });
    } else {
      response.json(category);
    }
  } catch (error) {
    next(error);
  }
};

const readCategoryByProduct = async (request, response, next) => {
  try {
    const { category_id, product_id } = request.params;

    if (!category_id || !product_id) {
      response
        .status(400)
        .json({ message: "Category ID and Product ID required" });
      return;
    }

    const categoryByProduct = await tables.Category.readCategoryByProduct(
      category_id,
      product_id
    );

    if (!categoryByProduct) {
      response.status(404).json({ message: "Category not found" });
    } else {
      response.status(200).json(categoryByProduct);
    }
  } catch (error) {
    next(error);
  }
};

const editCategory = async (request, response, next) => {
  try {
    const { category_id } = request.params;

    if (!category_id) {
      response.status(400).json({ message: "Category ID is required" });
      return;
    }

    const category = request.body;

    const affectedRows = await tables.Category.updateCategory(
      category_id,
      category
    );

    if (!affectedRows) {
      response.status(404).json({ message: "Category not found" });
    } else {
      response.status(200).json({ message: "Category updated" });
    }
  } catch (error) {
    next(error);
  }
};

const addCategory = async (request, response, next) => {
  try {
    const category = request.body;

    if (!category.image || !category.name) {
      response
        .status(400)
        .json({ message: "Category name and image are required" });
    }

    const insertId = await tables.Category.createCategory(category);

    if (!insertId) {
      response.status(404).json({ message: "Category not found" });
    } else {
      response.status(201).json({
        insertId,
        message: "Category added",
      });
    }
  } catch (error) {
    next(error);
  }
};

const destroyCategory = async (request, response, next) => {
  try {
    const { category_id } = request.params;

    if (!category_id) {
      response.status(400).json({ message: "Category ID is required" });
      return;
    }

    const affectedRows = await tables.Category.deleteCategory(category_id);

    if (!affectedRows) {
      response.status(404).json({ message: "Category not found" });
    } else {
      response.status(200).json({ message: "Category deleted" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseCategories,
  browseCategoriesByProduct,
  readCategory,
  readCategoryByProduct,
  editCategory,
  addCategory,
  destroyCategory,
};
