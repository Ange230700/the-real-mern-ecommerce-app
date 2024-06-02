import PropTypes from "prop-types";
import { ArrowRightOutlined } from "@material-ui/icons";
function NextArrow({ onClick }) {
  return (
    <div
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
      }}
      onClick={onClick}
    >
      {" "}
      <ArrowRightOutlined />{" "}
    </div>
  );
}
NextArrow.propTypes = { onClick: PropTypes.func };
export default NextArrow;
