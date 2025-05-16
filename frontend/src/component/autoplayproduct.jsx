import React, { useState } from "react";
import Slider from "react-slick";
import { FiShoppingCart, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import img1 from '../images/woman.jpg';
import img2 from '../images/women1.jpg';
import img3 from '../images/woman2.jpg';
import img4 from '../images/woman3.jpg';
import img5 from '../images/woman4.jpg';
import img6 from '../images/woman5.jpg';
import img7 from '../images/woman6.jpg';

const ProductCarousel = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

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
      duration: 3000,
      style: {
        background: '#10b981',
        color: '#fff',
      },
    });
  };

  const formatAsNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const products = [
    { id: 100, name: "Classic Loafers", price: 4000, image: img1 },
    { id: 200, name: "Elegant Pumps", price: 3000, image: img2 },
    { id: 300, name: "Casual Sneakers", price: 2500, image: img3 },
    { id: 400, name: "Evening Heels", price: 4000, image: img4 },
    { id: 500, name: "Comfy Sandals", price: 3500, image: img5 },
    { id: 600, name: "Designer Boots", price: 5000, image: img6 },
    { id: 700, name: "Office Flats", price: 4500, image: img7 },
  ];

  const NextArrow = ({ onClick }) => (
    <button 
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-emerald-50 transition-all"
      aria-label="Next products"
    >
      <FiChevronRight className="text-emerald-600 text-xl" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button 
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-emerald-50 transition-all"
      aria-label="Previous products"
    >
      <FiChevronLeft className="text-emerald-600 text-xl" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false
        }
      }
    ]
  };

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
          Featured Collection
        </h2>
        
        <div className="relative">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-2 focus:outline-none">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative pt-[100%] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-emerald-600 font-semibold mb-4">{formatAsNaira(product.price)}</p>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="mt-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <Toaster />
      </div>
    </section>
  );
};

export default ProductCarousel;