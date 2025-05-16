import React from "react";
import productdata from "./productimg";
import Mendata from "./menimg";
import Womandata from "./womanimg";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Recommend from "./recommended";
import Alert from '@mui/material/Alert';

import '../css/productdetails.css'

import Testimonials from "./testmonial";
import { useNavigate } from "react-router-dom";
import ColorAlerts from "./alerts";
import formatAsNaira from "../currency/naira";

const ProductDetails = ({cartItems, setCartItems}) => {
    const { id } = useParams(); // Get the product ID from the route params
    const allProducts = [...productdata,  ...Mendata,  ...Womandata];
    const product = allProducts[Number(id)];
    const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);


    if (!product) {
      return <div>Product not found</div>;
    }
    const handleAddToCart = () => {
      // Check if a size is selected
      if (!selectedSize) {
        alert("Please select a size");
        
      
    
        return;
     
      }
    
      // Check if the product is already in the cart
      const existingProduct = cartItems.find((item) => item.name === product.name && item.size === selectedSize);
    
      if (existingProduct) {
        // If the product with the selected size exists in the cart, update its quantity
        existingProduct.quantity += quantity;
        setCartItems([...cartItems]);
        
      } else {
        // If the product is not in the cart, add it with the selected size and quantity
        const newItem = {
          ...product,
          size: selectedSize,
          quantity: quantity,
        };
        setCartItems([...cartItems, newItem]);
      }
      // navigate('/cart')
      setShowToast(true);

      // Hide the toast after a delay (adjust as needed)
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    };
    
return(
    <div className="container mt-5">
        {showToast && (
     <div className="custom-toast">
      <ColorAlerts />

   </div>
  )} 
    <div className="row " >
      <div className="col-md-6 ">
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid detials rounded"
          style={{ height: "450px", width: "400px",  }}
        />
      </div>
      <div className="col-md-6  ">
        <div className="" style={{ marginLeft: "20px" }}>
          <h2 className="mt-4 text-danger">{product.name}</h2>
          <p>
     
          </p>
          <p className="text-primary">
            <strong>{formatAsNaira(product.price)}</strong>
          </p>
          {/* Add more product details here */}
          <p>{product.description}</p>
          <p className="border-bottom"></p>
          <p>
            <strong>Select Size</strong>
          </p>
          <div class="container mt-4">
  <div class="row size">
  <ul className="list-inline">
                  <li className={`list-inline-item size-item ${selectedSize === '39' ? 'selected' : ''}`} onClick={() => setSelectedSize('39')}>39</li>
                  <li className={`list-inline-item size-item ${selectedSize === '40' ? 'selected' : ''}`} onClick={() => setSelectedSize('40')}>40</li>
                  <li className={`list-inline-item size-item ${selectedSize === '41' ? 'selected' : ''}`} onClick={() => setSelectedSize('41')}>41</li>
                  <li className={`list-inline-item size-item ${selectedSize === '42' ? 'selected' : ''}`} onClick={() => setSelectedSize('42')}>42</li>
                  <li className={`list-inline-item size-item ${selectedSize === '43' ? 'selected' : ''}`} onClick={() => setSelectedSize('43')}>43</li>
                  <li className={`list-inline-item size-item ${selectedSize === '44' ? 'selected' : ''}`} onClick={() => setSelectedSize('44')}>44</li>
                  <li className={`list-inline-item size-item ${selectedSize === '45' ? 'selected' : ''}`} onClick={() => setSelectedSize('45')}>45</li>
                  <li className={`list-inline-item size-item ${selectedSize === '46' ? 'selected' : ''}`} onClick={() => setSelectedSize('46')}>46</li>
                  <li className={`list-inline-item size-item ${selectedSize === '47' ? 'selected' : ''}`} onClick={() => setSelectedSize('47')}>47</li>
                </ul>
  </div>
</div>

          <p className="border-bottom mt-3"></p>

          <div className="d-flex p-2">
            {/* <p>
              <strong>Quantity</strong>
            </p> */}
            <div className='d-flex justify-content-center align-items-center' style={{border:'1px solid blue',
         borderRadius:'5px',width:'90px',
        
        }}>
         <div className='' style={{marginRight:'10px', cursor:'pointer'}}     onClick={() => setQuantity(quantity + 1)}>
          
         -
         </div>
              <div className='m-2'>
              {quantity}
              </div>
              <div className='' style={{marginLeft:'10px', cursor:'pointer'}}    onClick={() => setQuantity(quantity + 1)}>
            
              +
              </div>
         </div>
         <div className="oga">
         <button className="btn btn-danger cart mb-3" id="liveToastBtn" onClick={() => handleAddToCart(product)} >
            Add to Cart
          </button>
          </div>
          </div>
          

          {/* <div className="now p-1">
            <button className="text-center buy  ">Buy It Now</button>
          </div> */}
        </div>
      </div>
    </div>


    < div className="mt-5">
    <Recommend cartItems={cartItems} setCartItems={setCartItems}/>
    </div>
  </div>
)
}
export default ProductDetails;