const AbstractSeeder = require("./AbstractSeeder");

class PopularProductSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Popular_product", truncate: true });
  }

  run() {
    const numberOfPopularProducts = 10;

    for (let i = 0; i < numberOfPopularProducts; i += 1) {
      const fakePopularProduct = {
        title: this.faker.commerce.productName(),
        price: this.faker.commerce.price(),
        image: this.faker.image.url(),
        refName: `popular_product_${i}`,
      };

      this.insert(fakePopularProduct);
    }
  }
}

module.exports = PopularProductSeeder;
