import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
const OrdersSection = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
     const [error, setError] = useState(null)

       useEffect(() => {
      const getproduct = async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:4500/api/admin/getallorders');
            setOrders(response.data.orders)
            console.log("order", response.data.orders)
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch products');
          console.error('Error:', err);
        } finally {
          setLoading(false);
        }
      };
      getproduct();
    }, []);
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
                 {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ORD-{order.paymentReference}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-15</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'paid' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ${order.total.toFixed(0)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersSection