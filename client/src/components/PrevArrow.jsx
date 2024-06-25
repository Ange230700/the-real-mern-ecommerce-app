import PropTypes from "prop-types";
import { ArrowLeftOutlined } from "@material-ui/icons";

function PrevArrow({ previous }) {
  return (
    <button
      type="button"
      aria-label="previous button"
      className="control-btn prev"
      onClick={previous}
    >
      <ArrowLeftOutlined />
    </button>
  );
}

PrevArrow.propTypes = {
  previous: PropTypes.func.isRequired,
};

export default PrevArrow;
