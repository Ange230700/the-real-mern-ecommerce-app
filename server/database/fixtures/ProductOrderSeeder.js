const AbstractSeeder = require("./AbstractSeeder");

const ProductSeeder = require("./ProductSeeder");
const PurchaseSeeder = require("./PurchaseSeeder");

class ProductOrderSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "Product_order",
      truncate: true,
      dependencies: [ProductSeeder, PurchaseSeeder],
    });
  }

  // $ The run method - Populate the 'product_order' table with fake data

  async run() {
    const uniqueProductOrderDuos = new Set();

    const lengthOfProductArray = await new ProductSeeder().count();

    const lengthOfOrderArray = await new PurchaseSeeder().count();

    const maxOfProductCategoryDuos = lengthOfProductArray * lengthOfOrderArray;

    for (let i = 0; i < maxOfProductCategoryDuos; i += 1) {
      let productOrderKey;

      do {
        const product_id = this.faker.number.int({
          min: 1,
          max: lengthOfProductArray,
        });
        const order_id = this.faker.number.int({
          min: 1,
          max: lengthOfOrderArray,
        });

        productOrderKey = `${product_id}-${order_id}`;
      } while (uniqueProductOrderDuos.has(productOrderKey));

      uniqueProductOrderDuos.add(productOrderKey);

      const [product_id, order_id] = productOrderKey.split("-").map(Number);

      const fakeProductOrder = {
        product_id,
        order_id,
      };

      this.insert(fakeProductOrder);
    }

    await Promise.all(this.promises);
  }
}

module.exports = ProductOrderSeeder;
