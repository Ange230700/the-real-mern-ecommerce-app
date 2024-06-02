const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const ProductSeeder = require("./ProductSeeder");
const CategorySeeder = require("./CategorySeeder");

class ProductCategorySeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "product_category",
      truncate: true,
      dependencies: [ProductSeeder, CategorySeeder],
    });
  }

  // $ The run method - Populate the 'product_category' table with fake data

  run() {
    // Generate and insert fake data into the 'product_category' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake product_category data
      const fakeProductCategory = {
        productId: this.faker.number.int({ min: 1, max: 10 }), // Generate a random product ID
        categoryId: this.faker.number.int({ min: 1, max: 10 }), // Generate a random category ID
      };

      this.insert(fakeProductCategory);
    }
  }
}

module.exports = ProductCategorySeeder;
