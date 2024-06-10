const { app, request, CryptoJS } = require("../config");
const database = require("../../database/client");

describe("Auth API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const user = {
        username: "test_user1",
        email: "test.user1@example.com",
        password: "password1",
      };

      const encryptedPassword = CryptoJS.AES.encrypt(
        user.password,
        process.env.APP_SECRET
      ).toString();

      user.password = encryptedPassword;

      expect(user.password).toBe(encryptedPassword);

      const response = await request(app).post("/api/auth/register").send(user);

      if (!response.body.insertId) {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("User registration failed.");
      } else {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("insertId");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("User registered successfully.");
      }
    });

    it("should return a bad request status for missing fields", async () => {
      const usersWithMissingFields = [
        {
          username: "test_user2",
          email: "test.user2@example.com",
        },
        {
          email: "test.user3@example.com",
          password: "password3",
        },
        {
          username: "test_user4",
          password: "password4",
        },
        {
          username: "test_user5",
        },
        {
          email: "test.user6@example.com",
        },
        {
          password: "password7",
        },
        {},
      ];

      usersWithMissingFields.forEach(async (user) => {
        if (Object.keys(user).length) {
          if (user.password) {
            const encryptedPassword = CryptoJS.AES.encrypt(
              user.password,
              process.env.APP_SECRET
            ).toString();

            const userWithEncryptedPassword = {
              ...user,
              password: encryptedPassword,
            };

            expect(userWithEncryptedPassword.password).toBe(encryptedPassword);
          }

          const response = await request(app)
            .post("/api/auth/register")
            .send(user);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(
            "Make sure you provided all the required fields."
          );
        } else {
          const response = await request(app)
            .post("/api/auth/register")
            .send(user);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(
            "Make sure you provided all the required fields."
          );
        }
      });
    });
  });

  describe("POST /api/auth/login", () => {
    it("should log in a user", async () => {
      const user = {
        email: "test.user1@example.com",
        password: CryptoJS.AES.encrypt(
          "password1",
          process.env.APP_SECRET
        ).toString(),
      };

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.APP_SECRET
      );

      const OriginalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

      const response = await request(app).post("/api/auth/login").send(user);

      expect(OriginalPassword).toBe("password1");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.message).toBe("User logged in successfully");
    });

    // it("should return an error for not found user", async () => {
    //   const usersWithInvalidEmailOrPassword = [
    //     {
    //       email: "test.user2@example.com",
    //     },
    //     {
    //       password: "password3",
    //     },
    //   ];

    //   usersWithInvalidEmailOrPassword.forEach(async (user) => {
    //     const response = await request(app).post("/api/auth/login").send(user);

    //     expect(response.status).toBe(400);
    //     expect(response.body).toHaveProperty("error");
    //     expect(response.body.error).toBe("Invalid email or password");
    //   });
    // });

    // it("should return an error for not found user", async () => {
    //   const user = null;

    //   const response = await request(app).post("/api/auth/login").send(user);

    //   expect(response.status).toBe(404);
    //   expect(response.body).toHaveProperty("error");
    //   expect(response.body.error).toBe("User not found");
    // });
  });
});
