import React, { useState } from "react";
import Slider from "react-slick";
import img1 from '../images/woman.jpg';
import img2 from '../images/women1.jpg';
import img3 from '../images/woman2.jpg';
import img4 from '../images/woman3.jpg';
import img5 from '../images/woman4.jpg';
import img6 from '../images/woman5.jpg';
import img7 from '../images/woman6.jpg';
import { useNavigate } from "react-router-dom";
import ColorAlerts from "../reuseable/alerts";
const Recommend = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate()
  const [showToast, setShowToast] = useState(false);
  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      product.quantity = 1;
      setCartItems([...cartItems, product]);
    }
    // navigate('./cart')
    setShowToast(true);

    // Hide the toast after a delay (adjust as needed)
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const reproducts = [
    { id: 1000, name: "Product 1", price: 4000, image: img1 },
    { id: 2000, name: "Product 2", price: 3000, image: img2 },
    { id: 3000, name: "Product 3", price: 2500, image: img3 },
    { id: 4000, name: "Product 4", price: 4000, image: img4 },
    { id: 5000, name: "Product 5", price: 3500, image: img5 },
    { id: 6000, name: "Product 6", price: 5000, image: img6 },
    { id: 7000, name: "Product 7", price: 4500, image: img7 },
  ];
  const formatAsNaira = (amount) => {
    // Format the number as currency with Naira symbol
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    });
  
    // Use the formatter to format the amount
    return formatter.format(amount);
  };
  
  // Example usage:
  const NGN = formatAsNaira();
  
  
  return (
    <div className="container" style={{ overflow: 'hidden' }}>
            {showToast && (
     <div className="custom-toast">
      <ColorAlerts />

   </div>
  )} 
      <h5 className="text-center text-danger p-2">Recommended For You</h5>
      <Slider {...settings}>
        {reproducts.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} width={'200'} height={'200'} className="ada" />
            <p>{product.name}</p>
            <p className="text-danger">{formatAsNaira(product.price)}</p>
            <button className="btn btn-success" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Recommend;
