import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, getCartItemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const cartItemCount = getCartItemCount();

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img
            src={`http://localhost:5000${product.imageUrl}`}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
      <button onClick={handleGoToCart} className="view-cart-button">
        <div className="cart-icon-container">
          <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </div>
      </button>
    </div>
  );
};

export default ProductList;
