// Cart.js
import { Button } from 'bootstrap';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from "../Firebase"; // Import Firebase auth object


function Cart({ cartItems, setCartItems }) {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null); // Store user information
    const navigate = useNavigate();

    useEffect(() => {
      // Add a Firebase authentication listener
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          // User is signed in
          setUser(authUser);
        } else {
          // User is signed out
          setUser(null);
        }
      });
  
      // Clean up the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    }, []);
    useEffect(() => {
      // Retrieve cart items from localStorage when the component mounts
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCartItems);
    
      // Listen for changes to localStorage and update cartItems accordingly
      const handleStorageChange = () => {
        const updatedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(updatedCartItems);
      };
    
      window.addEventListener('storage', handleStorageChange);
    
      // Clean up the listener when the component unmounts
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);
    

  useEffect(() => {
    // Update localStorage whenever cartItems change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  // Function to calculate the updated price for each item based on quantity
  const calculateUpdatedPrice = (item) => {
    return (parseFloat(item.price) * item.quantity).toFixed(2);
  };
  // Calculate the total price of all items in the cart
 
 const calculateTotalPrice = () => {
  let totalPrice = 0;
  for (const item of cartItems) {
    // Assuming each item has a "price" property and considering quantity
    totalPrice += parseFloat(item.price) * item.quantity;
  }
  return totalPrice;
};

const updateQuantity = (item, increment) => {
  const updatedCart = [...cartItems];
  const index = updatedCart.findIndex((cartItem) => cartItem.name === item.name);
  if (index !== -1) {
    updatedCart[index].quantity += increment;
    if (updatedCart[index].quantity < 1) {
      // Remove the item from the cart if quantity becomes zero or negative
      updatedCart.splice(index, 1);
    }
    setCartItems(updatedCart);
  }
};

  console.log('Cart Items:', cartItems);
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of cartItems) {
      subtotal += parseFloat(item.price) * item.quantity;
    }
    return subtotal.toFixed(2);
  };

  // Function to calculate the total including shipping
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = 1000; // Change this to the actual shipping cost
    return (subtotal + shipping).toFixed(2);
  };
  console.log(cartItems);
 
 

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      // Paystack library has been loaded
      // You can initialize PaystackPop.setup here if needed
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  const payWithPaystack = (e) => {
      e.preventDefault();
    
      if (window.PaystackPop) {
        // PaystackPop is available, proceed with the payment logic
        let handler = window.PaystackPop.setup({
          key: 'pk_test_9f04ff1cdc541872fbbdb8816c9057d2b6c883a5', // Replace with your public key
          email: user.email,
       
          currency: 'NGN',
          amount: calculateTotalPrice() * 100,
          ref: '' + Math.floor(Math.random() * 1000000000 + 1),
          onClose: function () {
            alert('Window closed.');
          },
          callback: function (response) {
            let message = 'Payment complete! Reference: ' + response.reference;
            alert(message);
          },
        });
    
        handler.openIframe();
      } else {
        // Handle the case where PaystackPop is not available
        console.error('PaystackPop is not available');
      }
    };
    const handleCheckoutClick = () => {
      navigate('./checkout')
    }
    const orderTotal = calculateTotal();
    localStorage.setItem('orderTotal', orderTotal);

  return (
    <div className='mt-5'>
    
      <div className="container mt-5" >
      <div className='mb-3' style={{marginTop:'50px', marginBottom:'100px'}}>
      <h3 className='ml-4 mt-3 text-danger'> Cart</h3>
      </div>
      {cartItems.length === 0 ? ( // Check if the cart is empty
          <div className="text-center">
            <p>Your cart is empty.</p>
            <Link to="/Cat">Return to Shop</Link>
          </div>
        ) : (
          <div>
  <table className="table d-none d-md-table">
    <thead>
      <tr className=''>
        <th className=''>Product</th>
        <th className=''></th>
        <th className=''>Price</th>
        <th className=''>Quantity</th>
        <th className=''>Total</th>
       
      </tr>
    </thead>
    <tbody className=''>
      {cartItems.map((item, index) => (
        <tr key={index}>
          <td className=''>
            <img
              src={item.image}
              className="img-fluid"
              style={{ width: '100px' }}
              alt={item.name}
            />
          </td>
          <td className=''>
            <div className='mt-4'>
            <h5>{item.name}</h5>
             <p>Size: {item.size}</p>
             <div className=''>
         <p  onClick={() => handleRemoveFromCart(index)} className="btn btn-light btn-sm">REMOVE</p>
            
         </div>
            </div>
          </td>
          <td className=''>
            <div className='mt-4 text-primary'>
            NGN{item.price}
            </div>
          </td>
          <td className=''>
         <div className='d-flex  mt-3'>
         <div className='d-flex justify-content-center align-items-center' style={{border:'1px solid blue',
         borderRadius:'5px',width:'90px',
        
        }}>
         <div className='' style={{marginRight:'10px', cursor:'pointer'}}  onClick={() => updateQuantity(item, -1)}>
         -
         </div>
              <div className='m-2'>
              {item.quantity}
              </div>
              <div className='' style={{marginLeft:'10px', cursor:'pointer'}} onClick={() => updateQuantity(item, 1)}>
              +
              </div>
         </div>
         </div>

          </td>
          <td className=''>
            <div className='mt-4 text-primary'>
            NGN{calculateUpdatedPrice(item)}
            </div>
          </td>
        
        </tr>
      ))}
    </tbody>
  </table>
  <table className="table d-md-none"> {/* Display on small screens */}
  <thead>
    <tr className=''>
      <th className=''>Image</th>
      <th className=''>Name</th>
      <th className=''>Total</th>
    
    </tr>
  </thead>
  <tbody className=''>
    {cartItems.map((item, index) => (
      <tr key={index}>
        <td className='border'>
          <img
            src={item.image}
            className="img-fluid"
            style={{ width: '50px' }}
            alt={item.name}
          />
        </td>
        <td className='border'>
          <div className='mt-4'>
          {item.name}
          </div>
          <div className='d-flex justify-content-center align-items-center mt-3'>
         <div className='d-flex justify-content-center align-items-center' style={{border:'1px solid blue',
         borderRadius:'5px',width:'90px',
        
        }}>
         <div className='' style={{marginRight:'10px', cursor:'pointer'}}  onClick={() => updateQuantity(item, -1)}>
         -
         </div>
              <div className='m-2'>
              {item.quantity}
              </div>
              <div className='' style={{marginLeft:'10px', cursor:'pointer'}} onClick={() => updateQuantity(item, 1)}>
              +
              </div>
              
         </div>
         <div className='d-flex justify-content-center align-items-center mb-2' style={{marginLeft:'10px'}}>
         <i    onClick={() => handleRemoveFromCart(index)} className="fas fa-times   trash-icon"></i>
            
         </div>
         </div>
        </td>
        <td className='border'>
          <div className='mt-4 text-primary'>
          NGN{calculateUpdatedPrice(item)}
          </div>
          
        </td>
       
      </tr>
    ))}
  </tbody>
</table>

  <div>
  <p className='text-danger'>Total Price: NGN{calculateTotalPrice()}</p>
    </div>
   <div className='d-flex justify-content-end'>
   {/* <form onSubmit={payWithPaystack}> */}
 
    <button type='submit' onClick={handleCheckoutClick} className="btn btn-danger mt-3" > Proceed to checkout </button>

 {/* </form> */}
   </div>
   </div>
      )}
</div>


     
    </div>
  );
}
// const handleCheckoutClick = () => {
//   alert('Checkout page in progress!');
// };
export default Cart;
