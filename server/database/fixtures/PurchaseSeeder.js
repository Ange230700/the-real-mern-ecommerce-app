const AbstractSeeder = require("./AbstractSeeder");

const UserSeeder = require("./UserSeeder");

class PurchaseSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "Purchase",
      truncate: true,
      dependencies: [UserSeeder],
    });
  }

  async run() {
    const lengthOfUserArray = await new UserSeeder().count();

    const numberOfPurchases = lengthOfUserArray;

    if (!lengthOfUserArray) {
      return;
    }

    for (let i = 0; i < numberOfPurchases; i += 1) {
      const fakePurchase = {
        user_id: this.faker.number.int({ min: 1, max: lengthOfUserArray }),
        total: this.faker.commerce.price(),
        refName: `purchase_${i}`,
      };

      this.insert(fakePurchase);
    }

    await Promise.all(this.promises);
  }
}

module.exports = PurchaseSeeder;
