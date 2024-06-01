const AbstractSeeder = require("./AbstractSeeder");

class ProductSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "product", truncate: true });
  }

  // $ The run method - Populate the 'product' table with fake data

  run() {
    // Generate and insert fake data into the 'product' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake product data
      const fakeProduct = {
        title: this.faker.commerce.productName(), // Generate a fake product name using faker library
        price: this.faker.commerce.price(), // Generate a fake price using faker library
        // image_url: this.faker.image.imageUrl(), // Generate a fake image URL using faker library
        image_url: this.faker.image.url(), // Generate a fake image URL using faker library
        refName: `product_${i}`, // Create a reference name for the product
      };

      this.insert(fakeProduct);
    }
  }
}

module.exports = ProductSeeder;
