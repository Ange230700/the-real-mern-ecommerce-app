const { app, request, database, tables } = require("../config");
const generateToken = require("../utils/generateToken");

describe("Slider Items API", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  describe("GET /api/slider_items", () => {
    it("should fetch all slider items", async () => {
      const response = await request(app).get("/api/slider_items");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/slider_items/slider_item/:slider_item_id", () => {
    it("should fetch a single slider item by ID", async () => {
      const sliderItem = { title: "Test Slider", image: "test_slider.png" };
      const sliderItemId =
        await tables.Slider_item.createSliderItem(sliderItem);

      const response = await request(app).get(
        `/api/slider_items/slider_item/${sliderItemId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("image");
    });

    it("should return 404 if slider item not found", async () => {
      const response = await request(app).get(
        "/api/slider_items/slider_item/9999"
      );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Slider item not found");
    });
  });

  describe("POST /api/slider_items/slider_item", () => {
    it("should create a new slider item", async () => {
      const adminToken = generateToken({ is_admin: true });

      const sliderItem = { title: "New Slider", image: "new_slider.png" };
      const response = await request(app)
        .post("/api/slider_items/slider_item")
        .set("Cookie", `token=${adminToken}`)
        .send(sliderItem);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("insertId");
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Slider item added");
    });
  });

  describe("PUT /api/slider_items/slider_item/:slider_item_id", () => {
    it("should update an existing slider item", async () => {
      const adminToken = generateToken({ is_admin: true });

      const sliderItem = { title: "Update Slider", image: "update_slider.png" };
      const sliderItemId =
        await tables.Slider_item.createSliderItem(sliderItem);

      const updatedSliderItem = {
        title: "Updated Slider",
        image: "updated_slider.png",
      };
      const response = await request(app)
        .put(`/api/slider_items/slider_item/${sliderItemId}`)
        .set("Cookie", `token=${adminToken}`)
        .send(updatedSliderItem);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Slider item updated");
    });
  });

  describe("DELETE /api/slider_items/slider_item/:slider_item_id", () => {
    it("should delete a slider item", async () => {
      const adminToken = generateToken({ is_admin: true });

      const sliderItem = { title: "Delete Slider", image: "delete_slider.png" };
      const sliderItemId =
        await tables.Slider_item.createSliderItem(sliderItem);

      const response = await request(app)
        .delete(`/api/slider_items/slider_item/${sliderItemId}`)
        .set("Cookie", `token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Slider item deleted");
    });
  });
});
