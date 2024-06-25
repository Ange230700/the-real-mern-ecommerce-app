import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { userRequest } from "../requestMethods";
import Message from "../components/Message";
import Product from "../components/Product";

function Success() {
  const location = useLocation();
  const data = location.state.stripeData;
  const { cart } = location.state;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [order_id, setOrderId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    if (query.get("success")) {
      setMessage("Order has been created successfully. Your order number is ");
    }

    if (query.get("canceled")) {
      setMessage("Your order has been canceled.");
    }
  }, []);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            product_id: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (error) {
        console.error(error);
      }
    };
    if (data) {
      createOrder();
    }
  }, [cart, data, currentUser]);

  return (
    <div className="success-container">
      {order_id
        ? `Order has been created successfully. Your order number is ${order_id}`
        : `Successful. Your order is being prepared...`}
      {message ? <Message message={message} /> : <Product />}
      <button className="success-button" type="button">
        Go to Homepage
      </button>
    </div>
  );
}

export default Success;
