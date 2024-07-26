import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();

  // Determine the cart item count
  const cartItemCount = cartItems ? cartItems.length : 0;

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          E-Food 🍟
        </Link>
        <div className="flex items-center">
          <Link
            to="/products"
            className="mr-6 text-lg text-white hover:text-gray-200 transition duration-300"
          >
            Products
          </Link>
          <Link to="/cart" className="relative flex items-center group">
            <img src="/favicon.svg" alt="Favicon" className="w-6 h-6 mr-1" />
            <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs group-hover:bg-red-700 transition duration-300">
              {cartItemCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
