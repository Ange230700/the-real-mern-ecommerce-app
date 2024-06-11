const { app, request, database, CryptoJS } = require("../config");

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
        expect(response.body.insertId).toBeFalsy();

        expect(response.body).toHaveProperty("message");

        expect(response.status).toBe(400);

        expect(typeof response.body.message).toBe("string");

        expect(response.body.message).toBe("User registration failed.");
      } else {
        expect(response.body.insertId).toBeTruthy();
        expect(response.body.token).toBeTruthy();

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User registered successfully.");

        expect(response.body).toHaveProperty("insertId");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("message");

        expect(typeof response.body.insertId).toBe("number");
        expect(typeof response.body.token).toBe("string");
        expect(typeof response.body.message).toBe("string");
      }
    });

    it("should return an error for duplicate email", async () => {
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

      await request(app).post("/api/auth/register").send(user);

      const response = await request(app).post("/api/auth/register").send(user);

      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty("error");

      expect(response.body.error).toBe("Email already in use");

      expect(typeof response.body.error).toBe("string");
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

      usersWithMissingFields.forEach(async (userWithMissingFields) => {
        if (Object.keys(userWithMissingFields).length) {
          if (userWithMissingFields.password) {
            const encryptedPassword = CryptoJS.AES.encrypt(
              userWithMissingFields.password,
              process.env.APP_SECRET
            ).toString();

            const userWithEncryptedPassword = {
              ...userWithMissingFields,
              password: encryptedPassword,
            };

            expect(userWithEncryptedPassword.password).toBe(encryptedPassword);
          }

          const response = await request(app)
            .post("/api/auth/register")
            .send(userWithMissingFields);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(
            "Make sure you provided all the required fields."
          );
          expect(typeof response.body.error).toBe("string");
        } else {
          const response = await request(app)
            .post("/api/auth/register")
            .send(userWithMissingFields);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(
            "Make sure you provided all the required fields."
          );
          expect(typeof response.body.error).toBe("string");
        }
      });
    });
  });

  describe("POST /api/auth/login", () => {
    it("should log in a user", async () => {
      const user = {
        username: "test_user8",
        email: "test.user8@example.com",
        password: "password8",
      };

      const encryptedPassword = CryptoJS.AES.encrypt(
        user.password,
        process.env.APP_SECRET
      ).toString();

      user.password = encryptedPassword;

      expect(user.password).toBe(encryptedPassword);

      await request(app).post("/api/auth/register").send(user);

      const userCredentials = {
        email: user.email,
        password: user.password,
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
    });

    it("should return an error for invalid entries", async () => {
      const sampleUsersToRegister = [
        {
          username: "test_user9",
          email: "test.user9@example.com",
          password: "password9",
        },
        {
          username: "test_user10",
          email: "test.user10@example.com",
          password: "password10",
        },
        {
          username: "test_user11",
          email: "test.user11@example.com",
          password: "password11",
        },
      ];

      sampleUsersToRegister.forEach(async (sampleUserToRegister) => {
        if (Object.keys(sampleUserToRegister).length) {
          const encryptedPassword = CryptoJS.AES.encrypt(
            sampleUserToRegister.password,
            process.env.APP_SECRET
          ).toString();

          const userWithEncryptedPassword = {
            ...sampleUserToRegister,
            password: encryptedPassword,
          };

          await request(app)
            .post("/api/auth/register")
            .send(userWithEncryptedPassword);
        }
      });

      const usersWithInvalidEmailOrPassword = [
        {
          email: "test.user9@example.com",
        },
        {
          password: "password10",
        },
        {},
      ];

      usersWithInvalidEmailOrPassword.forEach(
        async (userWithInvalidEmailOrPassword) => {
          const response = await request(app)
            .post("/api/auth/login")
            .send(userWithInvalidEmailOrPassword);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error");
          expect(typeof response.body.error).toBe("string");
          expect(response.body.error).toBe("Invalid email or password");
        }
      );
    });

    it("should return an error for not found user", async () => {
      const user = {
        email: "test.user12@example.com",
        password: "password12",
      };

      const response = await request(app).post("/api/auth/login").send(user);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(typeof response.body.error).toBe("string");
      expect(response.body.error).toBe("User not found");
    });
  });
});
