// import { useState } from 'react';
// import { FiLock, FiCreditCard, FiTruck, FiCheck, FiChevronDown, FiUser, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
// import { FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';
// import { BiLeaf } from 'react-icons/bi';
// import { useCart } from '../context/cartcontext';

// const CheckoutPage = () => {
//   const [activeStep, setActiveStep] = useState('shipping');
//   const [saveShippingInfo, setSaveShippingInfo] = useState(true);
//   const [paymentMethod, setPaymentMethod] = useState('credit-card');
//   const [orderPlaced, setOrderPlaced] = useState(false);

//       const { cart, updateQuantity, removeFromCart } = useCart();

//   const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const shipping = 0; // Free shipping for demo
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   const handlePlaceOrder = () => {
//     // In a real app, this would call your order processing API
//     setOrderPlaced(true);
//   };

//   if (orderPlaced) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
//             <FiCheck className="h-6 w-6 text-green-600" />
//           </div>
//           <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Confirmed!</h2>
//           <p className="mt-2 text-gray-600">
//             Your order #2025-98765 has been placed successfully. We've sent a confirmation to your email.
//           </p>
//           <div className="mt-6 border-t border-gray-200 pt-6">
//             <h3 className="text-sm font-medium text-gray-900">Estimated Delivery</h3>
//             <p className="mt-1 text-sm text-gray-500">Tuesday, May 28 - Thursday, May 30</p>
//           </div>
//           <div className="mt-6">
//             <a
//               href="/account/orders"
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               View Order Details
//             </a>
//             <a
//               href="/"
//               className="mt-3 w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//             >
//               Continue Shopping
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">


//       {/* Progress Steps */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="container mx-auto px-4">
//           <nav className="flex justify-center">
//             <ol className="flex items-center space-x-8">
//               <li 
//                 className={`flex items-center py-4 ${activeStep === 'shipping' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}
//                 onClick={() => setActiveStep('shipping')}
//               >
//                 <span className={`flex items-center justify-center w-6 h-6 rounded-full ${activeStep === 'shipping' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
//                   1
//                 </span>
//                 <span className="ml-2">Shipping</span>
//               </li>
//               <li 
//                 className={`flex items-center py-4 ${activeStep === 'payment' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}
//                 onClick={() => activeStep === 'payment' && setActiveStep('payment')}
//               >
//                 <span className={`flex items-center justify-center w-6 h-6 rounded-full ${activeStep === 'payment' ? 'bg-indigo-600 text-white' : activeStep === 'review' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
//                   {activeStep === 'review' ? <FiCheck className="h-4 w-4" /> : '2'}
//                 </span>
//                 <span className="ml-2">Payment</span>
//               </li>
//               <li 
//                 className={`flex items-center py-4 ${activeStep === 'review' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}
//                 onClick={() => activeStep === 'review' && setActiveStep('review')}
//               >
//                 <span className={`flex items-center justify-center w-6 h-6 rounded-full ${activeStep === 'review' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
//                   3
//                 </span>
//                 <span className="ml-2">Review</span>
//               </li>
//             </ol>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Checkout Form */}
//           <div className="lg:w-2/3">
//             {activeStep === 'shipping' && (
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                     <input
//                       type="text"
//                       id="first-name"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       defaultValue="Alex"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                     <input
//                       type="text"
//                       id="last-name"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       defaultValue="Johnson"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                     <input
//                       type="text"
//                       id="address"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       defaultValue="123 Main St"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                     <input
//                       type="text"
//                       id="city"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       defaultValue="New York"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                     <select
//                       id="country"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     >
//                       <option>United States</option>
//                       <option>Canada</option>
//                       <option>United Kingdom</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
//                     <input
//                       type="text"
//                       id="state"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       defaultValue="NY"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
//                     <input
//                       type="text"
//                       id="zip"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       defaultValue="10001"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       defaultValue="+1 (555) 123-4567"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-6 flex items-center">
//                   <input
//                     id="save-shipping"
//                     name="save-shipping"
//                     type="checkbox"
//                     checked={saveShippingInfo}
//                     onChange={(e) => setSaveShippingInfo(e.target.checked)}
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="save-shipping" className="ml-2 block text-sm text-gray-700">
//                     Save this information for next time
//                   </label>
//                 </div>

//                 <div className="mt-8 flex justify-end">
//                   <button
//                     onClick={() => setActiveStep('payment')}
//                     className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
//                   >
//                     Continue to Payment
//                   </button>
//                 </div>
//               </div>
//             )}

//             {activeStep === 'payment' && (
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
//                 <div className="space-y-4">
//                   <div 
//                     className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'credit-card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
//                     onClick={() => setPaymentMethod('credit-card')}
//                   >
//                     <div className="flex items-center">
//                       <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${paymentMethod === 'credit-card' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
//                         {paymentMethod === 'credit-card' && <div className="h-2 w-2 rounded-full bg-white"></div>}
//                       </div>
//                       <div className="ml-3 flex items-center">
//                         <FiCreditCard className="h-5 w-5 text-gray-500 mr-2" />
//                         <span className="text-sm font-medium text-gray-700">Credit Card</span>
//                       </div>
//                     </div>
                    
//                     {paymentMethod === 'credit-card' && (
//                       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="md:col-span-2">
//                           <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
//                           <input
//                             type="text"
//                             id="card-number"
//                             placeholder="1234 5678 9012 3456"
//                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
//                           <input
//                             type="text"
//                             id="card-name"
//                             placeholder="Alex Johnson"
//                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
//                           <input
//                             type="text"
//                             id="card-expiry"
//                             placeholder="MM/YY"
//                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="card-cvc" className="block text-sm font-medium text-gray-700 mb-1">Security Code</label>
//                           <input
//                             type="text"
//                             id="card-cvc"
//                             placeholder="CVC"
//                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div 
//                     className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'paypal' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
//                     onClick={() => setPaymentMethod('paypal')}
//                   >
//                     <div className="flex items-center">
//                       <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${paymentMethod === 'paypal' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
//                         {paymentMethod === 'paypal' && <div className="h-2 w-2 rounded-full bg-white"></div>}
//                       </div>
//                       <div className="ml-3 flex items-center">
//                         <FaPaypal className="h-5 w-5 text-blue-500 mr-2" />
//                         <span className="text-sm font-medium text-gray-700">PayPal</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div 
//                     className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'apple-pay' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
//                     onClick={() => setPaymentMethod('apple-pay')}
//                   >
//                     <div className="flex items-center">
//                       <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${paymentMethod === 'apple-pay' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
//                         {paymentMethod === 'apple-pay' && <div className="h-2 w-2 rounded-full bg-white"></div>}
//                       </div>
//                       <div className="ml-3 flex items-center">
//                         <FaApplePay className="h-5 w-5 text-gray-900 mr-2" />
//                         <span className="text-sm font-medium text-gray-700">Apple Pay</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div 
//                     className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'google-pay' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
//                     onClick={() => setPaymentMethod('google-pay')}
//                   >
//                     <div className="flex items-center">
//                       <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${paymentMethod === 'google-pay' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
//                         {paymentMethod === 'google-pay' && <div className="h-2 w-2 rounded-full bg-white"></div>}
//                       </div>
//                       <div className="ml-3 flex items-center">
//                         <FaGooglePay className="h-5 w-5 text-gray-900 mr-2" />
//                         <span className="text-sm font-medium text-gray-700">Google Pay</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8 flex justify-between">
//                   <button
//                     onClick={() => setActiveStep('shipping')}
//                     className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
//                   >
//                     Back
//                   </button>
//                   <button
//                     onClick={() => setActiveStep('review')}
//                     className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
//                   >
//                     Review Order
//                   </button>
//                 </div>
//               </div>
//             )}

//             {activeStep === 'review' && (
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                
//                 <div className="border-b border-gray-200 pb-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//                     <FiUser className="mr-2" />
//                     Contact Information
//                   </h3>
//                   <p className="text-gray-600">alex.johnson@example.com</p>
//                   <p className="text-gray-600">+1 (555) 123-4567</p>
//                 </div>

//                 <div className="border-b border-gray-200 py-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//                     <FiTruck className="mr-2" />
//                     Shipping Address
//                   </h3>
//                   <p className="text-gray-600">Alex Johnson</p>
//                   <p className="text-gray-600">123 Main St</p>
//                   <p className="text-gray-600">New York, NY 10001</p>
//                   <p className="text-gray-600">United States</p>
//                 </div>

//                 <div className="border-b border-gray-200 py-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//                     <FiCreditCard className="mr-2" />
//                     Payment Method
//                   </h3>
//                   <p className="text-gray-600 capitalize">{paymentMethod.replace('-', ' ')}</p>
//                   {paymentMethod === 'credit-card' && (
//                     <p className="text-gray-600 mt-1">Card ending in •••• 4242</p>
//                   )}
//                 </div>

//                 <div className="py-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
//                   <ul className="divide-y divide-gray-200">
//                     {cart.map((item) => (
//                       <li key={item.id} className="py-4 flex">
//                         <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="w-full h-full object-contain"
//                           />
//                         </div>
//                         <div className="ml-4 flex-1">
//                           <div className="flex justify-between">
//                             <h4 className="text-base font-medium text-gray-900">
//                               {item.name}
//                             </h4>
//                             <p className="text-base font-medium text-gray-900">
//                               ${(item.price * item.quantity).toFixed(2)}
//                             </p>
//                           </div>
//                           <p className="mt-1 text-sm text-gray-500 capitalize">
//                             {item.color} | {item.size}
//                           </p>
//                           <p className="mt-1 text-sm text-gray-500">
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="border-t border-gray-200 pt-6">
//                   <div className="flex justify-between">
//                     <button
//                       onClick={() => setActiveStep('payment')}
//                       className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
//                     >
//                       Back
//                     </button>
//                     <button
//                       onClick={handlePlaceOrder}
//                       className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
//                     >
//                       Place Order
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:w-1/3">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
//                   <span className="text-gray-900">${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="text-gray-900">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="text-gray-900">${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-4 flex justify-between">
//                   <span className="font-medium text-gray-900">Total</span>
//                   <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
//                 </div>
//               </div>

//               {activeStep === 'review' && (
//                 <div className="mt-6 border-t border-gray-200 pt-6">
//                   <div className="flex items-center">
//                     <BiLeaf className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" />
//                     <p className="text-xs text-gray-500">
//                       Your order is carbon neutral. We offset emissions from shipping and packaging.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Security Badges */}
//             <div className="mt-4 bg-white rounded-lg shadow-sm p-6">
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="flex flex-col items-center">
//                   <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
//                     <FiLock className="h-5 w-5 text-gray-600" />
//                   </div>
//                   <span className="text-xs text-center text-gray-500">Secure Checkout</span>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
//                     {/* <FiShield className="h-5 w-5 text-gray-600" /> */}
//                   </div>
//                   <span className="text-xs text-center text-gray-500">Payment Protection</span>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
//                     <FiCheck className="h-5 w-5 text-gray-600" />
//                   </div>
//                   <span className="text-xs text-center text-gray-500">Satisfaction Guarantee</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

 
//     </div>
//   );
// };

// export default CheckoutPage;

import { useState, useEffect } from 'react';
import { FiLock, FiCreditCard, FiTruck, FiCheck, FiChevronDown, FiUser, FiMapPin, FiPhone, FiMail, FiShield } from 'react-icons/fi';
import { FaPaypal } from 'react-icons/fa';
import { BiLeaf } from 'react-icons/bi';
import { useCart } from '../context/cartcontext';
import { usePaystackPayment } from 'react-paystack';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState('shipping');
  const [saveShippingInfo, setSaveShippingInfo] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('paystack'); // Default to Paystack
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'Nigeria', // Default for Paystack
    state: '',
    zip: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate order totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.075; // 7.5% VAT for Nigeria
  const total = subtotal + shipping + tax;

  // Paystack config
  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email || 'customer@example.com',
    amount: total * 100, // Paystack uses kobo (multiply by 100)
    publicKey: 'pk_test_your_paystack_public_key',
    currency: 'NGN',
    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money'],
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: `${formData.firstName} ${formData.lastName}`
        },
        {
          display_name: "Shipping Address",
          variable_name: "shipping_address",
          value: `${formData.address}, ${formData.city}`
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form before proceeding
  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zip', 'phone', 'email'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  // Handle payment success
  const onSuccess = async (reference) => {
    try {
      setLoading(true);
      // Send order to your backend
      const orderData = {
        ...formData,
        items: cart,
        paymentReference: reference.reference,
        paymentMethod,
        total,
        status: 'paid'
      };

      const response = await axios.post('/api/orders', orderData);
      
      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
      
      // Optional: Send confirmation email
      await axios.post('/api/send-confirmation', {
        email: formData.email,
        orderId: response.data.orderId
      });

    } catch (error) {
      console.error("Order processing error:", error);
      toast.error("Order processing failed. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  // Handle payment close
  const onClose = () => {
    toast.error("Payment was cancelled");
  };

  // Handle place order
  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    
    if (paymentMethod === 'paystack') {
      initializePayment(onSuccess, onClose);
    } else {
      // Handle other payment methods
      toast.error("Only Paystack payments are currently supported");
    }
  };

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      navigate('/cart');
      toast.error("Your cart is empty");
    }
  }, [cart, orderPlaced, navigate]);

  if (orderPlaced) {
    return (
      <OrderConfirmation 
        orderNumber={`ORD-${Math.floor(Math.random() * 1000000)}`} 
        email={formData.email}
      />
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="bottom-right" />
      
      {/* Progress Steps */}
      <CheckoutProgress activeStep={activeStep} setActiveStep={setActiveStep} />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            {activeStep === 'shipping' && (
              <ShippingForm 
                formData={formData}
                handleInputChange={handleInputChange}
                saveShippingInfo={saveShippingInfo}
                setSaveShippingInfo={setSaveShippingInfo}
                nextStep={() => validateForm() && setActiveStep('payment')}
              />
            )}

            {activeStep === 'payment' && (
              <PaymentMethod 
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                prevStep={() => setActiveStep('shipping')}
                nextStep={() => setActiveStep('review')}
              />
            )}

            {activeStep === 'review' && (
              <OrderReview 
                formData={formData}
                paymentMethod={paymentMethod}
                cart={cart}
                prevStep={() => setActiveStep('payment')}
                placeOrder={handlePlaceOrder}
                loading={loading}
              />
            )}
          </div>

          {/* Order Summary */}
          <OrderSummary 
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            activeStep={activeStep}
          />
        </div>
      </main>
    </div>
  );
};

