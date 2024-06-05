const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const ProductSeeder = require("./ProductSeeder");
const PurchaseSeeder = require("./PurchaseSeeder");

class ProductOrderSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "Product_order",
      truncate: true,
      dependencies: [ProductSeeder, PurchaseSeeder],
    });
  }

  // $ The run method - Populate the 'product_order' table with fake data

  async run() {
    const uniqueProductOrderDuos = new Set();

    // getting the length of the product array using the count method from the AbstractSeeder class
    const lengthOfProductArray = await new ProductSeeder().count();

    // getting the length of the order array using the count method from the AbstractSeeder class
    const lengthOfOrderArray = await new PurchaseSeeder().count();

    const maxOfProductCategoryDuos = lengthOfProductArray * lengthOfOrderArray; // Maximum number of product-order duos

    // Generate and insert fake data into the 'product_order' table
    for (let i = 0; i < maxOfProductCategoryDuos; i += 1) {
      let productOrderKey;

      do {
        // Generate random product and order IDs
        const product_id = this.faker.number.int({
          min: 1,
          max: lengthOfProductArray,
        });
        const order_id = this.faker.number.int({
          min: 1,
          max: lengthOfOrderArray,
        });

        // Create a unique key for the Set
        productOrderKey = `${product_id}-${order_id}`;
      } while (uniqueProductOrderDuos.has(productOrderKey));

      // Add the unique duo to the Set
      uniqueProductOrderDuos.add(productOrderKey);

      const [product_id, order_id] = productOrderKey.split("-").map(Number);

      const fakeProductOrder = {
        product_id,
        order_id,
      };

      this.insert(fakeProductOrder);
    }
  }
}

module.exports = ProductOrderSeeder;
