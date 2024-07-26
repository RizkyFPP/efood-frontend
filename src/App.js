// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import CartView from "./components/CartView";
import LandingPage from "./components/LandingPage";
import ContactUs from "./components/ContactUs";
import "./App.css";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for ToastContainer

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/:productId" element={<Checkout />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          <ToastContainer /> {/* Add ToastContainer for notifications */}
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