// Extracted Components for Better Organization

const OrderConfirmation = ({ orderNumber, email }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <FiCheck className="h-6 w-6 text-green-600" />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Confirmed!</h2>
      <p className="mt-2 text-gray-600">
        Your order #{orderNumber} has been placed successfully. We've sent a confirmation to {email}.
      </p>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-900">Estimated Delivery</h3>
        <p className="mt-1 text-sm text-gray-500">Within 3-5 business days</p>
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate('/account/orders')}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          View Order Details
        </button>
        <button
          onClick={() => navigate('/')}
          className="mt-3 w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
);

const CheckoutProgress = ({ activeStep, setActiveStep }) => (
  <div className="bg-white border-b border-gray-200">
    <div className="container mx-auto px-4">
      <nav className="flex justify-center">
        <ol className="flex items-center space-x-8">
          {['shipping', 'payment', 'review'].map((step, index) => (
            <li 
              key={step}
              className={`flex items-center py-4 ${
                activeStep === step ? 'text-indigo-600 font-medium' : 'text-gray-500'
              }`}
              onClick={() => {
                // Only allow going back, not jumping forward
                if (index < ['shipping', 'payment', 'review'].indexOf(activeStep)) {
                  setActiveStep(step);
                }
              }}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full ${
                activeStep === step ? 'bg-indigo-600 text-white' : 
                index < ['shipping', 'payment', 'review'].indexOf(activeStep) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index < ['shipping', 'payment', 'review'].indexOf(activeStep) ? <FiCheck className="h-4 w-4" /> : index + 1}
              </span>
              <span className="ml-2 capitalize">{step}</span>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  </div>
);

// Other components (ShippingForm, PaymentMethod, OrderReview, OrderSummary) would be similarly extracted

export default CheckoutPage;
const ShippingForm = ({ formData, handleInputChange, saveShippingInfo, setSaveShippingInfo, nextStep }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City*</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="Nigeria">Nigeria</option>
          <option value="Ghana">Ghana</option>
          <option value="Kenya">Kenya</option>
          <option value="South Africa">South Africa</option>
        </select>
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State*</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
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
        onClick={nextStep}
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
      >
        Continue to Payment
      </button>
    </div>
  </div>
);
const PaymentMethod = ({ paymentMethod, setPaymentMethod, prevStep, nextStep }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
    
    <div className="space-y-4">
      {/* Paystack Option */}
      <div 
        className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'paystack' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
        onClick={() => setPaymentMethod('paystack')}
      >
        <div className="flex items-center">
          <div className={`flex items-center justify-center h-5 w-5 rounded-full border ${paymentMethod === 'paystack' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
            {paymentMethod === 'paystack' && <div className="h-2 w-2 rounded-full bg-white"></div>}
          </div>
          <div className="ml-3 flex items-center">
            <img 
              src="https://res.cloudinary.com/adenike/image/upload/v1657745236/paystack-logo.png" 
              alt="Paystack" 
              className="h-5 w-5 mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Paystack</span>
          </div>
        </div>
        
        {paymentMethod === 'paystack' && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Pay securely with Paystack (Cards, Bank Transfer, USSD, etc.)
            </p>
          </div>
        )}
      </div>

      {/* Other payment methods can be added here */}
    </div>

    <div className="mt-8 flex justify-between">
      <button
        onClick={prevStep}
        className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
      >
        Review Order
      </button>
    </div>
  </div>
);

const OrderReview = ({ formData, paymentMethod, cart, prevStep, placeOrder, loading }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
    
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <FiUser className="mr-2" />
        Contact Information
      </h3>
      <p className="text-gray-600">{formData.email}</p>
      <p className="text-gray-600">{formData.phone}</p>
    </div>

    <div className="border-b border-gray-200 py-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <FiTruck className="mr-2" />
        Shipping Address
      </h3>
      <p className="text-gray-600">{formData.firstName} {formData.lastName}</p>
      <p className="text-gray-600">{formData.address}</p>
      <p className="text-gray-600">{formData.city}, {formData.state}</p>
      <p className="text-gray-600">{formData.country}</p>
    </div>

    <div className="border-b border-gray-200 py-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <FiCreditCard className="mr-2" />
        Payment Method
      </h3>
      <p className="text-gray-600 capitalize">{paymentMethod.replace('-', ' ')}</p>
    </div>

    <div className="py-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
      <ul className="divide-y divide-gray-200">
        {cart.map((item) => (
          <li key={item._id} className="py-4 flex">
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
                  ₦{(item.price * item.quantity).toFixed(2)}
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
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
        >
          Back
        </button>
        <button
          onClick={placeOrder}
          disabled={loading}
          className={`px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  </div>
);