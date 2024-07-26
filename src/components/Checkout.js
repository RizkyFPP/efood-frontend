// src/components/Checkout.js
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

const Checkout = () => {
  const {
    cartItems,
    calculateTotalPrice,
    resetNotificationCount,
    getCartItemCount,
  } = useCart();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [checkoutError, setCheckoutError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        items: cartItems,
        grossAmount: calculateTotalPrice(),
        customerDetails,
      });

      const { token } = response.data;

      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("Payment success:", result);
          setIsProcessing(true);
          resetNotificationCount(); // Reset the notification count here
          updateFaviconBadge(0); // Reset the favicon badge
          setTimeout(() => {
            setIsProcessing(false);
            navigate("/products");
          }, 3000); // Show the message for 3 seconds
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
        },
        onError: (result) => {
          console.log("Payment error:", result);
        },
        onClose: () => {
          console.log("Payment popup closed without completing payment");
        },
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      setCheckoutError("Payment failed. Please try again later.");
    }
  };

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (favicon) {
      updateFaviconBadge(getCartItemCount());
    }
  }, [cartItems, getCartItemCount]);

  const updateFaviconBadge = (count) => {
    const favicon = document.getElementById("favicon");
    if (!favicon) return;

    const canvas = document.createElement("canvas");
    const img = document.createElement("img");

    img.src = favicon.href;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      if (count > 0) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(canvas.width - 10, 10, 10, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(count, canvas.width - 10, 10);
      }
      favicon.href = canvas.toDataURL("image/png");
    };
  };

  if (isProcessing) {
    return (
      <div className="processing-message">
        Your order is being processed🙏...
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2>Customer Details</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={customerDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={customerDetails.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={customerDetails.address}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="checkout-card">
        <h2>Order Summary</h2>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="item-details">
                <p>{item.name}</p>
                <p>
                  {item.price} x {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="subtotal">
          <p>Subtotal</p>
          <p>{calculateTotalPrice()}</p>
        </div>
        <button onClick={handleCheckout} className="checkout-button">
          Checkout
        </button>
        {checkoutError && <p className="checkout-error">{checkoutError}</p>}
      </div>
    </div>
  );
};

export default Checkout;
