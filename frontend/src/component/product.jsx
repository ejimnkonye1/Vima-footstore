import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiEye } from "react-icons/fi";
import AOS from 'aos';
import formatAsNaira from "../currency/naira";
import 'aos/dist/aos.css';
import productdata from '../array/productimg';
import axios from 'axios';

const Products = ({ cartItems, setCartItems }) => {
  const [pro, setproD] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    const getproduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4500/products');
        console.log('Products:', response.data);
        setproD(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    getproduct();
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 border-b pb-2">
          Featured Collection
        </h2>
        
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {productdata.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index % 4 * 100}
            >
              <Link to={`/product/${index}`} className="block relative group">
                <div className="relative pt-[100%] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${product.name}`}>
                  <h3 className="font-medium text-gray-800 mb-1 line-clamp-1 hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-emerald-600 font-semibold mb-3">
                  {formatAsNaira(product.price)}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-md text-sm transition-colors"
                  >
                    <FiShoppingCart className="text-base" />
                    <span>Add</span>
                  </button>
                  <Link 
                    to={`/product/${product.name}`}
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-md text-sm transition-colors"
                  >
                    <FiEye className="text-base" />
                    <span>View</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {pro.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index % 4 * 100}
            >
              <Link to={`/product/${product.name}`} className="block relative group">
                <div className="relative pt-[100%] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${product.name}`}>
                  <h3 className="font-medium text-gray-800 mb-1 line-clamp-1 hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-emerald-600 font-semibold mb-3">
                  {formatAsNaira(product.price)}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-md text-sm transition-colors"
                  >
                    <FiShoppingCart className="text-base" />
                    <span>Add</span>
                  </button>
                  <Link 
                    to={`/product/${product.name}`}
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-md text-sm transition-colors"
                  >
                    <FiEye className="text-base" />
                    <span>View</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
