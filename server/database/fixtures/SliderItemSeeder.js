const AbstractSeeder = require("./AbstractSeeder");

class SliderItemSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "sliderItem", truncate: true });
  }

  // $ The run method - Populate the 'sliderItem' table with fake data

  run() {
    // Generate and insert fake data into the 'sliderItem' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake sliderItem data
      const fakeSliderItem = {
        title: this.faker.commerce.productName(), // Generate a fake product name using faker library
        image: this.faker.image.url(), // Generate a fake image URL using faker library
        refName: `sliderItem_${i}`, // Create a reference name for the sliderItem
      };

      this.insert(fakeSliderItem);
    }
  }
}

module.exports = SliderItemSeeder;
