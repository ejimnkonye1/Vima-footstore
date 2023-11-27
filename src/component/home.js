import React, { useState, useEffect } from 'react';
import img0 from '../images/soft-woolen-baby-booties-handmade-with-elegance-generated-by-ai-removebg.png';

import img73 from '../images/soft-woolen-baby-booties-handmade-with-elegance-generated-by-ai-removebg.png';
import Proudcts from './product';
import Visit from './visit';
import '../css/home.css';
import AOS from "aos";
import 'aos/dist/aos.css';
import '../css/aninat.css';
import img1 from '../images/brown-man-s-leather-derby-shoes-removebg-preview.png'
import img2 from '../images/leather-sandals-pair-colors-sea-removebg.png'
import img3 from '../images/soft-woolen-baby-booties-handmade-with-elegance-generated-by-ai-removebg.png'
import { Link } from 'react-router-dom';

const Home = ({ cartItems, setCartItems }) => {
  
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming you have 3 slides
    }, 5000); // Change the interval as needed (in milliseconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

 
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
   <section className="ani">
            <div className="slider-wrapper">
                <div className="slider">
                    <div className="slide">
                        <div className="slide-content">
                            <img id="slide-1" src={img3} alt="Slide 1" />
                            <p>LET MAKE</p>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="slide-content">
                            <img id="slide-2" src={img2} height={'80%'} alt="Slide 2" />
                            <p>OUR HOPE YOUR</p>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="slide-content">
                            <img id="slide-3" src={img3} alt="Slide 3" />
                            <p>WE HAVE</p>
                        </div>
                    </div>
                </div>
                <div className="slider-nav">
                    <a href="#slide-1"></a>
                    <a href="#slide-2"></a>
                    <a href="#slide-3"></a>
                </div>
            </div>
        </section>

</div>


    <Proudcts cartItems={cartItems} setCartItems={setCartItems} />
    {/* <Visit /> */}
    <div className='d-flex justify-content-center'>
    <Link to='/Cat'>
      <button  className='btn btn-danger '>
        
       
        VIEW ALL
       
        </button>
        </Link>
    </div>
    </div>
  );
};

export default Home;
