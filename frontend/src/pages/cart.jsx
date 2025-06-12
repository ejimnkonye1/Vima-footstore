import { useEffect, useState } from 'react';
import { FiShoppingBag, FiX, FiChevronDown, FiChevronUp, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { BiLeaf } from 'react-icons/bi';
import { useCart } from '../context/cartcontext';
import { Link, useNavigate } from 'react-router-dom';
import formatAsNaira from '../currency/naira';
import capitalizeFirstLetter from '../util/cap';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
const navigate = useNavigate()

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 1000

  const total = subtotal + shipping ;

  const user = useSelector((state) => state.user);
const [loading, setLoading] = useState(false)

const handleCheckout = async () => {
    setLoading(true);
    
    try {
        if (!user) {
            toast.error("Login first to checkout orders");
            return; // Exit early if no user
        }
      
           await new Promise(resolve => setTimeout(resolve, 1000));
        navigate("/checkout");
    } catch (err) {
        console.error("Error during checkout:", err);
        toast.error("An error occurred. Please try again.");
    } finally {
        setLoading(false); 
    }
};




if(cart.length === 0 ){
  return(
    <div className='container mx-auto px-4 py-8'>

     <Helmet>
                    <title>Your Cart | Nique Wear</title>
                    <meta name="description" content="View your shopping cart" />
                </Helmet>
      <div className="flex flex-col lg:flex-row gap-8">

  
    <div className='lg:w-3/3'>
       <div className="bg-white rounded-lg shadow-sm p-6">
           <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Your Cart ({cart.length})</h1>
                <a href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <FiArrowLeft className="mr-1" /> Continue Shopping
                </a>
              </div>
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
                </div>
    </div>
        </div>
          </div>
  )
}
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
           <Toaster position="top-center" />
          <Helmet>
  <title>{`Your Cart ${cart.length > 0 ? `(${cart.length})` : ''} | Nique Wear`}</title>
  <meta name="description" content={cart.length > 0 
    ? `You have ${cart.length} items in your cart` 
    : "Your shopping cart is empty"} />
</Helmet>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="md:text-2xl text-lg font-bold text-gray-900">Your Cart ({cart.length})</h1>
                <Link to="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <FiArrowLeft className="mr-1" /> Continue Shopping
                </Link>
              </div>

                <>
                  {/* Cart Items List */}
                  <ul className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="py-6 flex flex-col sm:flex-row">
                        {/* Product Image */}
   <div className="flex-shrink-0 w-full max-w-[128px] sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
  <img
    src={item.image}
    alt={item.name}
    className="w-full h-full object-cover"
  />
</div>



                        {/* Product Info */}
                        <div className="ml-0 sm:ml-4 flex-1 mt-4 sm:mt-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">
                                <a href={`/product/${item.name}`}>{capitalizeFirstLetter(item.name)}</a>
                              </h3>
                              {item.color &&
                                   <p className="mt-1 text-sm text-gray-500 capitalize">
                                {item.color} | {item.size}
                              </p>
                              }
                          
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
                              {formatAsNaira((item.price * item.quantity).toFixed(0))}
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
                </>
              
            </div>


          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatAsNaira(subtotal.toFixed(0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waybill</span>
                    <span className="text-gray-900">
                      {formatAsNaira(shipping)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">{formatAsNaira(total.toFixed(0))}</span>
                  </div>
                </div>
<button 
  onClick={handleCheckout} 
  disabled={loading}
  className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-medium disabled:opacity-75 disabled:cursor-not-allowed flex justify-center items-center gap-2"
>
  {loading ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing
    </>
  ) : (
    "Proceed to Checkout"
  )}
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