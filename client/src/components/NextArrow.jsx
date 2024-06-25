import PropTypes from "prop-types";
import { ArrowRightOutlined } from "@material-ui/icons";

function NextArrow({ next }) {
  return (
    <button
      type="button"
      aria-label="next button"
      className="control-btn next"
      onClick={next}
    >
      <ArrowRightOutlined />
    </button>
  );
}

NextArrow.propTypes = {
  next: PropTypes.func.isRequired,
};

export default NextArrow;
