import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useCart } from "../context/CartContext";
import axios from "axios";
import Notification from "./Notification";
import "../styles/Product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [notification, setNotification] = useState(null);

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
    setNotification(`${product.name} added to cart!`);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="products-container">
      <h2 className="title">Products</h2>
      {notification && (
        <Notification message={notification} onClose={closeNotification} />
      )}
      <div className="product-grid">
        {products.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
