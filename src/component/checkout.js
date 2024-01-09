// BillingAddressForm.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationPage from '../component/confirm.js'
import img1 from '../images/visa.png'
import img2 from '../images/america.png'
import img3 from '../images/paypal.png'
const BillingAddressForm = ({ onFormDataChange , cartItems, setCartItems}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
    onFormDataChange(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    let valid = true;
    const newFormErrors = { ...formErrors };

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        valid = false;
        newFormErrors[key] = 'This field is required';
      }
    });

    setFormErrors(newFormErrors);

    if (valid) {
      // Proceed with payment
      setShowConfirmation(true);
      handleConfirmationPage();
      
      
    }
  };

  const handleModalClose = () => {
    setShowConfirmation(false);
    // Optionally reset form fields here
  };
  const handleConfirmationPage = () => {
    console.log(formData);
     navigate('/confirm' , { state: { formData } });
    
    
   

  };
  const handleshopping = () => {
    
     navigate('/Cat');
    
    
   

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
  return (
    <div className="container">
         <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-8  p-3 mt-5">
        <div className="card">
    <div className="card-body">
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.firstName}</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.lastName}</div>
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.email}</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="number" className="form-label">
                  Number
                </label>
                <input
                  type="number"
                  className={`form-control ${formErrors.number ? 'is-invalid' : ''}`}
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.number}</div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.address}</div>
            </div>

            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.city}</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className={`form-control ${formErrors.state ? 'is-invalid' : ''}`}
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.state}</div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="zip" className="form-label">
                ZIP Code
              </label>
              <input
                type="text"
                className={`form-control ${formErrors.zip ? 'is-invalid' : ''}`}
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{formErrors.zip}</div>
            </div>

           </div>
           </div>
          
        </div>
         <div className="col-md-4 p-3 mt-5">
  <div className="card">
    <div className="card-body">
   
      
     
    

        <div className="">
          <button type="submit"  className="btn btn-primary payment float-right mt-3">
            Palce Order
          </button>
        </div>
        <div className="">
         
          <button type="button" onClick={handleshopping}  className="btn btn-danger payment float-right mt-3">
            Continue Shopping
          </button>
          
        </div>
    </div>
  </div>
</div>
        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Your Order Confirmation</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Display order details or any additional information here */}
                  <p>Thank you for your order!</p>
                  <p>Details:</p>
                  {/* Display order details based on the form data */}
                  <p>
                    <strong>Name:</strong> {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  {/* Add more details as needed */}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
</form>
    </div>
  );
};

export default BillingAddressForm;
