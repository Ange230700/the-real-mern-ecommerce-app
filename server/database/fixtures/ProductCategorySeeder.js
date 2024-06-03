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
  async run() {
    const uniqueProductCategoryDuos = new Set();

    // getting the length of the product array using the count method from the AbstractSeeder class
    const lengthOfProductArray = await new ProductSeeder().count();

    // getting the length of the category array using the count method from the AbstractSeeder class
    const lengthOfCategoryArray = await new CategorySeeder().count();

    const maxOfProductCategoryDuos =
      lengthOfProductArray * lengthOfCategoryArray;

    // Generate and insert fake data into the 'product_category' table
    for (let i = 0; i < maxOfProductCategoryDuos; i += 1) {
      let productCategoryKey;

      do {
        // Generate random product and category IDs
        const productId = this.faker.number.int({
          min: 1,
          max: lengthOfProductArray,
        });
        const categoryId = this.faker.number.int({
          min: 1,
          max: lengthOfCategoryArray,
        });

        // Create a unique key for the Set
        productCategoryKey = `${productId}-${categoryId}`;
      } while (uniqueProductCategoryDuos.has(productCategoryKey));

      // Add the unique duo to the Set
      uniqueProductCategoryDuos.add(productCategoryKey);

      const [productId, categoryId] = productCategoryKey.split("-").map(Number);

      const fakeProductCategory = {
        productId,
        categoryId,
      };

      this.insert(fakeProductCategory);
    }
  }
}

module.exports = ProductCategorySeeder;
