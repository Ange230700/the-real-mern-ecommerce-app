const CryptoJS = require("crypto-js");
const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // $ The run method - Populate the 'user' table with fake data

  run() {
    // Generate and insert fake data into the 'user' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake user data
      const fakeUser = {
        username: this.faker.internet.userName(), // Generate a fake username using faker library
        email: this.faker.internet.email(), // Generate a fake email using faker library
        password: CryptoJS.AES.encrypt(
          this.faker.internet.password(),
          process.env.APP_SECRET
        ).toString(), // Generate a fake password using faker library
        isAdmin: this.faker.datatype.boolean(), // Generate a fake isAdmin using faker library
        refName: `user_${i}`, // Create a reference name for the user
      };

      // Insert the fakeUser data into the 'user' table
      this.insert(fakeUser); // insert into user(email, password) values (?, ?)
    }
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
