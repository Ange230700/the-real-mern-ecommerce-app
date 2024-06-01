import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { popularProducts } from "../data";

import Product from "./Product";

function Products({ cat = "", filters = {}, sort = "" }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${import.meta.env.VITE_API_URL}/api/products?category=${cat}`
            : `${import.meta.env.VITE_API_URL}/api/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setProducts(popularProducts);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (cat) {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    }
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className="products-container">
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </div>
  );
}

Products.propTypes = {
  cat: PropTypes.string,
  filters: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.string,
  }),
  sort: PropTypes.string,
};

export default Products;
