import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CategoryItem({ item }) {
  return (
    <div className="category-item-container">
      <Link to={`/products/${item.cat}`}>
        <img
          className="category-item-image"
          src={item.img}
          alt="category item"
        />
        <div className="category-item-info">
          <h1 className="category-item-title">{item.title}</h1>
          <button type="button" className="category-item-button">
            SHOP NOW
          </button>
        </div>
      </Link>
    </div>
  );
}

CategoryItem.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    cat: PropTypes.string,
  }).isRequired,
};

export default CategoryItem;
