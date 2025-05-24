import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiChevronDown, FiStar, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ECommerceStore = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [priceFilter, setPriceFilter] = useState([0, 500]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Sample product data
  useEffect(() => {
    const sampleProducts = [
      // Men's products
      { id: 1, name: 'TechFit Running Shirt', price: 49.99, category: 'men', colors: ['black', 'navy', 'white'], sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, image: '/men-shirt.jpg', isNew: true, isSustainable: true },
      { id: 2, name: 'Urban Chino Pants', price: 79.99, category: 'men', colors: ['khaki', 'black', 'olive'], sizes: ['28', '30', '32', '34'], rating: 4.2, image: '/men-pants.jpg', isBestSeller: true },
      
      // Women's products
      { id: 3, name: 'Yoga High-Waist Leggings', price: 59.99, category: 'women', colors: ['black', 'charcoal', 'burgundy'], sizes: ['XS', 'S', 'M', 'L'], rating: 4.8, image: '/women-leggings.jpg', isNew: true },
      { id: 4, name: 'Oversized Blazer', price: 129.99, category: 'women', colors: ['beige', 'black'], sizes: ['S', 'M', 'L'], rating: 4.3, image: '/women-blazer.jpg', isSustainable: true },
      
      // Kids' products
      { id: 5, name: 'Unicorn Graphic Tee', price: 24.99, category: 'kids', colors: ['pink', 'white', 'lavender'], sizes: ['4', '6', '8', '10'], rating: 4.7, image: '/kids-tee.jpg', isBestSeller: true },
      { id: 6, name: 'Stretch Denim Jeans', price: 34.99, category: 'kids', colors: ['blue', 'black'], sizes: ['4', '5', '6', '7'], rating: 4.1, image: '/kids-jeans.jpg' }
    ];
    
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  // Filter products based on category, search, filters
  useEffect(() => {
    let result = [...products];
    
    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Search filter
if (searchQuery) {
  result = result.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
    
    // Price filter
    result = result.filter(product => 
      product.price >= priceFilter[0] && product.price <= priceFilter[1]
    );
    
    // Color filter
    if (colorFilter.length > 0) {
      result = result.filter(product =>
        colorFilter.some(color => product.colors.includes(color))
      );
    }
    
    // Size filter
    if (sizeFilter.length > 0) {
      result = result.filter(product =>
        sizeFilter.some(size => product.sizes.includes(size))
      );
    }
    
    // Sort products
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming newer products have higher IDs
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // 'featured' - default sorting
        break;
    }
    
    setFilteredProducts(result);
  }, [activeCategory, searchQuery, sortOption, priceFilter, colorFilter, sizeFilter, products]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    // Show confirmation (could be a toast notification)
  };

  const toggleColorFilter = (color) => {
    if (colorFilter.includes(color)) {
      setColorFilter(colorFilter.filter(c => c !== color));
    } else {
      setColorFilter([...colorFilter, color]);
    }
  };

  const toggleSizeFilter = (size) => {
    if (sizeFilter.includes(size)) {
      setSizeFilter(sizeFilter.filter(s => s !== size));
    } else {
      setSizeFilter([...sizeFilter, size]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center">
              <button 
                className="md:hidden mr-4 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FiMenu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-indigo-600">FashionHub</h1>
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
              <button className="p-2 text-gray-700 hover:text-indigo-600 relative">
                <FiHeart size={20} />
                <span className="sr-only">Wishlist</span>
              </button>
              <button className="p-2 text-gray-700 hover:text-indigo-600 relative">
                <FiShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-700 hover:text-indigo-600">
                <FiUser size={20} />
                <span className="sr-only">Account</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-indigo-600">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <FiX size={24} className="text-gray-500" />
              </button>
            </div>
            <nav className="p-4 space-y-4">
              <button 
                className={`block w-full text-left py-2 px-4 rounded-lg ${activeCategory === 'all' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => { setActiveCategory('all'); setMobileMenuOpen(false); }}
              >
                All Products
              </button>
              <button 
                className={`block w-full text-left py-2 px-4 rounded-lg ${activeCategory === 'men' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => { setActiveCategory('men'); setMobileMenuOpen(false); }}
              >
                Men
              </button>
              <button 
                className={`block w-full text-left py-2 px-4 rounded-lg ${activeCategory === 'women' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => { setActiveCategory('women'); setMobileMenuOpen(false); }}
              >
                Women
              </button>
              <button 
                className={`block w-full text-left py-2 px-4 rounded-lg ${activeCategory === 'kids' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => { setActiveCategory('kids'); setMobileMenuOpen(false); }}
              >
                Kids
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 capitalize">
              {activeCategory === 'all' ? 'All Products' : activeCategory}
            </h2>
            <p className="text-gray-500 mt-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          {/* Sort Options */}
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
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
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="font-medium text-lg mb-4 flex items-center">
                <FiFilter className="mr-2" />
                Filters
              </h3>
              
              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">${priceFilter[0]}</span>
                  <span className="text-sm text-gray-500">${priceFilter[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceFilter[1]}
                  onChange={(e) => setPriceFilter([priceFilter[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {['black', 'white', 'navy', 'khaki', 'olive', 'pink', 'blue', 'beige', 'charcoal', 'burgundy', 'lavender'].map(color => (
                    <button
                      key={color}
                      onClick={() => toggleColorFilter(color)}
                      className={`w-8 h-8 rounded-full border-2 ${colorFilter.includes(color) ? 'border-indigo-600' : 'border-gray-200'} ${color === 'white' ? 'bg-white' : `bg-${color}-500`}`}
                      style={{ backgroundColor: color === 'white' ? '#fff' : color === 'navy' ? '#001f3f' : color === 'khaki' ? '#f0e68c' : color === 'olive' ? '#808000' : color === 'charcoal' ? '#36454f' : color === 'burgundy' ? '#800020' : color }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    >
                      <span className="sr-only">{color}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '4', '5', '6', '7', '8', '10'].map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSizeFilter(size)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md border ${sizeFilter.includes(size) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => {
                  setPriceFilter([0, 500]);
                  setColorFilter([]);
                  setSizeFilter([]);
                }}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          </aside>
          
          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                    setPriceFilter([0, 500]);
                    setColorFilter([]);
                    setSizeFilter([]);
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative">
                      {/* Product Image */}
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">Product Image</span>
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {product.isNew && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                            New
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                            Bestseller
                          </span>
                        )}
                        {product.isSustainable && (
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                            Sustainable
                          </span>
                        )}
                      </div>
                      
                      {/* Quick View */}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white text-gray-800 text-sm font-medium rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Quick View
                      </button>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                              className="w-4 h-4" 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
                        >
                          <FiShoppingBag size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md z-10"
                >
                  <FiX size={20} />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Product Images */}
                  <div className="bg-gray-100 p-6">
                    <div className="aspect-square bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500">Product Images</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 rounded cursor-pointer"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{quickViewProduct.name}</h2>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              fill={i < Math.floor(quickViewProduct.rating) ? 'currentColor' : 'none'} 
                              className="w-4 h-4" 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">({quickViewProduct.rating}) | 42 reviews</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-gray-900">${quickViewProduct.price.toFixed(2)}</span>
                      {quickViewProduct.price > 75 && (
                        <span className="ml-2 text-sm text-gray-500">or 4 interest-free payments of ${(quickViewProduct.price / 4).toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-2">Color</h3>
                      <div className="flex space-x-2">
                        {quickViewProduct.colors.map(color => (
                          <button
                            key={color}
                            className={`w-10 h-10 rounded-full border-2 border-gray-200 ${color === 'white' ? 'bg-white' : `bg-${color}-500`}`}
                            style={{ backgroundColor: color === 'white' ? '#fff' : color === 'navy' ? '#001f3f' : color === 'khaki' ? '#f0e68c' : color === 'olive' ? '#808000' : color === 'charcoal' ? '#36454f' : color === 'burgundy' ? '#800020' : color }}
                            title={color.charAt(0).toUpperCase() + color.slice(1)}
                          >
                            <span className="sr-only">{color}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-2">Size</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {quickViewProduct.sizes.map(size => (
                          <button
                            key={size}
                            className="py-2 border border-gray-300 rounded-md hover:border-gray-400 text-center"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">
                        Size Guide
                      </button>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                      <p className="text-gray-600">
                        High-quality {quickViewProduct.category}'s {quickViewProduct.name.toLowerCase()} designed for comfort and style. Perfect for everyday wear with premium materials and craftsmanship.
                      </p>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          addToCart(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-medium"
                      >
                        Add to Cart
                      </button>
                      <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100">
                        <FiHeart size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>Free shipping on orders over $50</span>
                        <span>Returns within 30 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ECommerceStore;