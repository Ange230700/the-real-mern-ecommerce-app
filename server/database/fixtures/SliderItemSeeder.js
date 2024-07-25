const AbstractSeeder = require("./AbstractSeeder");

class SliderItemSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Slider_item", truncate: true });
  }

  run() {
    const numberOfSliderItems = 10;

    for (let i = 0; i < numberOfSliderItems; i += 1) {
      const fakeSliderItem = {
        title: this.faker.commerce.productName(),
        image: this.faker.image.url(),
        refName: `slider_item_${i}`,
      };

      this.insert(fakeSliderItem);
    }
  }
}

module.exports = SliderItemSeeder;
