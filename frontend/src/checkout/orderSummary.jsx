import { FiLock,  FiCheck,  FiShield } from 'react-icons/fi';
import { BiLeaf } from 'react-icons/bi';
import formatAsNaira from '../currency/naira';
const OrderSummary = ({ cart, subtotal, shipping,  total, activeStep }) => (
  <div className="lg:w-1/3">
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
          <span className="text-gray-900">{formatAsNaira(subtotal.toFixed(0))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">{formatAsNaira(shipping)}</span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <span className="font-medium text-gray-900">Total</span>
          <span className="font-bold text-gray-900">{formatAsNaira(total.toFixed(0))}</span>
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
            <FiShield className="h-5 w-5 text-gray-600" />
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
);

export default OrderSummary