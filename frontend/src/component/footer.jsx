import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const footerLinks = [
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Shipping Policy", path: "/shipping" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialIcons = [
    { icon: <FiFacebook size={20} />, path: "/" },
    { icon: <FaWhatsapp size={20} />, path: "/" },
    { icon: <FiInstagram size={20} />, path: "/" },
    { icon: <FiTwitter size={20} />, path: "/" },
  ];

  return (
    <footer className="bg-emerald-600 text-white">
      <div className="container mx-auto  py-12">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 
            className="text-2xl md:text-3xl font-bold mb-4"
            data-aos="fade-up"
          >
            Join Our Sustainable Fashion Journey
          </h3>
          <p 
            className="text-emerald-100 mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Be the first to know about new eco-friendly collections and exclusive offers.
          </p>
          
          <form 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="relative flex-grow">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                required
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-700 text-white p-2 rounded-full hover:bg-emerald-800 transition-colors"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Social Links */}
        <div 
          className="flex justify-center gap-6 mb-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {socialIcons.map((social, index) => (
            <Link
              key={index}
              to={social.path}
              className="p-3 bg-emerald-700 rounded-full hover:bg-emerald-800 transition-colors"
              aria-label={`Social link ${index}`}
            >
              {social.icon}
            </Link>
          ))}
        </div>

        {/* Footer Links */}
        <div 
          className="flex flex-wrap justify-center gap-6 mb-8 text-sm"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-emerald-100 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div 
          className="text-center text-emerald-100 text-sm"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          © {new Date().getFullYear()} VimaFootstore.Ng - Sustainable Fashion for a Better Tomorrow
        </div>
      </div>
    </footer>
  );
};

export default Footer;