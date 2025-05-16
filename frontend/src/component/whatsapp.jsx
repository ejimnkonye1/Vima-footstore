import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppLink = () => {
  const phoneNumber = '+2347082896503';
  const defaultMessage = 'Hello! I saw a product on your website and would like to make an enquiry about it.';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-white text-2xl" />
    
      </a>
    </div>
  );
};

export default WhatsAppLink;