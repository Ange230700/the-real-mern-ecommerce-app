const tables = require("../../database/tables");

const browseCarts = async (request, response, next) => {
  try {
    const { id } = request.user;

    if (!id) {
      response.status(400).json({ message: "User ID is required" });

      return;
    }

    const carts = await tables.Cart.readAllCarts();

    if (!carts) {
      response.status(404).json({ message: "Carts not found" });
    } else {
      response.status(200).json(carts);
    }
  } catch (error) {
    next(error);
  }
};

const readCartAsUser = async (request, response, next) => {
  try {
    const { id, user_id } = request.params;

    const cart = await tables.Cart.readCartAsUser(id, user_id);

    if (!cart) {
      response.status(404).json({ message: "Cart not found" });
    } else {
      response.status(200).json(cart);
    }
  } catch (error) {
    next(error);
  }
};

const editCartAsUser = async (request, response, next) => {
  try {
    const { id, user_id } = request.params;

    const cart = request.body;

    if (!cart.user_id) {
      response.status(400).json({ message: "User ID is required" });
    }

    const affectedRows = await tables.Cart.updateCartAsUser(id, user_id, cart);

    if (!affectedRows) {
      response.status(404).json({ message: "Cart not updated" });
    } else {
      response.status(200).json({ message: "Cart updated" });
    }
  } catch (error) {
    next(error);
  }
};

const addCartAsUser = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    const cart = request.body;

    if (!cart.user_id) {
      response.status(400).json({ message: "User ID is required" });
    }

    const insertId = await tables.Cart.createCartAsUser(user_id, cart);

    if (!insertId) {
      response.status(404).json({ message: "Cart not created" });
    } else {
      response.status(201).json({ message: "Cart created" });
    }
  } catch (error) {
    next(error);
  }
};

const destroyCartAsUser = async (request, response, next) => {
  try {
    const { id, user_id } = request.params;

    const affectedRows = await tables.Cart.deleteCartAsUser(id, user_id);

    if (!affectedRows) {
      response.status(404).json({ message: "Cart not deleted" });
    } else {
      response.status(200).json({ message: "Cart deleted" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseCarts,
  readCartAsUser,
  editCartAsUser,
  addCartAsUser,
  destroyCartAsUser,
};
