import { useState, useEffect } from 'react';
import { useCart } from '../context/cartcontext';
import { usePaystackPayment } from 'react-paystack';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ShippingForm from '../checkout/ShippingForm ';
import OrderSummary from '../checkout/orderSummary';
import CheckoutProgress from '../checkout/checkoutprogress';
import OrderConfirmation from '../checkout/orderconfirm';
import PaymentMethod from '../checkout/paymentmethod';
import OrderReview from '../checkout/orderreview';

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
    publicKey: 'pk_test_9f04ff1cdc541872fbbdb8816c9057d2b6c883a5',
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
      };

      const response = await axios.post('http://localhost:4500/api/orders', orderData);
      
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






export default CheckoutPage;



