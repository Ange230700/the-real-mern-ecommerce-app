const AbstractSeeder = require("./AbstractSeeder");

class CategorySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "category", truncate: true });
  }

  // $ The run method - Populate the 'category' table with fake data

  run() {
    // Generate and insert fake data into the 'category' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake category data
      const fakeCategory = {
        name: this.faker.commerce.department(), // Generate a fake department name using faker library
        refName: `category_${i}`, // Create a reference name for the category
      };

      this.insert(fakeCategory);
    }
  }
}

module.exports = CategorySeeder;
