import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiChevronDown, FiStar, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/cartcontext';
import { Link } from 'react-router-dom';


const SecondHeader = ({setActiveCategory,searchQuery, setSearchQuery,activeCategory, }) => {
     const { cartCount } = useCart();
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return(
        <div>
              <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center">
          
              <Link to={'/'}>
                            <h1 className="text-2xl font-bold text-indigo-600">NiqueWear</h1>
              </Link>
            </div>
            
        
            
            {/* Search and Icons */}
            <div className="flex items-center space-x-4">
            
                  <Link to={'/cart'}>
             
              <button className="p-2 text-gray-700 hover:text-indigo-600 relative">
                <FiShoppingBag size={20} />
                  {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
              </button>
                   </Link>
              <Link to={'/login'}>
               <button className="p-2 text-gray-700 hover:text-indigo-600">
                <FiUser size={20} />
                <span className="sr-only">Account</span>
              </button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Search */}
   
        </div>
      </header>

  
        </div>
    )
}

export default SecondHeader