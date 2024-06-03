import PropTypes from "prop-types";
import { ArrowRightOutlined } from "@material-ui/icons";

function NextArrow({ handleClick }) {
  return (
    <button
      type="button"
      aria-label="next button"
      className="control-btn next"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 2,
        background: "#fff7f7",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        cursor: "pointer",
        opacity: 0.5,
        border: "none",
      }}
      onClick={handleClick}
    >
      {" "}
      <ArrowRightOutlined />{" "}
    </button>
  );
}
NextArrow.propTypes = { handleClick: PropTypes.func };
export default NextArrow;
