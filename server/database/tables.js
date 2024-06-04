// Import the repository modules responsible for handling data operations on the tables
// const ItemRepository = require("./models/ItemRepository");

const AuthRepository = require("./models/AuthRepository");
const UserRepository = require("./models/UserRepository");
const CartRepository = require("./models/CartRepository");
const ProductRepository = require("./models/ProductRepository");
const PurchaseRepository = require("./models/PurchaseRepository");
const SliderItemRepository = require("./models/SliderItemRepository");
const CategoryRepository = require("./models/CategoryRepository");
const PopularProductRepository = require("./models/PopularProductRepository");
const ProductCategoryRepository = require("./models/ProductCategoryRepository");
const ProductOrderRepository = require("./models/ProductOrderRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
// tables.item = new ItemRepository();

tables.User = new AuthRepository();
tables.User = new UserRepository();
tables.Cart = new CartRepository();
tables.purchase = new PurchaseRepository();
tables.Product = new ProductRepository();
tables.sliderItem = new SliderItemRepository();
tables.category = new CategoryRepository();
tables.popularProduct = new PopularProductRepository();
tables.product_category = new ProductCategoryRepository();
tables.product_order = new ProductOrderRepository();

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
