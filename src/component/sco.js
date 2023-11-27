import React, { useState } from "react";
import '../css/sco.css';
import img1 from '../images/pro1.jpg';
import img2 from '../images/pro2.jpg';
import img3 from '../images/pro3.jpg';
import img4 from '../images/pro4.jpg';
import img5 from '../images/pro5.jpg';
import img6 from '../images/pro6.jpg';

const YES = () => {
  const Visitdata = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1.',
      image: img1,
      price: '$19.99',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2.',
      image: img2,
      price: '$19.99',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description of Product 3.',
      image: img3,
      price: '$19.99',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description of Product 4.',
      image: img4,
      price: '$19.99',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description of Product 5.',
      image: img5,
      price: '$19.99',
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description of Product 6.',
      image: img6,
      price: '$19.99',
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % Visitdata.length);
  };

  const handleBack = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + Visitdata.length) % Visitdata.length);
  };

  return (
    <div className="container" style={{ display: "flex", alignItems: "center" }}>
      <i className="fas fa-arrow-left" onClick={handleBack} style={{ fontSize: "2em", cursor: "pointer", marginRight: "10px" }}></i>
      {Visitdata.slice(startIndex, startIndex + 4).map((product) => (
        <div key={product.id} className="col-md-3">
          <div className="">
            <img src={product.image} className="card-img-top" height={'200px'} alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.price}</p>
              <button className="btn btn-danger">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
      <i className="fas fa-arrow-right" onClick={handleNext} style={{ fontSize: "2em", cursor: "pointer", marginLeft: "10px" }}></i>
    </div>
  );
};

export default YES;
