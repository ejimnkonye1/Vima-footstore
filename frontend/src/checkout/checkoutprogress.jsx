import {  FiCheck, } from 'react-icons/fi';
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


export default CheckoutProgress