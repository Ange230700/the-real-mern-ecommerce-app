const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const UserSeeder = require("./UserSeeder");

class PurchaseSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "purchase",
      truncate: true,
      dependencies: [UserSeeder],
    });
  }

  // $ The run method - Populate the 'order' table with fake data

  run() {
    // getting the length of the user array using the count method from the AbstractSeeder class
    const lengthOfUserArray = new UserSeeder().count();

    const numberOfPurchases = lengthOfUserArray; // Number of purchases to generate

    // Generate and insert fake data into the 'order' table
    for (let i = 0; i < numberOfPurchases; i += 1) {
      // Get the reference to the user
      const user = this.getRef(`user_${i % lengthOfUserArray}`); // Get the reference to the user

      const fakePurchase = {
        userId: user.insertId, // Get the user id from the user reference
        refName: `purchase_${i}`, // Create a reference name for the purchase
      };

      // Insert the fakePurchase data into the 'purchase' table
      this.insert(fakePurchase);
    }
  }
}

// Export the OrderSeeder class
module.exports = PurchaseSeeder;
