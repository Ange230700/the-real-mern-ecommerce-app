import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Add, Remove } from "@material-ui/icons";

import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";

function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <div className="product-container">
      <Navbar />
      <Announcement />
      <div className="product-wrapper">
        <div className="product-img-container">
          <img
            className="product-image"
            src={product.image_url}
            alt="product pic"
          />
        </div>
        <div className="product-info-container">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-desc">{product.desc}</p>
          <span className="product-price">$ {product.price}</span>
          <div className="product-filter-container">
            <div className="product-filter">
              <span className="product-filter-title">Color</span>
              {product.color?.map((c) => (
                <button
                  type="button"
                  aria-label="color picker"
                  className="product-filter-color"
                  style={{ backgroundColor: c }}
                  key={c}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <div className="product-filter">
              <span className="product-filter-title">Size</span>
              <select
                className="product-filter-size"
                onChange={(e) => setSize(e.target.value)}
              >
                {product.size?.map((s) => (
                  <option className="product-filter-size-option" key={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="product-add-container">
            <div className="product-amount-container">
              <Remove onClick={() => handleQuantity("dec")} />
              <span className="product-amount">{quantity}</span>
              <Add onClick={() => handleQuantity("inc")} />
            </div>
            <button
              type="button"
              className="product-button"
              onClick={handleClick}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Product;
