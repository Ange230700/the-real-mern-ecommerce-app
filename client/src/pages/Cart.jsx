import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { Add, Remove } from "@material-ui/icons";

import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

import { userRequest } from "../requestMethods";

const KEY = import.meta.env.VITE_STRIPE_KEY;

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken, cart, navigate]);

  return (
    <div className="cart-container">
      <Announcement />
      <Navbar />
      <div className="cart-wrapper">
        <h1 className="cart-title">YOUR BAG</h1>
        <div className="cart-top">
          <button type="button" className="cart-top-button">
            CONTINUE SHOPPING
          </button>
          <div className="cart-top-texts">
            <span className="cart-top-text">Shopping Bag(2)</span>
            <span className="cart-top-text">Your Wishlist (0)</span>
          </div>
          <button
            type="button"
            className="cart-top-button cart-top-button-filled"
          >
            CHECKOUT NOW
          </button>
        </div>
        <div className="cart-bottom">
          <div className="cart-info">
            {cart.products.map((product) => (
              <div className="cart-product" key={product._id}>
                <div className="cart-product-detail">
                  <img
                    className="cart-image"
                    src={product.img}
                    alt="cart pic"
                  />
                  <div className="cart-details">
                    <span className="cart-product-name">
                      <b>Product:</b> {product.title}
                    </span>
                    <span className="cart-product-id">
                      <b>ID:</b> {product._id}
                    </span>
                    <div
                      className="cart-product-color"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="cart-product-size">
                      <b>Size:</b> {product.size}
                    </span>
                  </div>
                </div>
                <div className="cart-price-detail">
                  <div className="cart-product-amount-container">
                    <Add />
                    <div className="cart-product-amount">
                      {product.quantity}
                    </div>
                    <Remove />
                  </div>
                  <div className="cart-product-price">
                    $ {product.price * product.quantity}
                  </div>
                </div>
              </div>
            ))}
            <hr className="cart-hr" />
          </div>
          <div className="cart-summary">
            <h1 className="cart-summary-title">ORDER SUMMARY</h1>
            <div className="cart-summary-item">
              <span className="cart-summary-item-text">Subtotal</span>
              <span className="cart-summary-item-price">$ {cart.total}</span>
            </div>
            <div className="cart-summary-item">
              <span className="cart-summary-item-text">Estimated Shipping</span>
              <span className="cart-summary-item-price">$ 5.90</span>
            </div>
            <div className="cart-summary-item">
              <span className="cart-summary-item-text">Shipping Discount</span>
              <span className="cart-summary-item-price">$ -5.90</span>
            </div>
            <div className="cart-summary-item cart-summary-item-total">
              <span className="cart-summary-item-text">Total</span>
              <span className="cart-summary-item-price">$ {cart.total}</span>
            </div>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <button type="button" className="cart-button">
                CHECKOUT NOW
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
