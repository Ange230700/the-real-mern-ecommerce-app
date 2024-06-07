const tables = require("../../database/tables");

const browseCarts = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    if (!user_id) {
      response.status(400).json({ message: "User ID is required" });

      return;
    }

    const carts = await tables.Cart.readAllCarts(user_id);

    if (!carts) {
      response.status(404).json({ message: "Carts not found" });
    } else {
      response.status(200).json(carts);
    }
  } catch (error) {
    next(error);
  }
};

const readCart = async (request, response, next) => {
  try {
    const { cart_id, user_id } = request.params;

    if (!user_id) {
      response.status(400).json({ message: "User ID is required" });

      return;
    }

    const cart = await tables.Cart.readCart(cart_id, user_id);

    if (!cart) {
      response.status(404).json({ message: "Cart not found" });
    } else {
      response.status(200).json(cart);
    }
  } catch (error) {
    next(error);
  }
};

// const editCart = async (request, response, next) => {
//   try {
//     const { cart_id, user_id } = request.params;
//     const cart = request.body;

//     if (!user_id) {
//       response.status(400).json({ message: "User ID is required" });

//       return;
//     }

//     const affectedRows = await tables.Cart.updateCart(cart_id, user_id, cart);

//     if (!affectedRows) {
//       response.status(404).json({ message: "Cart not updated" });
//     } else {
//       response.status(200).json({ message: "Cart updated" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

const addCart = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const cart = request.body;

    if (!user_id) {
      response.status(400).json({ message: "User ID is required" });

      return;
    }

    const insertId = await tables.Cart.createCart(user_id, cart);

    if (!insertId) {
      response.status(404).json({ message: "Cart not created" });
    } else {
      response.status(201).json({ message: "Cart created" });
    }
  } catch (error) {
    next(error);
  }
};

const destroyCart = async (request, response, next) => {
  try {
    const { cart_id, user_id } = request.params;

    const affectedRows = await tables.Cart.deleteCart(cart_id, user_id);

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
  readCart,
  // editCart,
  addCart,
  destroyCart,
};
