import PropTypes from "prop-types";
import { ArrowRightOutlined } from "@material-ui/icons";

function NextArrow({ onClick }) {
  return (
    <button
      type="button"
      aria-label="next button"
      className="control-btn next"
      onClick={onClick}
    >
      <ArrowRightOutlined />
    </button>
  );
}

NextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NextArrow;
