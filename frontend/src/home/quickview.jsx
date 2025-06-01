import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart,  FiX,  } from 'react-icons/fi';
import formatAsNaira from '../currency/naira';
import { useCart } from '../context/cartcontext';
import toast, { Toaster } from "react-hot-toast";
import capitalizeFirstLetter from '../util/cap';
const Quickview = ({quickViewProduct,setQuickViewProduct,}) => {
    const { addToCart } = useCart();

     const addtoCart = () => {
          addToCart(quickViewProduct);
         toast.success(`${quickViewProduct.name} added to cart`);
      }

    return(
        <>
   
             <AnimatePresence>
                 <Toaster position="bottom-right" />
                {quickViewProduct && (
                  <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center p-4 z-50">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                      <div className="relative">
                        <button
                          onClick={() => setQuickViewProduct(null)}
                          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md z-10"
                        >
                          <FiX size={20} />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2">
                     <div className="bg-gray-100 p-6">
  <div className="aspect-square bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
    {quickViewProduct.image ? (
      <img 
        src={quickViewProduct.image} 
        alt={quickViewProduct.name} 
        className="w-full h-full object-cover" // Ensures the image covers the container
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/500x500?text=Product+Image"; // Fallback image
        }}
      />
    ) : (
      <span className="text-gray-500">Product Image</span>
    )}
  </div>
</div>
                          
                          <div className="p-6">
                            <div className="mb-4">
                              <h2 className="text-2xl font-bold text-gray-900">{capitalizeFirstLetter(quickViewProduct.name)}</h2>
                              <p className="text-gray-500 capitalize">{quickViewProduct.category}'s</p>
                            </div>
                            
                            <div className="mb-6">
                              <span className="text-3xl font-bold text-gray-900">{formatAsNaira(quickViewProduct.price.toFixed(0))}</span>
                            </div>
                            
                            <div className="mb-6">
                              <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                              <p className="text-gray-600">
                                {quickViewProduct.description}
                              </p>
                            </div>
                            
                            <div className="flex space-x-4">
                              <button
                                onClick={() => {
                                  addtoCart();
                                  // setQuickViewProduct(null);
                                }}
                                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-medium"
                              >
                                Add to Cart
                              </button>
                         
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
                   </>
    )
}

export default Quickview