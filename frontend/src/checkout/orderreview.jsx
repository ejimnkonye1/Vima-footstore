import { FiCreditCard, FiTruck, FiUser  } from 'react-icons/fi';
import formatAsNaira from '../currency/naira';

const OrderReview = ({ formData, paymentMethod, cart, prevStep, placeOrder, loading }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
    
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <FiUser  className="mr-2" />
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
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover" // Changed to object-cover for better responsiveness
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h4 className="text-base font-medium text-gray-900">
                  {item.name}
                </h4>
                <p className="text-base font-medium text-gray-900">
                  {formatAsNaira((item.price * item.quantity).toFixed(0))}
                </p>
              </div>
              {item.color && (
                <p className="mt-1 text-sm text-gray-500 capitalize">
                  {item.color} | {item.size}
                </p>
              )}
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

export default OrderReview;
