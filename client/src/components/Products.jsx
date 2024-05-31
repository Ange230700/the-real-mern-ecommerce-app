/*
  eslint-disable no-unused-expressions
*/

/*
  eslint-disable react/require-default-props
*/

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

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
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
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
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
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
