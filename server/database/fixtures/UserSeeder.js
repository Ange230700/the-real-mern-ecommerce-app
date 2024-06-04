const CryptoJS = require("crypto-js");
const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // $ The run method - Populate the 'user' table with fake data

  run() {
    const numberOfUsers = 10; // Change this value based on the number of users you want to generate

    // Generate and insert fake data into the 'user' table

    for (let i = 0; i < numberOfUsers; i += 1) {
      // Generate fake user data
      const fakeUser = {
        username: this.faker.internet.userName(), // Generate a fake username using faker library
        email: this.faker.internet.email(), // Generate a fake email using faker library
        password: CryptoJS.AES.encrypt(
          this.faker.internet.password(),
          process.env.APP_SECRET
        ).toString(), // Generate a fake password using faker library
        is_admin: this.faker.datatype.boolean(), // Generate a fake is_admin using faker library
        refName: `user_${i}`, // Create a reference name for the user
      };

      this.insert(fakeUser);
    }
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
