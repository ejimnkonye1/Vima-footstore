import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaStore, FaShoppingCart, FaUser } from "react-icons/fa";

function BottomNavbar() {
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="border-t border-gray-200">
        <ul className="flex justify-around items-center py-2">
          <li className="flex-1 text-center">
            <Link 
              to="/" 
              className={`flex flex-col items-center justify-center p-2 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <FaHome className="text-xl" />
              <span className="text-xs mt-1">Home</span>
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link 
              to="/" 
              className={`flex flex-col items-center justify-center p-2 ${location.pathname === '/shop' ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <FaStore className="text-xl" />
              <span className="text-xs mt-1">Shop</span>
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link 
              to="/cart" 
              className={`flex flex-col items-center justify-center p-2 ${location.pathname === '/cart' ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <div className="relative">
                <FaShoppingCart className="text-xl" />
              </div>
              <span className="text-xs mt-1">Cart</span>
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link 
              to="/login" 
              className={`flex flex-col items-center justify-center p-2 ${location.pathname === '/login' ? 'text-blue-600' : 'text-gray-500'}`}
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
