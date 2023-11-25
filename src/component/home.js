import React, { useState, useEffect } from 'react';
import img1 from '../images/soft-woolen-baby-booties-handmade-with-elegance-generated-by-ai-removebg.png';

import img3 from '../images/soft-woolen-baby-booties-handmade-with-elegance-generated-by-ai-removebg.png';
import Proudcts from './product';
import Visit from './visit';
import '../css/home.css';
import AOS from "aos";
import 'aos/dist/aos.css';
const Home = ({ cartItems, setCartItems }) => {
  
  const [backgroundImages, setBackgroundImages] = useState([img1, img3]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textArray] = useState(["Let make your walking talk", "Tell us your story", "Text for Image 3"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change the interval as needed (in milliseconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [backgroundImages]);

 
  useEffect(() => {
    AOS.init({
      // You can customize AOS options here if needed
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div>
   <div className='container-fluid cont p-5'>
  <div className='img 'data-aos="fade-down">
    <img src={backgroundImages[currentImageIndex]} alt="Slippers" className='hero' />
    
  </div>
  <div className='d-flex justify-content-center mr-auto text'data-aos="fade-up"><h5>{textArray[currentImageIndex]}</h5></div>
</div>


    <Proudcts cartItems={cartItems} setCartItems={setCartItems} />
    <Visit />
    </div>
  );
};

export default Home;
