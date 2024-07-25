const { database, tables } = require("../config");

describe("PopularProductRepository", () => {
  afterAll(async () => {
    try {
      await database.end();
    } catch (err) {
      console.error("Error closing database connection in tests:", err.message);
    }
  });

  test("createPopularProduct", async () => {
    const popularProduct = {
      title: "Popular Product 1",
      price: 99.99,
      image: "popular_product_1.png",
    };

    const insertId =
      await tables.Popular_product.createPopularProduct(popularProduct);

    expect(insertId).toBeTruthy();
    expect(typeof insertId).toBe("number");
  });

  test("readPopularProduct", async () => {
    const popularProduct = {
      title: "Popular Product 2",
      price: 49.99,
      image: "popular_product_2.png",
    };

    const insertId =
      await tables.Popular_product.createPopularProduct(popularProduct);
    const readPopularProduct =
      await tables.Popular_product.readPopularProduct(insertId);

    expect(readPopularProduct).toBeTruthy();
    expect(readPopularProduct).toHaveProperty("id");
    expect(readPopularProduct).toHaveProperty("title");
    expect(readPopularProduct).toHaveProperty("price");
    expect(readPopularProduct).toHaveProperty("image");
    expect(readPopularProduct.id).toBe(insertId);
    expect(typeof readPopularProduct.title).toBe("string");

    const price = Number(readPopularProduct.price);
    expect(typeof price).toBe("number");
    expect(price).toBe(popularProduct.price);

    expect(typeof readPopularProduct.image).toBe("string");
  });

  test("updatePopularProduct", async () => {
    const popularProduct = {
      title: "Popular Product 3",
      price: 29.99,
      image: "popular_product_3.png",
    };

    const insertId =
      await tables.Popular_product.createPopularProduct(popularProduct);
    const updatedRows = await tables.Popular_product.updatePopularProduct(
      insertId,
      {
        title: "Updated Popular Product 3",
        price: 39.99,
        image: "updated_popular_product_3.png",
      }
    );

    expect(updatedRows).toBe(1);
    expect(typeof updatedRows).toBe("number");
  });

  test("deletePopularProduct", async () => {
    const popularProduct = {
      title: "Popular Product 4",
      price: 19.99,
      image: "popular_product_4.png",
    };

    const insertId =
      await tables.Popular_product.createPopularProduct(popularProduct);
    const deletedRows =
      await tables.Popular_product.deletePopularProduct(insertId);

    expect(deletedRows).toBe(1);
    expect(typeof deletedRows).toBe("number");
  });
});
