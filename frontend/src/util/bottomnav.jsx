import React from "react";
import { Link } from "react-router-dom";

function BottomNavbar({ }) {
  // Calculate the cart item count


  return (
    <div className="bot d-lg-none fixed-bottom bg-white bot">
      <div className="border-top">
        <ul className="nav nav-pills nav-justified">
          <li className="nav-item text-center">
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i>
              <div>Home</div>
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link to="/Cat" className="nav-link">
              <i className="fas fa-store"></i>
              <div>Shop</div>
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link to="/cart" className="nav-link">
              <i className="fas fa-shopping-cart"></i>
              <div>Cart</div>
            
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link to="/login" className="nav-link">
              <i className="fas fa-user"></i>
              <div>Account</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BottomNavbar;
