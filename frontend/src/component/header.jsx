import { useState } from 'react';
import { FiSearch, FiShoppingBag, FiUser , FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/cartcontext';
import { Link } from 'react-router-dom';

const Header = ({ setActiveCategory, searchQuery, setSearchQuery, activeCategory }) => {
  const { cartCount, cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                className={`py-2 font-medium ${activeCategory === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                onClick={() => setActiveCategory('all')}
              >
                All Products
              </button>
              <button 
                className={`py-2 font-medium ${activeCategory === 'men' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                onClick={() => setActiveCategory('men')}
              >
                Men
              </button>
              <button 
                className={`py-2 font-medium ${activeCategory === 'women' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                onClick={() => setActiveCategory('women')}
              >
                Women
              </button>
              <button 
                className={`py-2 font-medium ${activeCategory === 'kids' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                onClick={() => setActiveCategory('kids')}
              >
                Kids
              </button>
            </nav>
            
            {/* Search and Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <Link to={'/cart'}>
                <button className="p-2 text-gray-700 hover:text-indigo-600 relative">
                  <FiShoppingBag size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </Link>
              <Link to={'/login'}>
                <button className="p-2 text-gray-700 hover:text-indigo-600">
                  <FiUser  size={20} />
                  <span className="sr-only">Account</span>
                </button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="mt-4 md:hidden">
            {/* Mobile Categories as Tabs */}
            <div className="grid grid-cols-4 gap-2 mt-2">
              <button 
                className={`w-full text-center py-2 rounded-lg ${activeCategory === 'all' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => { setActiveCategory('all'); }}
              >
                All
              </button>
              <button 
                className={`w-full text-center py-2 rounded-lg ${activeCategory === 'men' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => { setActiveCategory('men'); }}
              >
                Men
              </button>
              <button 
                className={`w-full text-center py-2 rounded-lg ${activeCategory === 'women' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => { setActiveCategory('women'); }}
              >
                Women
              </button>
              <button 
                className={`w-full text-center py-2 rounded-lg ${activeCategory === 'kids' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => { setActiveCategory('kids'); }}
              >
                Kids
              </button>
            </div>
          </div>
        </div>
      </header>

  
    </div>
  );
}

export default Header;
