const AbstractSeeder = require("./AbstractSeeder");

const UserSeeder = require("./UserSeeder");

class CartSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Cart", truncate: true, dependencies: [UserSeeder] });
  }

  async run() {
    const lengthOfUserArray = await new UserSeeder().count();

    const numberOfCarts = 2;

    const fakeTestCart = {
      user_id: 2,
      status: "active",
    };

    this.insert(fakeTestCart);

    for (let i = 0; i < numberOfCarts; i += 1) {
      const fakeCart = {
        user_id: this.faker.number.int({ min: 1, max: lengthOfUserArray }),
        status: this.faker.word.adjective(),
        refName: `cart_${i}`,
      };

      this.insert(fakeCart);
    }

    await Promise.all(this.promises);
  }
}

module.exports = CartSeeder;
