import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { BiLeaf } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">NiqueWear</h3>
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
          
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Men's Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Women's Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kids' Collection</a></li>
            </ul>
          </div>

          {/* Customer Service */}
       

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <FiMapPin className="flex-shrink-0 h-5 w-5 mt-0.5 mr-3" />
                <span>Enugu State, Market</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="flex-shrink-0 h-5 w-5 mr-3" />
                <span>07062487335</span>
              </li>
              <li className="flex items-center">
                <FiMail className="flex-shrink-0 h-5 w-5 mr-3" />
                <span>niquewear@gmail.com</span>
              </li>
              <li className="flex items-center pt-4">
                <BiLeaf className="flex-shrink-0 h-6 w-6 mr-2 text-green-400" />
                <span className="text-green-400">Carbon Neutral Since 2023</span>
              </li>
            </ul>
          </div>
        </div>

      
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Niquewear. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;