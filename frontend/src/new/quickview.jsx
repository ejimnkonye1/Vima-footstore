import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiChevronDown, FiStar, FiFilter } from 'react-icons/fi';
const Quickview = ({quickViewProduct,setQuickViewProduct,addToCart}) => {
    return(
        <>
   
             <AnimatePresence>
                {quickViewProduct && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                            <div className="aspect-square bg-gray-200 flex items-center justify-center rounded-lg">
                              {quickViewProduct.image ? (
                                <img 
                                  src={quickViewProduct.image} 
                                  alt={quickViewProduct.name} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-gray-500">Product Image</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="mb-4">
                              <h2 className="text-2xl font-bold text-gray-900">{quickViewProduct.name}</h2>
                              <p className="text-gray-500 capitalize">{quickViewProduct.category}'s</p>
                            </div>
                            
                            <div className="mb-6">
                              <span className="text-3xl font-bold text-gray-900">${quickViewProduct.price.toFixed(2)}</span>
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
                                  addToCart(quickViewProduct);
                                  setQuickViewProduct(null);
                                }}
                                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-medium"
                              >
                                Add to Cart
                              </button>
                              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100">
                                <FiHeart size={20} />
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