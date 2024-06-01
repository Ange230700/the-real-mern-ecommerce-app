import { useState } from "react";
import { useLocation } from "react-router"; // eslint-disable-line
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <div className="product-list-container">
      <Navbar />
      <Announcement />
      <h1 className="product-list-title">{cat}</h1>
      <div className="product-list-filter-container">
        <div className="product-list-filter">
          <span className="product-list-filter-text">Filter Products:</span>
          <select
            className="product-list-select"
            name="color"
            onChange={handleFilters}
          >
            <option disabled>Color</option>
            <option>white</option>
            <option>black</option>
            <option>red</option>
            <option>blue</option>
            <option>yellow</option>
            <option>green</option>
          </select>
          <select
            className="product-list-select"
            name="size"
            onChange={handleFilters}
          >
            <option disabled>Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div className="product-list-filter">
          <span className="product-list-filter-text">Sort Products:</span>
          <select
            className="product-list-select"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default ProductList;
