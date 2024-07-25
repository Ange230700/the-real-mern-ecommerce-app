const AbstractSeeder = require("./AbstractSeeder");

class CategorySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Category", truncate: true });
  }

  run() {
    const numberOfCategories = 3;

    for (let i = 0; i < numberOfCategories; i += 1) {
      const fakeCategory = {
        name: this.faker.commerce.department(),
        image: this.faker.image.url(),
        refName: `category_${i}`,
      };

      this.insert(fakeCategory);
    }
  }
}

module.exports = CategorySeeder;
