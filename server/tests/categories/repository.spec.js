const { database, tables } = require("../config");

describe("CategoryRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("createCategory", async () => {
    const category = {
      name: "Electronics",
      image: "electronics.png",
    };

    const insertId = await tables.Category.createCategory(category);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
  });

  test("readCategory", async () => {
    const category = {
      name: "Fashion",
      image: "fashion.png",
    };

    const insertId = await tables.Category.createCategory(category);
    const readCategory = await tables.Category.readCategory(insertId);

    expect(readCategory).toBeTruthy();
    expect(readCategory).toHaveProperty("id");
    expect(readCategory).toHaveProperty("name");
    expect(readCategory).toHaveProperty("image");
    expect(readCategory.id).toBe(insertId);
    expect(typeof readCategory.name).toBe("string");
    expect(typeof readCategory.image).toBe("string");
  });

  test("updateCategory", async () => {
    const category = {
      name: "Books",
      image: "books.png",
    };

    const insertId = await tables.Category.createCategory(category);
    const updatedRows = await tables.Category.updateCategory(insertId, {
      name: "Updated Books",
      image: "updated_books.png",
    });

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
  });

  test("deleteCategory", async () => {
    const category = {
      name: "Toys",
      image: "toys.png",
    };

    const insertId = await tables.Category.createCategory(category);
    const deletedRows = await tables.Category.deleteCategory(insertId);

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
  });
});
