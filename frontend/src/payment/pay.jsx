// CheckoutButton.js
import React from 'react';

const CheckoutButton = () => {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      items: [{ sku: 'sk_test_51OFPhZCmInyauMSdNvwaDmcvtmRm4OcoCSCYSMJG0d5dMhOajl89HUxlDUMRoqOFFfGyXnMzlK1NWgpUYeQU3icq002fWyP26o:', quantity: 1 }],
      successUrl: 'YOUR_ACTUAL_SUCCESS_URL',
      cancelUrl: 'YOUR_ACTUAL_CANCEL_URL',
    });

    if (error) {
      console.error('Error redirecting to checkout:', error);
    }
  };

  return (
    <div>
      {/* Your other components */}
      <button onClick={handleClick} role="link">
        Pay
      </button>
      <div id="error-message"></div>
    </div>
  );
};

export default CheckoutButton;
