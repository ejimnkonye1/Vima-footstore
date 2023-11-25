// Checkout.js
import React, { useState } from 'react';

const Checkout = ({ cartItems }) => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handlePlaceOrder = () => {
    // Add logic to handle placing the order, such as sending the order to a server
    // and processing payment (not implemented in this example)
    console.log('Placing order:', { shippingInfo, cartItems });
    // You might want to clear the cart or perform other actions after placing the order
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4" style={{marginTop:'200px'}}>Checkout</h3>

      <form>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={shippingInfo.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="zipCode" className="form-label">
            Zip Code
          </label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
