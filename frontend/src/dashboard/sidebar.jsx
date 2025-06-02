import { BiPurchaseTagAlt } from "react-icons/bi"
import {  FiLogOut,  FiSettings, FiShoppingBag, FiUser } from "react-icons/fi"
import { useSelector } from "react-redux";
import capitalizeFirstLetter from "../util/cap";


const UserSidebar = ({setActiveTab,orders, activeTab}) => {
      const user = useSelector((state) => state.user);
      const firstLetter = user?.email ? user.email.charAt(0).toUpperCase() : '';

    return(
        <div>
                 <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                          {/* User Profile Summary */}
                          <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center">
    <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
      {firstLetter}
    </div>

                              <div>
                                <h2 className="font-medium text-gray-900">{capitalizeFirstLetter(user.username)}</h2>
<p className="text-sm text-gray-500">
  Member since {user?.joinDate ? new Date(user.joinDate).getFullYear() : '----'}
</p>
                              </div>
                            </div>
                          </div>
            
                          {/* Navigation */}
                          <nav className="p-4">
                            <ul className="space-y-1">
                              <li>
                                <button
                                  onClick={() => setActiveTab('overview')}
                                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                  <span className="flex items-center">
                                    <FiUser className="mr-3" />
                                    Overview
                                  </span>
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => setActiveTab('orders')}
                                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                  <span className="flex items-center">
                                    <FiShoppingBag className="mr-3" />
                                    My Orders
                                  </span>
                                  <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                    {orders.length}
                                  </span>
                                </button>
                              </li>

                  
                              <li>
                                <button
                                  onClick={() => setActiveTab('settings')}
                                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                  <span className="flex items-center">
                                    <FiSettings className="mr-3" />
                                    Account Settings
                                  </span>
                                </button>
                              </li>
                              <li>
                                <button className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                                  <FiLogOut className="mr-3" />
                                  Sign Out
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
            
                        {/* Sustainability Badge */}
                        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                          <div className="flex items-center">
                            <BiPurchaseTagAlt className="flex-shrink-0 h-6 w-6 text-green-500 mr-3" />
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">Your Sustainable Impact</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                You've saved 3.2kg CO₂ with your orders
                              </p>
                            </div>
                          </div>
                        </div>
                      </aside>
            
        </div>
    )
}
export default UserSidebar