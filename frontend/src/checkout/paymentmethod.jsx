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

export default PaymentMethod