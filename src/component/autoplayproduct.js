import React, { Component } from "react";
import Slider from "react-slick";
import img1 from '../images/woman.jpg';
import img2 from '../images/women1.jpg';
import img3 from '../images/woman2.jpg';
import img4 from '../images/woman3.jpg';
import img5 from '../images/woman4.jpg';
import img6 from '../images/woman5.jpg';
import img7 from '../images/woman6.jpg';

export default class AutoPlay extends Component {
  render() {
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
        breakpoint: 768, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

    const autoproducts = [
      { id: 1, name: "Product 1", price: 4000, image: img1 },
      { id: 2, name: "Product 2", price: 3000, image: img2 },
      { id: 3, name: "Product 3", price: 2500, image: img3 },
      { id: 4, name: "Product 4", price: 4000, image: img4 },
      { id: 5, name: "Product 5", price: 3500, image: img5 },
      { id: 6, name: "Product 6", price: 5000, image: img6 },
      { id: 7, name: "Product 7", price: 4500, image: img7 },
    ];

    return (
      <div className="container" style={{  overflow: 'hidden'      }}>
      
        
        <Slider {...settings}>
          {autoproducts.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.name} width={'200'} height={'200'} className="ada"/>
              <h5>{product.name}</h5>
              <p className="text-danger">NGN:{product.price}</p>
              <button className="btn btn-success" onClick={() => this.addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  addToCart(product) {
    // Implement your logic to add the product to the cart
    console.log(`Product added to cart: ${product.name}`);
  }
}
