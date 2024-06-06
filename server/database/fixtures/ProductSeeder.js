const AbstractSeeder = require("./AbstractSeeder");

class ProductSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Product", truncate: true });
  }

  run() {
    const numberOfProducts = 10;

    for (let i = 0; i < numberOfProducts; i += 1) {
      const fakeProduct = {
        title: this.faker.commerce.productName(),
        price: this.faker.commerce.price(),
        image_url: this.faker.image.url(),
        product_adjective: this.faker.commerce.productAdjective(),
        product_material: this.faker.commerce.productMaterial(),
        product_description: this.faker.commerce.productDescription(),
        refName: `product_${i}`,
      };

      this.insert(fakeProduct);
    }
  }
}

module.exports = ProductSeeder;
