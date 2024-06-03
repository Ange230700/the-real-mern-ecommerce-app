import PropTypes from "prop-types";
import { ArrowLeftOutlined } from "@material-ui/icons";

function PrevArrow({ handleClick }) {
  return (
    <button
      type="button"
      aria-label="previous button"
      className="control-btn prev"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "10px",
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
      <ArrowLeftOutlined />{" "}
    </button>
  );
}
PrevArrow.propTypes = { handleClick: PropTypes.func };
export default PrevArrow;
