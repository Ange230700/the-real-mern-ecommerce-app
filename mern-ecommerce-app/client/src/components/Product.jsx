import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Product({ item }) {
  return (
    <div className="product-container">
      <div className="product-circle" />
      <img className="product-image" src={item.image_url} alt="product pic" />
      <div className="product-info">
        <div className="product-icon">
          <ShoppingCartOutlined />
        </div>
        <div className="product-icon">
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </div>
        <div className="product-icon">
          <FavoriteBorderOutlined />
        </div>
      </div>
      <form action="/payment" method="POST">
        <button className="product-button" type="submit">
          Buy
        </button>
      </form>
    </div>
  );
}

Product.propTypes = {
  item: PropTypes.shape({
    image_url: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Product;
