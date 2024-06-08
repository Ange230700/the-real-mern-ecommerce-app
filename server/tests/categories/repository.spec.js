const { database, tables } = require("../config");

describe("CategoryRepository", () => {
  afterAll(async () => {
    await database.end();
  });

  test("createCategory => insert into", async () => {
    const category = { name: "Electronics", image: "image_url" };
    const result = [{ insertId: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const insertId = await tables.Category.createCategory(category);

    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO Category (name, image) VALUES (?, ?)",
      [category.name, category.image]
    );
    expect(insertId).toBe(result[0].insertId);
  });

  test("readCategory => select with id", async () => {
    const category = { id: 1, name: "Electronics", image: "image_url" };

    jest.spyOn(database, "query").mockResolvedValueOnce([[category]]);

    const foundCategory = await tables.Category.readCategory(1);

    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM Category WHERE id = ?",
      [1]
    );
    expect(foundCategory).toEqual(category);
  });

  test("updateCategory => update with id", async () => {
    const category = { name: "Updated Electronics", image: "new_image_url" };
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Category.updateCategory(1, category);

    expect(database.query).toHaveBeenCalledWith(
      "UPDATE Category SET name = COALESCE(?, name), image = COALESCE(?, image) WHERE id = ?",
      [category.name, category.image, 1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });

  test("deleteCategory => delete with id", async () => {
    const result = [{ affectedRows: 1 }];

    jest.spyOn(database, "query").mockResolvedValueOnce([result]);

    const affectedRows = await tables.Category.deleteCategory(1);

    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM Category WHERE id = ?",
      [1]
    );
    expect(affectedRows).toBe(result[0].affectedRows);
  });
});
