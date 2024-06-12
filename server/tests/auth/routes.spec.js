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
        username: "user1",
        email: "user1@user1.user1",
        password: "user1",
      };

      const encryptedPassword = CryptoJS.AES.encrypt(
        user.password,
        process.env.APP_SECRET
      ).toString();

      user.password = encryptedPassword;

      expect(user.password).toBe(encryptedPassword);

      const response = await request(app).post("/api/auth/register").send(user);

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
    });

    it("should return an error for duplicate email", async () => {
      const user = {
        username: "user1",
        email: "user1@user1.user1",
        password: "user1",
      };

      const encryptedPassword = CryptoJS.AES.encrypt(
        user.password,
        process.env.APP_SECRET
      ).toString();

      user.password = encryptedPassword;

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
      });
    });
  });

  describe("POST /api/auth/login", () => {
    it("should log in a user", async () => {
      const userToRegister = {
        username: "user222",
        email: "user222@user222.user222",
        password: "user222",
      };

      const encryptedPassword = CryptoJS.AES.encrypt(
        userToRegister.password,
        process.env.APP_SECRET
      ).toString();

      userToRegister.password = encryptedPassword;

      const userRegistrationResponse = await request(app)
        .post("/api/auth/register")
        .send(userToRegister);

      expect(userRegistrationResponse.status).toBe(201);
      expect(userRegistrationResponse.body).toHaveProperty("insertId");

      const userCredentials = {
        email: "user222@user222.user222",
        password: "user222",
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(userCredentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
    });

    it("should return an error for invalid entries", async () => {
      const usersWithInvalidEmailOrPassword = [
        {
          email: "user@user.user",
        },
        {
          password: "user",
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
        email: "inexistant.user@example.com",
        password: "password",
      };

      const response = await request(app).post("/api/auth/login").send(user);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(typeof response.body.error).toBe("string");
      expect(response.body.error).toBe("User not found");
    });
  });
});
