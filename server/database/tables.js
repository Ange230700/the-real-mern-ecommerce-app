// Import the repository modules responsible for handling data operations on the tables
const ItemRepository = require("./models/ItemRepository");
const AuthRepository = require("./models/AuthRepository");
const UserRepository = require("./models/UserRepository");
const CartRepository = require("./models/CartRepository");
const OrderRepository = require("./models/OrderRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.item = new ItemRepository();
tables.user = new AuthRepository();
tables.user = new UserRepository();
tables.cart = new CartRepository();
tables.order = new OrderRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
