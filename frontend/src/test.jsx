import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiChevronDown, FiStar, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Header from './new/header';
import CategoryHeader from './new/categoryheader';
import FilterSidebar from './new/filtersidebar';
import Quickview from './new/quickview';
import Products from './new/product';
import Pagination from './new/pagination';

const ECommerceStore = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState([0, 100000]); // Increased max price
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Items per page

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);


  // Fetch products based on active category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        let endpoint = 'http://localhost:4500/products';
        
        if (activeCategory === 'men') {
          endpoint = 'http://localhost:4500/products/men';
        } else if (activeCategory === 'women') {
          endpoint = 'http://localhost:4500/products/women';
        }

        const response = await axios.get(endpoint);
        console.log("res", response)
        // Ensure price is treated as number
        const formattedProducts = response.data.map(p => ({
          ...p,
          price: typeof p.price === 'string' ? parseFloat(p.price) : p.price
        }));
        console.log(response.data)
        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // Filter products based on search and price
  useEffect(() => {
    let result = [...products];
    
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
    
    setFilteredProducts(result);
  }, [products, searchQuery, priceFilter]);



  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setPriceFilter([0, 50000]);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, priceFilter]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
      
      />

      {loading && (
        <div className="text-center py-8">
          <p>Loading products...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <main className="container mx-auto px-4 py-8">
          <CategoryHeader 
            activeCategory={activeCategory}
            filteredProducts={filteredProducts}
          />

          <div className="flex flex-col md:flex-row gap-8">
            <FilterSidebar 
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
            />
            
            <div className="flex-1">
            <Products
         
            resetFilters={resetFilters}
         filteredProducts={currentProducts}
         setQuickViewProduct={setQuickViewProduct}
             />
                   <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>
            </div>
          </div>
        </main>
      )}

      <AnimatePresence>
        {quickViewProduct && (
         <Quickview 
         setQuickViewProduct={setQuickViewProduct}
         quickViewProduct={quickViewProduct}
         />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ECommerceStore;