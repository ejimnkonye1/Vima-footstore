
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Checkout({ cartItems }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState(""); // Password field

  const calculateTotalPrice = () => {
    // let totalPrice = 0;
    // for (const item of cartItems) {
    //   totalPrice += parseFloat(item.price) * item.quantity;
    // }
    // return totalPrice;
  };

  return (
    <div className="container mt-5" >
      <h5 style={{margin:'90px'}}>Checkout</h5>
      <p>
        Returning customer <Link to="#">click here to Login</Link>
      </p>
      <div className="row">
        <h5>Billing details</h5>
        <div className="col-md-6" style={{}}> 
          <form>
            <div className="d-flex justify-content-between mb-2 phone-form">
              <div>
                <label htmlFor="firstName">First name</label>
                <br />
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  size={30}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last name</label>
                <br />
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  size={30}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="companyName">Company name (optional)</label>
              <br />
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                size={70}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country">Country / Region *</label>
              <br />
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required

              >
                <option value="Nigeria">Nigeria</option>
                <option value="Isreal">Isreal</option>
                <option value="USA">USA</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="streetAddress">Street address</label>
              <br />
              <input
                type="text"
                id="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                required
                size={70}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apartment">Apartment (optional)</label>
              <br />
              <input
                type="text"
                id="apartment"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                size={70}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city">City</label>
              <br />
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                size={70}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state">State</label>
              <br />
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                size={70}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone">Phone</label>
              <br />
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size={70}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size={70}
              />
            </div>
            <div className="mb-3 row">
  <div className="col-6">
    <div className="form-check">
      <input
        type="checkbox"
        id="createAccount"
        className="form-check-input"
        onChange={(e) => setCreateAccount(e.target.checked)}
      />
      <label htmlFor="createAccount" className="form-check-label">
        Create Account
      </label>
    </div>
  </div>
</div>




            {createAccount && (
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
)}
          
          </form>
        </div>
        <div className="col-md-6" style={{marginLeft:''}}>
          <div style={{marginLeft:'80px'}}>
            <h3>Your Orders</h3>
            <table className="table">
              <thead className="border">
                <tr>
                  <th>Product</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody className="border">
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name} x {item.quantity}</td>
                    <td>NGN{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td>Subtotal</td>
                  <td>NGN{calculateTotalPrice()}</td>
                </tr>
                <tr>
                  <td>Shipping Fee</td>
                  <td>NGN2000</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>Total Price: NGN{calculateTotalPrice() + 2000}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div class="container">
            <h2>Payment Page</h2>
            <div class="payment-options">
  <div class="payment-method">
    <div class="form-check">
      <input
        type="radio"
        id="bankTransfer"
        name="paymentMethod"
        value="bankTransfer"
        class="form-check-input"
      />
      <label for="bankTransfer" class="form-check-label">
        Direct bank transfer
      </label>
    </div>
    <p>
      Make your payment directly into our bank account.
      Please use your Order ID as the payment reference.
      Your order will not be shipped until the funds have cleared in our account.
    </p>
  </div>
</div>


<div class="terms-and-conditions">
  <div class="form-check">
    <input type="checkbox" id="agreeToTerms" name="agreeToTerms" class="form-check-input" />
    <label for="agreeToTerms" class="form-check-label">
      I have read and agree to the website terms and conditions
    </label>
  </div>
</div>


            <div class="payment-button mt-3">
              <p className="btn btn-danger">Place Order</p>
            </div>
          </div> */}
        </div>
        <div class="payment-button mt-3">
              <p className="btn btn-danger">PAY Now</p>
            </div>
      </div>
    </div>
  );
}

export default Checkout;
