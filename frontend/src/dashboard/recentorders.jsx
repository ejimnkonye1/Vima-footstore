import formatAsNaira from "../currency/naira"

const Recentorders = ({setActiveTab, orders}) => {
    return (
           <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
                  {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <p className="font-medium text-gray-900">ORD-{order.paymentReference.slice(-6).toUpperCase()}</p>
                          <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()} 
                            </p>
                        </div>
                        <div className="mb-2 sm:mb-0">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'paid' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="mb-2 sm:mb-0">
                          <p className="text-sm text-gray-500">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{formatAsNaira(order.total.toFixed(0))}</p>
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
                      onClick={() => setActiveTab('orders')}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View all orders →
                    </a>
                  </div>
                </div>
    )
}

export default Recentorders