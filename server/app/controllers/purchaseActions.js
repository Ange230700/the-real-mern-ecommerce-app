const tables = require("../../database/tables");

const browsePurchases = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    const purchases = await tables.Purchase.readAllPurchases(user_id);

    if (!purchases) {
      response.status(404).json({ message: "No purchases found" });
    } else {
      response.status(200).json(purchases);
    }
  } catch (error) {
    next(error);
  }
};

const readPurchase = async (request, response, next) => {
  try {
    const { id, user_id } = request.params;

    const purchase = await tables.Purchase.readPurchase(id, user_id);

    if (!purchase) {
      response.status(404).json({ message: "Purchase not found" });
    } else {
      response.status(200).json(purchase);
    }
  } catch (error) {
    next(error);
  }
};

const editPurchase = async (request, response, next) => {
  const { id, user_id } = request.params;

  const purchase = request.body;

  if (!purchase.user_id || !purchase.total) {
    response.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const affectedRows = await tables.Purchase.updatePurchase(
      id,
      user_id,
      purchase
    );

    if (!affectedRows) {
      response.status(404).json({ message: "Purchase not found" });
    } else {
      response.status(200).json({ message: "Purchase updated" });
    }
  } catch (error) {
    next(error);
  }
};

const addPurchase = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    const purchase = request.body;

    if (!purchase.user_id || !purchase.total) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const insertId = await tables.Purchase.createPurchase(user_id, purchase);

    if (!insertId) {
      response.status(404).json({ message: "Purchase not found" });
    } else {
      response.status(201).json({ insertId, message: "Purchase added" });
    }
  } catch (error) {
    next(error);
  }
};

const destroyPurchase = async (request, response, next) => {
  try {
    const { id, user_id } = request.params;

    const affectedRows = await tables.Purchase.deletePurchase(id, user_id);

    if (!affectedRows) {
      response.status(404).json({ message: "Purchase not found" });
    } else {
      response.status(204).json({ message: "Purchase deleted" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browsePurchases,
  readPurchase,
  editPurchase,
  addPurchase,
  destroyPurchase,
};
