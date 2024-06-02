const AbstractSeeder = require("./AbstractSeeder");

class PopularProductSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "popularProduct", truncate: true });
  }

  run() {
    // Generate and insert fake data into the 'popularProduct' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake popularProduct data
      const fakePopularProduct = {
        title: this.faker.commerce.productName(), // Generate a random product name
        price: this.faker.commerce.price(), // Generate a random price
        image: this.faker.image.url(), // Generate a random image URL
      };

      this.insert(fakePopularProduct);
    }
  }
}

module.exports = PopularProductSeeder;
