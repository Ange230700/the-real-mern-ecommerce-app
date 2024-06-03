import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CategoryItem({ item }) {
  return (
    <div className="category-item-container" key={item.id}>
      <Link to={`/products/${item.name}`}>
        <img
          className="category-item-image"
          src={item.image}
          alt="category item"
        />
        <div className="category-item-info">
          <h1 className="category-item-title">{item.name}</h1>
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
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    cat: PropTypes.string,
  }).isRequired,
};

export default CategoryItem;
