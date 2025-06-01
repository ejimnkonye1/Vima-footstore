import { useState, useEffect } from "react";
import axios from 'axios';
import { ErrorDisplay, LoadingSpinner } from "../util/loader";
import { useSelector } from "react-redux";
import { FiShoppingBag, FiX } from "react-icons/fi";
import formatAsNaira from "../currency/naira";

const OrdersSection = ({orders}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const user = useSelector((state) => state.user);

  

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message={error} />;

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Orders</h2>
            
            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-gray-500">Start shopping to see your orders here</p>
                    <a
                        href="/"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Start Shopping
                    </a>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order #
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ORD-{order.paymentReference.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()} 
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'paid' ? 'bg-purple-100 text-purple-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.items.length}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatAsNaira(order.total.toFixed(0))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleViewOrder(order)} 
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Enhanced Modal for Order Details */}
            {selectedOrder && (
                <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">Order Details</h3>
                                <button 
                                    onClick={closeModal} 
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">Order Information</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Order ID:</span> #{selectedOrder._id.slice(-6).toUpperCase()}</p>
                                        <p><span className="font-medium">Date:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                        <p>
                                            <span className="font-medium">Status:</span> 
                                            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                                                selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                selectedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                selectedOrder.status === 'paid' ? 'bg-purple-100 text-purple-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {selectedOrder.status}
                                            </span>
                                        </p>
                                        <p><span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">Shipping Information</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Name:</span> {selectedOrder.firstName} {selectedOrder.lastName}</p>
                                        <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                                        <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                                        <p>
                                            <span className="font-medium">Address:</span> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state}, {selectedOrder.country}, {selectedOrder.zip}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <h4 className="text-lg font-semibold mb-3">Order Items</h4>
                            <div className="border rounded-lg divide-y">
                                {selectedOrder.items.map(item => (
                                    <div key={item._id} className="p-4 flex flex-col sm:flex-row">
                                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-20 h-20 object-cover rounded-md"
                                                onError={(e) => {
                                                    e.target.onerror = null; 
                                                    e.target.src = "https://via.placeholder.com/80?text=No+Image";
                                                }}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h5 className="font-medium text-gray-900">{item.name}</h5>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="text-sm text-gray-500">Price: {formatAsNaira(item.price)} each</p>
                                        </div>
                                        <div className="mt-2 sm:mt-0 sm:ml-auto">
                                            <p className="font-medium text-gray-900">
                                                {formatAsNaira((item.price * item.quantity).toFixed(0))}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-6 border-t pt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Subtotal:</span>
                                    <span>{formatAsNaira(selectedOrder.subtotal.toFixed(0))}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Shipping:</span>
                                    <span>{formatAsNaira(selectedOrder.shipping.toFixed(0))}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Tax:</span>
                                    <span>{formatAsNaira(selectedOrder.tax.toFixed(0))}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold mt-4 pt-2 border-t">
                                    <span>Total:</span>
                                    <span>{formatAsNaira(selectedOrder.total.toFixed(0))}</span>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <button 
                                    onClick={closeModal} 
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersSection;