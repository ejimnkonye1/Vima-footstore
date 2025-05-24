import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { BiLeaf } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">FashionHub</h3>
            <p className="text-gray-400 mb-4">
              The future of fashion shopping. Curated collections for the modern consumer.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Pinterest</span>
                <FaPinterest className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Men's Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Women's Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kids' Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sale Items</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Info</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <FiMapPin className="flex-shrink-0 h-5 w-5 mt-0.5 mr-3" />
                <span>123 Fashion Street, Trend District, 10001</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="flex-shrink-0 h-5 w-5 mr-3" />
                <span>(800) 555-2025</span>
              </li>
              <li className="flex items-center">
                <FiMail className="flex-shrink-0 h-5 w-5 mr-3" />
                <span>support@fashionhub.com</span>
              </li>
              <li className="flex items-center pt-4">
                <BiLeaf className="flex-shrink-0 h-6 w-6 mr-2 text-green-400" />
                <span className="text-green-400">Carbon Neutral Since 2023</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4">We Accept</h4>
          <div className="flex flex-wrap gap-4">
            {['visa', 'mastercard', 'amex', 'paypal', 'applepay', 'googlepay'].map((method) => (
              <div key={method} className="bg-gray-800 rounded-md p-2 w-16 h-10 flex items-center justify-center">
                <span className="text-xs uppercase">{method}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FashionHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;