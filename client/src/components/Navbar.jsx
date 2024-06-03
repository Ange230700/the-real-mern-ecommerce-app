import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";

function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className="navbar-container">
      <div className="wrapper">
        <div className="navbar-left">
          <span className="navbar-language">EN</span>
          <div className="navbar-search-container">
            <input className="navbar-input" placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </div>
        </div>
        <div className="navbar-center">
          <h1 className="navbar-logo">LAMA.</h1>
        </div>
        <div className="navbar-right">
          <Link to="/register" className="navbar-menu-item">
            REGISTER
          </Link>
          <Link to="/login" className="navbar-menu-item">
            SIGN IN
          </Link>
          <Link to="/cart">
            <div className="navbar-menu-item">
              <Badge
                badgeContent={quantity}
                color="primary"
                overlap="rectangular"
              >
                <ShoppingCartOutlined />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
