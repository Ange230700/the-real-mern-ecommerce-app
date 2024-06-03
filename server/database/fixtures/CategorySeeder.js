const AbstractSeeder = require("./AbstractSeeder");

class CategorySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "category", truncate: true });
  }

  // $ The run method - Populate the 'category' table with fake data

  run() {
    const numberOfCategories = 3; // Change this value based on the number of categories you want to generate

    // Generate and insert fake data into the 'category' table
    for (let i = 0; i < numberOfCategories; i += 1) {
      // Generate fake category data
      const fakeCategory = {
        name: this.faker.commerce.department(), // Generate a fake department name using faker library
        image: this.faker.image.url(), // Generate a fake image URL using faker library
        refName: `category_${i}`, // Create a reference name for the category
      };

      // Insert the fakeCategory data into the 'category' table
      this.insert(fakeCategory);
    }
  }
}

module.exports = CategorySeeder;
