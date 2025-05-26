import { FiCheck } from "react-icons/fi";


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

export default OrderConfirmation