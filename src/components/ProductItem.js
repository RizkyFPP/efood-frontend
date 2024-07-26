import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/ProductItem.css";

const ProductItem = ({ product }) => {
  // Format price in IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="product-item border p-4 rounded relative">
      <img
        src={`http://localhost:5000${product.imageUrl}`}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded product-image"
      />
      <h3 className="text-xl font-bold mb-2 product-name">{product.name}</h3>
      <p className="text-lg mb-4 product-price">{formatPrice(product.price)}</p>
      <Link
        to={{
          pathname: `/checkout/${product._id}`,
          state: { product },
        }}
        className="bg-green-500 text-white px-4 py-2 rounded checkout-button"
      >
        Checkout
      </Link>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItem;
