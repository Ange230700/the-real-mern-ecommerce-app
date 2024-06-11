const CryptoJS = require("crypto-js");
const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "User", truncate: true });
  }

  async run() {
    const fakeAdmin = {
      username: "admin",
      email: "admin@admin.admin",
      password: CryptoJS.AES.encrypt(
        "admin",
        process.env.APP_SECRET
      ).toString(),
      is_admin: true,
    };

    this.insert(fakeAdmin);

    const numberOfUsers = 2;

    if (!numberOfUsers) {
      return;
    }

    for (let i = 0; i < numberOfUsers; i += 1) {
      const fakeUser = {
        username: this.faker.internet.userName(),
        email: this.faker.internet.email(),
        password: CryptoJS.AES.encrypt(
          this.faker.internet.password(),
          process.env.APP_SECRET
        ).toString(),
        is_admin: this.faker.datatype.boolean(),
        refName: `user_${i}`,
      };

      this.insert(fakeUser);
    }

    await Promise.all(this.promises);
  }
}

module.exports = UserSeeder;
