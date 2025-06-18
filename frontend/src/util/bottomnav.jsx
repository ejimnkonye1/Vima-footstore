import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaStore, FaShoppingCart, FaUser } from "react-icons/fa";

function BottomNavbar() {
  return (
    <div className="lg:hidden fixed bottom-0  left-0 right-0 bg-white shadow-md z-50">
      <div className="border-t border-gray-200">
        <ul className="flex justify-around items-center py-2">
          <li className="flex-1 text-center">
            <Link 
              to="/" 
              className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <FaHome className="text-xl" />
              <span className="text-xs mt-1">Home</span>
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link 
              to="/Cat" 
              className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <FaStore className="text-xl" />
              <span className="text-xs mt-1">Shop</span>
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link 
              to="/cart" 
              className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <div className="relative">
                <FaShoppingCart className="text-xl" />
                {/* Uncomment if you want to show cart count */}
                {/* {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )} */}
              </div>
              <span className="text-xs mt-1">Cart</span>
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link 
              to="/login" 
              className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <FaUser className="text-xl" />
              <span className="text-xs mt-1">Account</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BottomNavbar;