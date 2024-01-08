import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { auth } from "../Firebase"; // Import Firebase auth object
import img1 from '../images/pp.png'
import img2 from '../images/america.png'
import img3 from '../images/paypal.png'
const ConfirmationPage = ({ cartItems, setCartItems }) => {
  const [user, setUser] = useState(null); // Store user information

  const location = useLocation();
  const formData = location.state?.formData;
  
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

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of cartItems) {
      subtotal += parseFloat(item.price) * item.quantity;
    }
    return subtotal.toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = 1000; // Change this to the actual shipping cost
    return (subtotal + shipping).toFixed(2);
  };
  const payWithPaystack = (e) => {
    e.preventDefault();
  
    if (window.PaystackPop) {
      // PaystackPop is available, proceed with the payment logic
      let handler = window.PaystackPop.setup({
        key: 'pk_test_9f04ff1cdc541872fbbdb8816c9057d2b6c883a5', // Replace with your public key
        email: user.email,
     
        currency: 'NGN',
        amount: calculateTotal() * 100,
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        onClose: function () {
          alert('Window closed.');
        },
        callback: function (response) {
          let message = 'Payment complete! Reference: ' + response.reference;
          alert(message);
              
        setCartItems([]);
        localStorage.removeItem('cartItems');
    
        },
      });
  
      handler.openIframe();
    } else {
      // Handle the case where PaystackPop is not available
      console.error('PaystackPop is not available');
    }
  };
  return (
    <div className="container mt-5">
      <h5 className='text-center'>Review Your order and make payment</h5>
  <div className='row'>
    <div className='col-md-8'>
      <div className="card">
        <div className="card-body">
          <h4 className='border-bottom'>Billing address</h4>
          {formData && (
            <div className='mt-3'>
              {/* Display order details based on the form data */}
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.number}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>City:</strong> {formData.city}</p>
              <p><strong>State:</strong> {formData.state}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h4 className='border-bottom'>Review Products</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image}
                        className="img-fluid"
                        style={{ width: '50px' }}
                        alt={item.name}
                      />
                    </td>
                    <td>
                      <div className='mt-4'>
                        <h5>{item.name}</h5>
                        <p>Size: {item.size}</p>
                      </div>
                    </td>
                    <td>
                      <div className='d-flex justify-content-center align-items-center'>
                        <div className='m-2'>
                          {item.quantity}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='mt-4 text-primary'>
                        NGN{calculateUpdatedPrice(item)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div className="col-md-4">
  <div className="card">
    <div className="card-body">
   
      <p>Total Price:<span className='float-end'> NGN{calculateTotalPrice()}</span></p>
      <p>Tax: <span className=' float-end '>1000</span> </p>
      <p>Total:<span className='float-end'>{calculateTotal()} </span></p>
           <div className='border-bottom'></div>
      <div className="row">
        <div className="col-md-12">
          <img src={img1} alt="Logo 1" className="img-fluid visa" />
          {/* Add more images as needed */}
        </div>

        <div className="">
          <button type="button" onClick={payWithPaystack} className="btn btn-primary payment float-right mt-3">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


  </div>
</div>

  );
};

export default ConfirmationPage;
