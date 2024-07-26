import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeCartItem } = useCart();

  const handleRemoveItem = (itemId) => {
    removeCartItem(itemId);
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cart.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-600 font-bold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <Link to="/products" className="text-blue-600">
          Continue Shopping
        </Link>
        <div>
          <p className="font-bold">Total: ${calculateTotalAmount()}</p>
          <Link to="/checkout">
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
