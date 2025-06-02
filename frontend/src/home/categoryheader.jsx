import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiChevronDown, FiStar, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
const CategoryHeader = ({activeCategory, filteredProducts, sortOption, setSortOption}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h2 className="md:text-3xl text-lg font-bold text-gray-900 capitalize">
          {activeCategory === 'all' ? 'All Products' : activeCategory}
        </h2>
        <p className="text-gray-500 mt-2">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
        </p>
      </div>
      
  
    </div>
  );
};

export default CategoryHeader;