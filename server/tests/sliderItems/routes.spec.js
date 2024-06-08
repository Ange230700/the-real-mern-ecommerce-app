const { app, request, database, jwt } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Slider Items API", () => {
  afterAll(async () => {
    await database.end();
  });

  describe("GET /api/slider_items", () => {
    it("should fetch all slider items", async () => {
      const rows = [{ id: 1, title: "Item1", image: "image_url" }];
      jest.spyOn(database, "query").mockResolvedValueOnce([rows]);

      const response = await request(app).get("/api/slider_items");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/slider_items/slider_item/:slider_item_id", () => {
    it("should fetch a single slider item by ID", async () => {
      const sliderItem = { id: 1, title: "Item1", image: "image_url" };
      jest.spyOn(database, "query").mockResolvedValueOnce([[sliderItem]]);

      const response = await request(app).get(
        "/api/slider_items/slider_item/1"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(sliderItem);
    });

    it("should return 404 if slider item not found", async () => {
      jest.spyOn(database, "query").mockResolvedValueOnce([[]]);

      const response = await request(app).get(
        "/api/slider_items/slider_item/0"
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("Slider item not found");
    });
  });

  describe("POST /api/slider_items/slider_item", () => {
    it("should create a new slider item", async () => {
      const sliderItem = { title: "Item1", image: "image_url" };
      const result = { insertId: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .post("/api/slider_items/slider_item")
        .send(sliderItem)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual("Slider item added");
    });
  });

  describe("PUT /api/slider_items/slider_item/:slider_item_id", () => {
    it("should update an existing slider item", async () => {
      const sliderItem = { title: "Updated Item1", image: "new_image_url" };
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .put("/api/slider_items/slider_item/1")
        .send(sliderItem)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Slider item updated");
    });
  });

  describe("DELETE /api/slider_items/slider_item/:slider_item_id", () => {
    it("should delete a slider item", async () => {
      const result = { affectedRows: 1 };

      jest.spyOn(database, "query").mockResolvedValueOnce([result]);

      const adminUser = { userId: 1, is_admin: true };
      const token = generateToken(adminUser);
      jwt.verify.mockImplementation((token_arg, secret, callback) =>
        callback(null, adminUser)
      );

      const response = await request(app)
        .delete("/api/slider_items/slider_item/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Slider item deleted");
    });
  });
});
