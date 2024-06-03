import PropTypes from "prop-types";
import { ArrowRightOutlined } from "@material-ui/icons";

function NextArrow(props = {}) {
  const { onClick } = props;

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
NextArrow.propTypes = { onClick: PropTypes.func };
export default NextArrow;
