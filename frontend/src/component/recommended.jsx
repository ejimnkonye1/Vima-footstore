import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import img1 from '../images/woman.jpg';
import img2 from '../images/women1.jpg';
import img3 from '../images/woman2.jpg';
import img4 from '../images/woman3.jpg';
import img5 from '../images/woman4.jpg';
import img6 from '../images/woman5.jpg';
import img7 from '../images/woman6.jpg';

const Recommend = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: idle, 1: right, -1: left

  const products = [
    { id: 1000, name: "Classic Loafers", price: 4000, image: img1 },
    { id: 2000, name: "Elegant Pumps", price: 3000, image: img2 },
    { id: 3000, name: "Casual Sneakers", price: 2500, image: img3 },
    { id: 4000, name: "Evening Heels", price: 4000, image: img4 },
    { id: 5000, name: "Comfy Sandals", price: 3500, image: img5 },
    { id: 6000, name: "Designer Boots", price: 5000, image: img6 },
    { id: 7000, name: "Office Flats", price: 4500, image: img7 },
  ];

  const formatAsNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      product.quantity = 1;
      setCartItems([...cartItems, product]);
    }

    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      style: {
        background: '#10b981',
        color: '#fff',
      },
    });
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => 
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => 
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  // Determine how many products to show based on screen size
  const getVisibleCount = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get the subset of products to display
  const getVisibleProducts = () => {
    const visibleProducts = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % products.length;
      visibleProducts.push(products[index]);
    }
    return visibleProducts;
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-1 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
       
        
        <div className="relative">
          <div className="flex justify-center gap-6">
            {getVisibleProducts().map((product, index) => (
              <motion.div
                key={`${product.id}-${currentIndex}`}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
                style={{ width: `${100 / visibleCount}%`, maxWidth: '300px' }}
              >
                <div className="relative pt-[100%] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-emerald-600 font-semibold mb-4">
                    {formatAsNaira(product.price)}
                  </p>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 transition-colors"
            aria-label="Previous products"
          >
            <FiChevronLeft className="text-emerald-600 text-xl" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 transition-colors"
            aria-label="Next products"
          >
            <FiChevronRight className="text-emerald-600 text-xl" />
          </button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-emerald-600' : 'bg-gray-300'}`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>

        <Toaster />
      </div>
    </section>
  );
};

export default Recommend;