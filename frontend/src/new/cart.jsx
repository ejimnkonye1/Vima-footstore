import { useState } from 'react';
import { FiShoppingBag, FiX, FiChevronDown, FiChevronUp, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { BiLeaf } from 'react-icons/bi';
import { useCart } from '../context/cartcontext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
const navigate = useNavigate()

  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [suggestedProducts] = useState([
    {
      id: '4',
      name: 'Breathable Running Socks',
      price: 14.99,
      image: '/socks.jpg'
    },
    {
      id: '5',
      name: 'Lightweight Running Cap',
      price: 24.99,
      image: '/cap.jpg'
    }
  ]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const discount = isCouponApplied ? subtotal * 0.1 : 0; // 10% discount for demo
  const total = subtotal + shipping + tax - discount;



  const applyCoupon = () => {
    if (couponCode.trim()) {
      setIsCouponApplied(true);
      setShowCouponInput(false);
    }
  };
const handlechekout =  () => {
  navigate("/checkout")
}
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Your Cart ({cart.length})</h1>
                <a href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <FiArrowLeft className="mr-1" /> Continue Shopping
                </a>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-gray-500">Start adding some items to your cart</p>
                  <a
                    href="/"
                    className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Continue Shopping
                  </a>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <ul className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="py-6 flex flex-col sm:flex-row">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="ml-0 sm:ml-4 flex-1 mt-4 sm:mt-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">
                                <a href={`/product/${item.name}`}>{item.name}</a>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500 capitalize">
                                {item.color} | {item.size}
                              </p>
                              {item.isSustainable && (
                                <p className="mt-1 text-xs text-green-600 flex items-center">
                                  <BiLeaf className="mr-1" /> Sustainable Product
                                </p>
                              )}
                              {item.isNew && (
                                <p className="mt-1 text-xs text-blue-600">New Arrival</p>
                              )}
                            </div>
                            <p className="text-base font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-center w-12">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                disabled={item.quantity >= item.stock}
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="flex items-center text-sm text-gray-500 hover:text-red-600"
                            >
                              <FiTrash2 className="mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Coupon Code */}
                  <div className="mt-6">
                    {showCouponInput ? (
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button
                          onClick={applyCoupon}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-r-md text-sm"
                        >
                          Apply
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowCouponInput(true)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        {isCouponApplied ? 'Coupon applied!' : 'Have a coupon code?'}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Suggested Products */}
            {cart.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Frequently bought together</h2>
                <div className="grid grid-cols-2 gap-4">
                  {suggestedProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                      <div className="w-24 h-24 bg-gray-100 rounded-md mb-3 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 text-center">{product.name}</h3>
                      <p className="text-sm text-gray-900 mt-1">${product.price.toFixed(2)}</p>
                      <button className="mt-2 text-xs text-indigo-600 hover:text-indigo-800">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
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

                <button onClick={handlechekout} className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-medium">
                  Proceed to Checkout
                </button>

           

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex items-center">
                    <BiLeaf className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" />
                    <p className="text-xs text-gray-500">
                      Your order is carbon neutral. We offset emissions from shipping and packaging.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

 
    </div>
  );
};

export default CartPage;