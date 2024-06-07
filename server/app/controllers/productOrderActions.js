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
    const { product_id, order_id } = request.params;

    if (!product_id || !order_id) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const productOrderDuo = await tables.Product_order.readProductOrder(
      product_id,
      order_id
    );

    if (!productOrderDuo) {
      response.status(404).json({ message: "Product_order duo not found" });
    } else {
      response.status(200).json(productOrderDuo);
    }
  } catch (error) {
    next(error);
  }
};

const addProductOrder = async (request, response, next) => {
  try {
    const productOrderDuo = request.body;

    if (!productOrderDuo.product_id || !productOrderDuo.order_id) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const affectedRows =
      await tables.Product_order.createProductOrder(productOrderDuo);

    if (!affectedRows) {
      response.status(404).json({ message: "Product_order duo not found" });
    } else {
      response.status(201).json({
        affectedRows,
        message: "Product_order duo added",
      });
    }
  } catch (error) {
    next(error);
  }
};

const destroyProductOrder = async (request, response, next) => {
  try {
    const { product_id, order_id } = request.params;

    if (!product_id || !order_id) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

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
  addProductOrder,
  destroyProductOrder,
};
