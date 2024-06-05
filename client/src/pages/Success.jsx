import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router"; // eslint-disable-line

import { userRequest } from "../requestMethods";

function Success() {
  const location = useLocation();
  const data = location.state.stripeData;
  const { cart } = location.state;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [order_id, setOrderId] = useState(null);

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
      <button className="success-button" type="button">
        Go to Homepage
      </button>
    </div>
  );
}

export default Success;
