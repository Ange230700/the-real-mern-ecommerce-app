const AbstractSeeder = require("./AbstractSeeder");

class SliderItemSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "sliderItem", truncate: true });
  }

  // $ The run method - Populate the 'sliderItem' table with fake data

  run() {
    const numberOfSliderItems = 10; // Change this value based on the number of sliderItems you want to generate

    // Generate and insert fake data into the 'sliderItem' table
    for (let i = 0; i < numberOfSliderItems; i += 1) {
      // Generate fake sliderItem data
      const fakeSliderItem = {
        title: this.faker.commerce.productName(), // Generate a fake product name using faker library
        description: this.faker.commerce.productDescription(), // Generate a fake product description using faker library
        image_url: this.faker.image.url(), // Generate a fake image URL using faker library
        refName: `sliderItem_${i}`, // Create a reference name for the sliderItem
      };

      // Insert the fakeSliderItem data into the 'sliderItem' table
      this.insert(fakeSliderItem);
    }
  }
}

module.exports = SliderItemSeeder;
