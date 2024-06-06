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

  run() {
    const lengthOfUserArray = new UserSeeder().count();

    const numberOfPurchases = lengthOfUserArray;

    for (let i = 0; i < numberOfPurchases; i += 1) {
      const user = this.getRef(`user_${i % lengthOfUserArray}`);

      const fakePurchase = {
        user_id: user.insertId,
        total: this.faker.commerce.price(),
        refName: `purchase_${i}`,
      };

      this.insert(fakePurchase);
    }
  }
}

module.exports = PurchaseSeeder;
