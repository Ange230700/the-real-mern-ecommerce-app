const { app, request, database, CryptoJS } = require("../config");
// const generateToken = require("../utils/generateToken");

describe("Users API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/users", () => {
    it("should fetch all users as an admin", async () => {
      const sampleUsersToRegister = [
        {
          username: "test_user15",
          email: "test.user15@example.com",
          password: "password15",
        },
        {
          username: "test_user15",
          email: "test.user15@example.com",
          password: "password15",
        },
        {
          username: "test_user15",
          email: "test.user15@example.com",
          password: "password15",
        },
        {
          username: "test_admin1",
          email: "test.admin1@example.com",
          password: "password1",
          is_admin: true,
        },
      ];

      sampleUsersToRegister.forEach(async (sampleUserToRegister) => {
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
      });

      const adminUserCredentials = {
        email: "test.admin1@example.com",
        password: "password1",
      };

      const admin = await request(app)
        .post("/api/auth/login")
        .send(adminUserCredentials);

      expect(admin.body).toHaveProperty("token");

      if (!admin.body.token) {
        expect(admin.body.token).toBeFalsy();
        expect(admin.body).toHaveProperty("message");
        expect(admin.body.message).toBe("You are not authenticated!");
        expect(admin.status).toBe(400);
      } else {
        const { token, ...theAdmin } = admin.body;

        expect(admin.status).toBe(200);
        expect(typeof token).toBe("string");
        expect(typeof theAdmin).toBe("object");
      }

      const response = await request(app).get("/api/users");

      if (!response.body) {
        expect(response.body).toBeFalsy();
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("No users found");
        expect(response.body).toHaveProperty("length");
        expect(response.body.length).toBe(0);
      } else {
        expect(response.body).toBeTruthy();
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("object");
        expect(response.body).toHaveProperty("length");
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty("userId");
        expect(response.body[1]).toHaveProperty("username");
        expect(response.body[2]).toHaveProperty("is_admin");
      }
    });
  });

  // describe("GET /api/users/user/:user_id", () => {
  //   it("should fetch a single user by ID", async () => {
  //     const user = { userId: 1, username: "john_doe", is_admin: false };
  //     const token = generateToken(user);
  //     jest.spyOn(database, "query").mockResolvedValueOnce([[user]]);
  //     jwt.verify.mockImplementation((token_arg, secret, callback) =>
  //       callback(null, user)
  //     );

  //     const response = await request(app)
  //       .get("/api/users/user/1")
  //       .set("Authorization", `Bearer ${token}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(user);
  //   });

  //   it("should return 404 if user not found", async () => {
  //     jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

  //     const response = await request(app).get("/api/users/user/0");

  //     expect(response.status).toBe(404);
  //     expect(response.body.message).toEqual("User not found");
  //   });
  // });

  // describe("PUT /api/users/user/:user_id", () => {
  //   it("should update an existing user", async () => {
  //     const user = { username: "john_doe_updated" };
  //     const result = [{ affectedRows: 1 }];
  //     jest.spyOn(database, "query").mockResolvedValueOnce([result]);
  //     const response = await request(app).put("/api/users/user/1").send(user);
  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toEqual("User updated successfully");
  //   });
  // });

  // describe("DELETE /api/users/user/:user_id", () => {
  //   it("should delete a user", async () => {
  //     const result = [{ affectedRows: 1 }];
  //     jest.spyOn(database, "query").mockResolvedValueOnce([result]);
  //     const response = await request(app).delete("/api/users/user/1");
  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toEqual("User deleted successfully");
  //   });
  // });
});
