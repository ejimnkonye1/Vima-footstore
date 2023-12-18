import React, { Component } from "react";
import Slider from "react-slick";
import img2 from '../images/leather-sandals-pair-colors-sea-removebg.png';
import img3 from '../images/29210__1_-removebg-preview.png';
import img1 from '../images/brown-man-s-leather-derby-shoes-removebg-preview.png'
import Proudcts from "./product";
import { Link } from "react-router-dom";
import AutoPlay from "./autoplayproduct";
import Testimonials from "./testmonial";

class CustomSlide extends Component {
  render() {
    const { index, imageSrc, ...props } = this.props;
    return (
      <div {...props}>
        <img src={imageSrc} alt={`Slide ${index}`} style={{ width: '90%', height: 'auto' }} className="img-fluid" />
      </div>
    );
  }
}

export default class SimpleSlider extends Component {
    
  render() {
    const { cartItems, setCartItems } = this.props;
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
  };

    const images = [img1, img3];

    return (
        <div>
      <div className="" style={{backgroundColor:'gray', marginTop:'', overflow:'hidden'}}>
        
        <Slider {...settings}>
          {images.map((image, index) => (
            <CustomSlide key={index} index={index + 1} imageSrc={image}  />
          ))}
        </Slider>
      </div>
      <Proudcts cartItems={cartItems} setCartItems={setCartItems} />
    {/* <Visit /> */}
    <div className='d-flex justify-content-center mb-4'>
    <Link to='/Cat'>
      <button  className='btn btn-danger '>
        
       
        VIEW ALL
       
        </button>
        </Link>
    </div>
    <AutoPlay cartItems={cartItems} setCartItems={setCartItems} />
    <Testimonials />
      </div>
    );
  }
}
