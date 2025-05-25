import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiChevronDown, FiStar, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
const CategoryHeader = ({activeCategory, filteredProducts, sortOption, setSortOption}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 capitalize">
          {activeCategory === 'all' ? 'All Products' : activeCategory}
        </h2>
        <p className="text-gray-500 mt-2">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
        </p>
      </div>
      
      <div className="mt-4 md:mt-0">
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
         
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest Arrivals</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FiChevronDown className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;