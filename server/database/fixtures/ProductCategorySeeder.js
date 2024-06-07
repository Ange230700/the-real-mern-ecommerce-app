const AbstractSeeder = require("./AbstractSeeder");

const ProductSeeder = require("./ProductSeeder");
const CategorySeeder = require("./CategorySeeder");

class ProductCategorySeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "Product_category",
      truncate: true,
      dependencies: [ProductSeeder, CategorySeeder],
    });
  }

  async run() {
    const uniqueProductCategoryDuos = new Set();

    const lengthOfProductArray = await new ProductSeeder().count();

    const lengthOfCategoryArray = await new CategorySeeder().count();

    const maxOfProductCategoryDuos =
      lengthOfProductArray * lengthOfCategoryArray;

    for (let i = 0; i < maxOfProductCategoryDuos; i += 1) {
      let productCategoryKey;

      do {
        const product_id = this.faker.number.int({
          min: 1,
          max: lengthOfProductArray,
        });
        const category_id = this.faker.number.int({
          min: 1,
          max: lengthOfCategoryArray,
        });

        productCategoryKey = `${product_id}-${category_id}`;
      } while (uniqueProductCategoryDuos.has(productCategoryKey));

      uniqueProductCategoryDuos.add(productCategoryKey);

      const [product_id, category_id] = productCategoryKey
        .split("-")
        .map(Number);

      const fakeProductCategory = {
        product_id,
        category_id,
      };

      this.insert(fakeProductCategory);
    }

    await Promise.all(this.promises);
  }
}

module.exports = ProductCategorySeeder;
