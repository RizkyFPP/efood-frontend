import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/CartView.css";

const CartView = () => {
  const { cartItems, removeFromCart, updateQuantity, calculateTotalPrice } =
    useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div>
        <h2>Your Cart</h2>
        <p>
          Your cart is empty.{" "}
          <button onClick={() => navigate("/products")}>Browse Products</button>
        </p>
      </div>
    );
  }

  return (
    <div className="cart-view">
      <h2>Your Cart</h2>
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
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item._id, parseInt(e.target.value, 10))
                }
                min="1"
              />
              <button
                onClick={() => removeFromCart(item._id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Subtotal: {calculateTotalPrice()}</p>
        <button
          onClick={() => navigate("/checkout")}
          className="checkout-button"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartView;
