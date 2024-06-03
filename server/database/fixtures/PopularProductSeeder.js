const AbstractSeeder = require("./AbstractSeeder");

class PopularProductSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "popularProduct", truncate: true });
  }

  run() {
    const numberOfPopularProducts = 10; // Change this value based on the number of popular products you want to generate

    // Generate and insert fake data into the 'popularProduct' table
    for (let i = 0; i < numberOfPopularProducts; i += 1) {
      // Generate fake popularProduct data
      const fakePopularProduct = {
        title: this.faker.commerce.productName(), // Generate a fake product name using faker library
        price: this.faker.commerce.price(), // Generate a fake price using faker library
        image_url: this.faker.image.url(), // Generate a fake image URL using faker library
        refName: `popularProduct_${i}`, // Create a reference name for the popularProduct
      };

      // Insert the fakePopularProduct data into the 'popularProduct' table
      this.insert(fakePopularProduct);
    }
  }
}

module.exports = PopularProductSeeder;
