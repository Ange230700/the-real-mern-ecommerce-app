const { app, request, database, jwt } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Users API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("GET /api/users", () => {
    it("should fetch all users", async () => {
      const rows = [{ userId: 1, username: "john_doe", is_admin: false }];
      jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

      const user = { userId: 1, username: "john_doe", is_admin: true };
      const token = generateToken(user);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/users/user/:user_id", () => {
    it("should fetch a single user by ID", async () => {
      const user = { userId: 1, username: "john_doe", is_admin: false };
      const token = generateToken(user);
      jest.spyOn(database, "query").mockResolvedValueOnce([[user]]);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, user)
      );

      const response = await request(app)
        .get("/api/users/user/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(user);
    });

    it("should return 404 if user not found", async () => {
      jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

      const response = await request(app).get("/api/users/user/0");

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("User not found");
    });
  });

  describe("PUT /api/users/user/:user_id", () => {
    it("should update an existing user", async () => {
      const user = { username: "john_doe_updated" };
      const result = [{ affectedRows: 1 }];
      jest.spyOn(database, "query").mockResolvedValueOnce([result]);
      const response = await request(app).put("/api/users/user/1").send(user);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("User updated successfully");
    });
  });

  describe("DELETE /api/users/user/:user_id", () => {
    it("should delete a user", async () => {
      const result = [{ affectedRows: 1 }];
      jest.spyOn(database, "query").mockResolvedValueOnce([result]);
      const response = await request(app).delete("/api/users/user/1");
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("User deleted successfully");
    });
  });
});
