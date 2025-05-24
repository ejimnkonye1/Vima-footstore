import { useState } from 'react';
import { FiLock, FiCreditCard, FiTruck, FiCheck, FiChevronDown, FiUser, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';
import { BiLeaf } from 'react-icons/bi';

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState('shipping');
  const [saveShippingInfo, setSaveShippingInfo] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Sample cart data
  const cartItems = [
    {
      id: '1',
      name: 'Premium Eco-Tech Running Shoes',
      price: 129.99,
      color: 'black',
      size: 'US 10',
      quantity: 1,
      image: '/shoe-front.jpg'
    },
    {
      id: '2',
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      color: 'white',
      size: 'M',
      quantity: 2,
      image: '/tshirt.jpg'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping for demo
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    // In a real app, this would call your order processing API
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <FiCheck className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Confirmed!</h2>
          <p className="mt-2 text-gray-600">
            Your order #2025-98765 has been placed successfully. We've sent a confirmation to your email.
          </p>
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900">Estimated Delivery</h3>
            <p className="mt-1 text-sm text-gray-500">Tuesday, May 28 - Thursday, May 30</p>
          </div>
          <div className="mt-6">
            <a
              href="/account/orders"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Order Details
            </a>
            <a
              href="/"
              className="mt-3 w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-indigo-600">FashionHub</a>
            <div className="flex items-center space-x-2">
              <FiLock className="text-gray-400" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center">
            <ol className="flex items-center space-x-8">
              <li 
                className={`flex items-center py-4 ${activeStep === 'shipping' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveStep('shipping')}
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded-full ${activeStep === 'shipping' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </span>
                <span className="ml-2">Shipping</span>
              </li>
              <li 
                className={`flex items-center py-4 ${activeStep === 'payment' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}
                onClick={() => activeStep === 'payment' && setActiveStep('payment')}
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded-full ${activeStep === 'payment' ? 'bg-indigo-600 text-white' : activeStep === 'review' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {activeStep === 'review' ? <FiCheck className="h-4 w-4" /> : '2'}
                </span>
                <span className="ml-2">Payment</span>
              </li>
              <li 
                className={`flex items-center py-4 ${activeStep === 'review' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}
                onClick={() => activeStep === 'review' && setActiveStep('review')}
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded-full ${activeStep === 'review' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </span>
                <span className="ml-2">Review</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            {activeStep === 'shipping' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue="Alex"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue="Johnson"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      id="address"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue="123 Main St"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue="New York"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      id="country"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue="NY"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                    <input
                      type="text"
                      id="zip"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue="10001"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center">
                  <input
                    id="save-shipping"
                    name="save-shipping"
                    type="checkbox"
                    checked={saveShippingInfo}
                    onChange={(e) => setSaveShippingInfo(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="save-shipping" className="ml-2 block text-sm text-gray-700">
                    Save this information for next time
                  </label>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setActiveStep('payment')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {activeStep === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <div 
                    className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'credit-card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => setPaymentMethod('credit-card')}
                  >
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${paymentMethod === 'credit-card' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'credit-card' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                      <div className="ml-3 flex items-center">
                        <FiCreditCard className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Credit Card</span>
                      </div>
                    </div>
                    
                    {paymentMethod === 'credit-card' && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                          <input
                            type="text"
                            id="card-name"
                            placeholder="Alex Johnson"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                          <input
                            type="text"
                            id="card-expiry"
                            placeholder="MM/YY"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="card-cvc" className="block text-sm font-medium text-gray-700 mb-1">Security Code</label>
                          <input
                            type="text"
                            id="card-cvc"
                            placeholder="CVC"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div 
                    className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'paypal' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${paymentMethod === 'paypal' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'paypal' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                      <div className="ml-3 flex items-center">
                        <FaPaypal className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">PayPal</span>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'apple-pay' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => setPaymentMethod('apple-pay')}
                  >
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${paymentMethod === 'apple-pay' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'apple-pay' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                      <div className="ml-3 flex items-center">
                        <FaApplePay className="h-5 w-5 text-gray-900 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Apple Pay</span>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'google-pay' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                    onClick={() => setPaymentMethod('google-pay')}
                  >
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${paymentMethod === 'google-pay' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'google-pay' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                      <div className="ml-3 flex items-center">
                        <FaGooglePay className="h-5 w-5 text-gray-900 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Google Pay</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setActiveStep('shipping')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep('review')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {activeStep === 'review' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FiUser className="mr-2" />
                    Contact Information
                  </h3>
                  <p className="text-gray-600">alex.johnson@example.com</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>

                <div className="border-b border-gray-200 py-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FiTruck className="mr-2" />
                    Shipping Address
                  </h3>
                  <p className="text-gray-600">Alex Johnson</p>
                  <p className="text-gray-600">123 Main St</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                  <p className="text-gray-600">United States</p>
                </div>

                <div className="border-b border-gray-200 py-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FiCreditCard className="mr-2" />
                    Payment Method
                  </h3>
                  <p className="text-gray-600 capitalize">{paymentMethod.replace('-', ' ')}</p>
                  {paymentMethod === 'credit-card' && (
                    <p className="text-gray-600 mt-1">Card ending in •••• 4242</p>
                  )}
                </div>

                <div className="py-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-4 flex">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-base font-medium text-gray-900">
                              {item.name}
                            </h4>
                            <p className="text-base font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            {item.color} | {item.size}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between">
                    <button
                      onClick={() => setActiveStep('payment')}
                      className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {activeStep === 'review' && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex items-center">
                    <BiLeaf className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" />
                    <p className="text-xs text-gray-500">
                      Your order is carbon neutral. We offset emissions from shipping and packaging.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Security Badges */}
            <div className="mt-4 bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <FiLock className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-xs text-center text-gray-500">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    {/* <FiShield className="h-5 w-5 text-gray-600" /> */}
                  </div>
                  <span className="text-xs text-center text-gray-500">Payment Protection</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <FiCheck className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-xs text-center text-gray-500">Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FashionHub</h3>
              <p className="text-gray-400 text-sm">
                The future of fashion shopping. Curated collections for the modern consumer.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Men</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Women</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Kids</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Customer Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Track Order</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Shipping Info</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Sustainability</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Our Commitment</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Carbon Neutral</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Recycling Program</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Ethical Sourcing</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} FashionHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;