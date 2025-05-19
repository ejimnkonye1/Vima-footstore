import React, { Component } from "react";
import Slider from "react-slick";
import img2 from '../images/leather-sandals-pair-colors-sea-removebg.png';
import img3 from '../images/29210__1_-removebg-preview.png';
import img1 from '../images/brown-man-s-leather-derby-shoes-removebg-preview.png'
import Proudcts from "../component/product";
import { Link } from "react-router-dom";
// import AutoPlay from "../component/autoplayproduct";
import Testimonials from "./testmonial";
import '../css/hero.css'
// import ProductCarousel from "../component/autoplayproduct";
import { FiArrowRight } from "react-icons/fi";


export default function Homepage ({ cartItems, setCartItems } ){

    return (
        <div>
 
      <Proudcts cartItems={cartItems} setCartItems={setCartItems} />
   
      <div className="flex justify-center my-8">
      <Link to="/Cat">
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          VIEW ALL
          <FiArrowRight className="text-lg" />
        </button>
      </Link>
    </div>
    {/* <ProductCarousel cartItems={cartItems} setCartItems={setCartItems} /> */}
    <Testimonials />
      </div>
    );
  }

