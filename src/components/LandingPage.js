import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="#">Home</Link>
          </li>
          <li>
            <Link to="/products">Menu</Link>
          </li>
          <li>
            <Link to="/contact">ContactUs</Link>
          </li>
        </ul>
      </nav>
      <header className="header">
        <div className="header-content">
          <h1>E-Food</h1>
          <p>Traditional Food With High Quality</p>
          <Link to="/products" className="order-button">
            Order Online
          </Link>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
