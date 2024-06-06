const tables = require("../../database/tables");

const browseProductOrder = async (request, response, next) => {
  try {
    const productOrderDuos = await tables.Product_order.readAllProductOrder();

    if (!productOrderDuos) {
      response.status(404).json({ message: "No product_order duo found" });
    } else {
      response.status(200).json(productOrderDuos);
    }
  } catch (error) {
    next(error);
  }
};

const readProductOrder = async (request, response, next) => {
  try {
    const { id } = request.params;

    const productOrderDuo = await tables.Product_order.readProductOrder(id);

    if (!productOrderDuo) {
      response.status(404).json({ message: "Product_order duo not found" });
    } else {
      response.status(200).json(productOrderDuo);
    }
  } catch (error) {
    next(error);
  }
};

const editProductOrder = async (request, response, next) => {
  const { product_id, order_id } = request.params;

  const productOrderDuo = request.body;

  try {
    const affectedRows = await tables.Product_order.updateProductOrder(
      product_id,
      order_id,
      productOrderDuo
    );

    if (!affectedRows) {
      response.status(404).json({ message: "Product_order duo not found" });
    } else {
      response.status(200).json({ message: "Product_order duo updated" });
    }
  } catch (error) {
    next(error);
  }
};

const addProductOrder = async (request, response, next) => {
  try {
    const productCategory = request.body;

    if (!productCategory.product_id || !productCategory.order_id) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const insertId =
      await tables.Product_order.createProductOrder(productCategory);

    if (!insertId) {
      response.status(404).json({ message: "Product_order duo not found" });
    } else {
      response.status(201).json({
        insertId,
        message: "Product_order duo added",
      });
    }
  } catch (error) {
    next(error);
  }
};

const destroyProductOrder = async (request, response, next) => {
  const { product_id, order_id } = request.params;

  try {
    const affectedRows = await tables.Product_order.deleteProductOrder(
      product_id,
      order_id
    );

    if (!affectedRows) {
      response.status(404).json({ message: "Product_order duo not found" });
    } else {
      response.status(200).json({ message: "Product_order duo deleted" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseProductOrder,
  readProductOrder,
  editProductOrder,
  addProductOrder,
  destroyProductOrder,
};
