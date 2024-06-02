import PropTypes from "prop-types";
import { ArrowLeftOutlined } from "@material-ui/icons";

function PrevArrow({ onClick }) {
  return (
    <div
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
      }}
      onClick={onClick}
    >
      {" "}
      <ArrowLeftOutlined />{" "}
    </div>
  );
}
PrevArrow.propTypes = { onClick: PropTypes.func };
export default PrevArrow;
