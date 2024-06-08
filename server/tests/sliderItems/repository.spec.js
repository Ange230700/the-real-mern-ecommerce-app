const { database, tables } = require("../config");

describe("SliderItemRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("createSliderItem => insert into", async () => {
    const sliderItem = { title: "Item1", image: "image_url" };
    const result = [{ insertId: 1 }];
    jest.spyOn(database, "query").mockResolvedValueOnce([result]);
    const insertId = await tables.Slider_item.createSliderItem(sliderItem);
    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO Slider_item (title, image) VALUES (?, ?)",
      [sliderItem.title, sliderItem.image]
    );
    expect(insertId).toBe(result[0].insertId);
  });

  test("readSliderItem => select with id", async () => {
    const sliderItem = { id: 1, title: "Item1", image: "image_url" };
    jest.spyOn(database, "query").mockResolvedValueOnce([[sliderItem]]);
    const foundSliderItem = await tables.Slider_item.readSliderItem(1);
    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM Slider_item WHERE id = ?",
      [1]
    );
    expect(foundSliderItem).toEqual(sliderItem);
  });

  test("updateSliderItem => update with id", async () => {
    const sliderItem = { title: "Updated Item1", image: "new_image_url" };
    const result = [{ affectedRows: 1 }];
    jest.spyOn(database, "query").mockResolvedValueOnce([result]);
    const affectedRows = await tables.Slider_item.updateSliderItem(
      1,
      sliderItem
    );
    expect(database.query).toHaveBeenCalledWith(
      "UPDATE Slider_item SET title = COALESCE(?, title), image = COALESCE(?, image) WHERE id = ?",
      [sliderItem.title, sliderItem.image, 1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });

  test("deleteSliderItem => delete with id", async () => {
    const result = [{ affectedRows: 1 }];
    jest.spyOn(database, "query").mockResolvedValueOnce([result]);
    const affectedRows = await tables.Slider_item.deleteSliderItem(1);
    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM Slider_item WHERE id = ?",
      [1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });
});
