import PropTypes from "prop-types";
import { ArrowLeftOutlined } from "@material-ui/icons";

function PrevArrow({ onClick }) {
  return (
    <button
      type="button"
      aria-label="previous button"
      className="control-btn prev"
      onClick={onClick}
    >
      <ArrowLeftOutlined />
    </button>
  );
}

PrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PrevArrow;
