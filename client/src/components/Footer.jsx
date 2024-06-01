import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <h1 className="footer-logo">LAMA.</h1>
        <p className="footer-desc">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>
        <div className="footer-social-container">
          <div className="footer-social-icon" color="3B5999">
            <Facebook />
          </div>
          <div className="footer-social-icon" color="E4405F">
            <Instagram />
          </div>
          <div className="footer-social-icon" color="55ACEE">
            <Twitter />
          </div>
          <div className="footer-social-icon" color="E60023">
            <Pinterest />
          </div>
        </div>
      </div>
      <div className="footer-center">
        <h3 className="footer-title">Useful Links</h3>
        <ul className="footer-list">
          <li className="footer-list-item">Home</li>
          <li className="footer-list-item">Cart</li>
          <li className="footer-list-item">Man Fashion</li>
          <li className="footer-list-item">Woman Fashion</li>
          <li className="footer-list-item">Accessories</li>
          <li className="footer-list-item">My Account</li>
          <li className="footer-list-item">Order Tracking</li>
          <li className="footer-list-item">Wishlist</li>
          <li className="footer-list-item">Wishlist</li>
          <li className="footer-list-item">Terms</li>
        </ul>
      </div>
      <div className="footer-right">
        <h3 className="footer-title">Contact</h3>
        <div className="footer-contact-item">
          <Room style={{ marginRight: "10px" }} /> 622 Dixie Path , South
          Tobinchester 98336
        </div>
        <div className="footer-contact-item">
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </div>
        <div className="footer-contact-item">
          <MailOutline style={{ marginRight: "10px" }} /> contact@lama.dev
        </div>
        <img
          className="footer-payment"
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt="payment"
        />
      </div>
    </div>
  );
}

export default Footer;
