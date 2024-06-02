const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");

class CartSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "cart", truncate: true, dependencies: [UserSeeder] });
  }

  // $ The run method - Populate the 'cart' table with fake data

  run() {
    // Generate and insert fake data into the 'cart' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake cart data
      const user = this.getRef(`user_${i % 10}`);
      const fakeCart = {
        userId: user.insertId, // Generate a fake user_id using faker library
        refName: `cart_${i}`, // Create a reference name for the cart
      };

      // Insert the fakeCart data into the 'cart' table
      this.insert(fakeCart); // insert into cart(user_id) values (?)
    }
  }
}

module.exports = CartSeeder;
