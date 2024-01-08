import React, { Component } from "react";
import Slider from "react-slick";
import img2 from '../images/leather-sandals-pair-colors-sea-removebg.png';
import img3 from '../images/29210__1_-removebg-preview.png';
import img1 from '../images/brown-man-s-leather-derby-shoes-removebg-preview.png'
import Proudcts from "./product";
import { Link } from "react-router-dom";
import AutoPlay from "./autoplayproduct";
import Testimonials from "./testmonial";
import '../css/hero.css'

class CustomSlide extends Component {
  render() {
    const { index, imageSrc,text, ...props } = this.props;
    return (
      <div {...props} className="">
        <img src={imageSrc} alt={`Slide ${index}`} style={{ width: '', height: '' }} className="img-fluid slider" />
        <div className="slide-text ">
          <h5 className="text-center text-primary">{text.title}</h5>
          <p className="text-center text-danger">{text.description}</p>
        </div>
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
  const slides = [
    {
      image: img1,
      text: {
        title: "We Love It Too Simple",
        description: "Some representative placeholder content for the first slide."
      }
    },
    {
      image: img3,
      text: {
        title: "What Footprints....",
        description: "Let make your walking do the talking."
      }
    }
  ];

    return (
        <div>
      {/* <div className="heros" style={{backgroundColor:'gray', marginTop:'', overflow:'hidden', height:'530px'}}>
        
        <Slider {...settings}>
        {slides.map((slide, index) => (
              <CustomSlide key={index} index={index + 1} imageSrc={slide.image} text={slide.text}  />
            ))}
          
        </Slider>
      </div> */}
      <Proudcts cartItems={cartItems} setCartItems={setCartItems} />
    {/* <Visit /> */}
    <div className='d-flex justify-content-center mb-4'>
    <Link to='/Cat'>
      <button  className='btn btn-primary '>
        
       
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
