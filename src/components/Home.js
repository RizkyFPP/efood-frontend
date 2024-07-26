import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css"; // Import CSS for styling

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to format price to IDR
  const formatPriceToIDR = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Minimum fraction digits for IDR
    }).format(price);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-l w-64 focus:outline-none"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-300">
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-item">
            <Link to={`/products/${product._id}`} className="block group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.name}
                  className="object-cover w-full h-48 transition transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <p className="text-white text-lg font-semibold">
                    View Details
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-lg mb-2 text-gray-700">
                  {formatPriceToIDR(product.price)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
