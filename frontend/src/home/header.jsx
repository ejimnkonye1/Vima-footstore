import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiSearch, FiX, FiMenu } from 'react-icons/fi';
import { RiPlantLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../images/vima_logo-removebg-preview.png';

const Header = ({ cartItems }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/searchpg/${query.toLowerCase()}`);
      setSearchOpen(false);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Men", path: "/Man" },
    { name: "Women", path: "/Woman" },
    { name: "Catalog", path: "/Cat" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 ">
        <div className="flex items-center justify-between">
          {/* Logo with eco-friendly badge */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img src={logo} alt="Vima" className="h-14 transition-transform group-hover:scale-105" />
              <div className="absolute -bottom-2 -right-2 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full flex items-center">
                <RiPlantLine className="mr-1" /> Eco
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Glass Morphism */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all
                         hover:bg-white/20 hover:backdrop-blur-sm hover:text-emerald-700
                         focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Dynamic Search Bar */}
            {isSearchOpen ? (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="hidden lg:block"
              >
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Discover sustainable fashion..."
                    className="bg-white/80 backdrop-blur-sm border-0 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 w-64"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white px-4 rounded-r-full hover:bg-emerald-700 transition-colors"
                  >
                    <FiSearch />
                  </button>
                </form>
              </motion.div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Search"
              >
                <FiSearch className="text-lg" />
              </button>
            )}

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!isSearchOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Search"
            >
              <FiSearch className="text-lg" />
            </button>

            {/* Account */}
            <Link
              to="/account"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Account"
            >
              <FiUser className="text-lg" />
            </Link>

            {/* Cart with animated counter */}
            <Link
              to="/cart"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors relative"
              aria-label="Cart"
            >
              <FiShoppingBag className="text-lg" />
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItems.length}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Menu"
            >
              <FiMenu className="text-lg" />
            </button>
          </div>
        </div>

        {/* Mobile Search Panel */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden mt-3"
            >
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sustainable products..."
                  className="flex-1 bg-white/80 backdrop-blur-sm border-0 rounded-l-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-4 rounded-r-full hover:bg-emerald-700 transition-colors"
                >
                  <FiSearch />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu - Full Screen Glass Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed inset-y-0 right-0 w-80 bg-white/90 backdrop-blur-lg shadow-xl z-50 p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-emerald-800">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <nav className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="absolute bottom-6 left-6 right-6">
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full py-3 px-4 bg-emerald-600 text-white text-center rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Login / Register
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;