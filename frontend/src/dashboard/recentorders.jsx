import { Link } from "react-router-dom";
import formatAsNaira from "../currency/naira";

const Recentorders = ({ setActiveTab, orders }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your recent orders will appear here when you make a purchase.
          </p>
          <div className="mt-6">
            <Link to={"/"}>
        
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Shopping
            </button>
                </Link>
          </div>
        </div>
      ) : (
        <>
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="font-medium text-gray-900">
                    ORD-{order.paymentReference.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-2 sm:mb-0">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mb-2 sm:mb-0">
                  <p className="text-sm text-gray-500">
                    {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {formatAsNaira(order.total.toFixed(0))}
                  </p>
                </div>
              </div>
              {order.tracking && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Tracking: {order.tracking}</p>
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 text-right">
            <a
              href="#"
              onClick={() => setActiveTab("orders")}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              View all orders →
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Recentorders;