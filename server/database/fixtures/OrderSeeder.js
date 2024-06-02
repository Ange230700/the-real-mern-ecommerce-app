const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");

class OrderSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "order",
      truncate: true,
      dependencies: [UserSeeder],
    });
  }

  // $ The run method - Populate the 'order' table with fake data

  run() {
    // Generate and insert fake data into the 'order' table
    for (let i = 0; i < 10; i += 1) {
      // Get the reference to the user and cart
      const user = this.getRef(`user_${i % 10}`); // Get the reference to the user
      const fakeOrder = {
        userId: user.insertId, // Get the user id from the user reference
        total: this.faker.commerce.price(), // Generate a fake total using faker library
        refName: `order_${i}`, // Create a reference name for the order
      };

      // Insert the fakeOrder data into the 'order' table
      this.insert(fakeOrder); // Insert the fakeOrder data into the 'order' table
    }
  }
}

// Export the OrderSeeder class
module.exports = OrderSeeder;
