import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiX } from 'react-icons/fi';
import formatAsNaira from '../currency/naira';
import { useCart } from '../context/cartcontext';
import toast, { Toaster } from "react-hot-toast";
import capitalizeFirstLetter from '../util/cap';
import { useState } from 'react';

const Quickview = ({ quickViewProduct, setQuickViewProduct }) => {
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);

    const addtoCart = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            addToCart(quickViewProduct);
            toast.success(`${quickViewProduct.name} added to cart`);
            setQuickViewProduct(null); // Close the quick view after adding
        } catch (err) {
            console.error("Error:", err);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                <Toaster position="bottom-right" />
                {quickViewProduct && (
                    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center p-4 z-50">
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
                                                    className="w-full h-full object-cover"
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
                                                onClick={addtoCart}
                                                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-medium"
                                                disabled={loading} // Disable button while loading
                                            >
                                                {loading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing
                                                    </>
                                                ) : (
                                                    " Add to Cart"
                                                )}
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
    );
};

export default Quickview;
