const { database, tables } = require("../config");

describe("SliderItemRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("createSliderItem", async () => {
    const sliderItem = {
      title: "New Slider Item",
      image: "new_slider_item.png",
    };

    const insertId = await tables.Slider_item.createSliderItem(sliderItem);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
  });

  test("readSliderItem", async () => {
    const sliderItem = {
      title: "Read Slider Item",
      image: "read_slider_item.png",
    };

    const insertId = await tables.Slider_item.createSliderItem(sliderItem);
    const readSliderItem = await tables.Slider_item.readSliderItem(insertId);

    expect(readSliderItem).toBeTruthy();
    expect(readSliderItem).toHaveProperty("id");
    expect(readSliderItem).toHaveProperty("title");
    expect(readSliderItem).toHaveProperty("image");
    expect(readSliderItem.id).toBe(insertId);
  });

  test("updateSliderItem", async () => {
    const sliderItem = {
      title: "Update Slider Item",
      image: "update_slider_item.png",
    };

    const insertId = await tables.Slider_item.createSliderItem(sliderItem);

    const updatedSliderItem = {
      title: "Updated Slider Item",
      image: "updated_slider_item.png",
    };

    const updatedRows = await tables.Slider_item.updateSliderItem(
      insertId,
      updatedSliderItem
    );

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
  });

  test("deleteSliderItem", async () => {
    const sliderItem = {
      title: "Delete Slider Item",
      image: "delete_slider_item.png",
    };

    const insertId = await tables.Slider_item.createSliderItem(sliderItem);
    const deletedRows = await tables.Slider_item.deleteSliderItem(insertId);

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
  });
});
