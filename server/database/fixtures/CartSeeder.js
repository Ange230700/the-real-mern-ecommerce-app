const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const UserSeeder = require("./UserSeeder");

class CartSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "cart", truncate: true, dependencies: [UserSeeder] });
  }

  // $ The run method - Populate the 'cart' table with fake data

  run() {
    // getting the length of the user array using the count method from the AbstractSeeder class
    const lengthOfUserArray = new UserSeeder().count();

    const numberOfCarts = lengthOfUserArray; // Number of carts to generate

    // Generate and insert fake data into the 'cart' table
    for (let i = 0; i < numberOfCarts; i += 1) {
      // Get the reference to the user
      const user = this.getRef(`user_${i % lengthOfUserArray}`); // Get the reference to the user

      const fakeCart = {
        userId: user.insertId, // Get the user id from the user reference
        refName: `cart_${i}`, // Create a reference name for the cart
      };

      // Insert the fakeCart data into the 'cart' table
      this.insert(fakeCart);
    }
  }
}

module.exports = CartSeeder;
