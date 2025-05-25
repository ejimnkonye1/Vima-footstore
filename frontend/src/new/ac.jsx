import { useState } from 'react';
import { FiUser, FiMapPin, FiPhone, FiMail, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiEdit, FiChevronRight } from 'react-icons/fi';
import { BiPurchaseTagAlt } from 'react-icons/bi';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2024',
    avatar: '/user-avatar.jpg'
  });
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      country: 'United States',
      isDefault: false
    }
  ]);
  const [orders] = useState([
    {
      id: 'ORD-2025-98765',
      date: 'May 15, 2025',
      status: 'Delivered',
      items: 3,
      total: 189.97,
      tracking: 'UPS #1Z12345E0205271688'
    },
    {
      id: 'ORD-2025-54321',
      date: 'April 28, 2025',
      status: 'Shipped',
      items: 2,
      total: 79.98,
      tracking: 'FedEx #123456789012'
    },
    {
      id: 'ORD-2025-12345',
      date: 'March 10, 2025',
      status: 'Completed',
      items: 1,
      total: 129.99,
      tracking: 'USPS #9200199999977453249942'
    }
  ]);
  const [wishlist] = useState([
    {
      id: '4',
      name: 'Breathable Running Socks',
      price: 14.99,
      image: '/socks.jpg',
      isOnSale: true
    },
    {
      id: '5',
      name: 'Lightweight Running Cap',
      price: 24.99,
      image: '/cap.jpg',
      isOnSale: false
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const saveProfileChanges = () => {
    setEditMode(false);
    // In a real app, you would save to your backend here
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersSection orders={orders} />;
      case 'addresses':
        return <AddressesSection addresses={addresses} />;
      case 'wishlist':
        return <WishlistSection wishlist={wishlist} />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection userData={userData} orders={orders} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-indigo-600">FashionHub</h1>
            <div className="flex items-center space-x-4">
              <a href="/cart" className="p-2 text-gray-700 hover:text-indigo-600 relative">
                <FiShoppingBag size={20} />
                <span className="sr-only">Cart</span>
              </a>
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full" src={userData.avatar} alt="User avatar" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* User Profile Summary */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <img className="h-16 w-16 rounded-full mr-4" src={userData.avatar} alt="User avatar" />
                  <div>
                    <h2 className="font-medium text-gray-900">{userData.name}</h2>
                    <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
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
                      onClick={() => setActiveTab('addresses')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${activeTab === 'addresses' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <span className="flex items-center">
                        <FiMapPin className="mr-3" />
                        Addresses
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${activeTab === 'wishlist' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <span className="flex items-center">
                        <FiHeart className="mr-3" />
                        Wishlist
                      </span>
                      <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {wishlist.length}
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

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
                  {editMode ? (
                    <div className="space-x-2">
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveProfileChanges}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <FiEdit className="mr-1" /> Edit Profile
                    </button>
                  )}
                </div>

                {/* Profile Section */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-600">{userData.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-600">{userData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      {editMode ? (
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-600">{userData.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                      <p className="text-gray-600">{userData.joinDate}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
                  {orders.slice(0, 2).map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <p className="font-medium text-gray-900">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="mb-2 sm:mb-0">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="mb-2 sm:mb-0">
                          <p className="text-sm text-gray-500">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
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
              </div>
            )}

            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-components
const OverviewSection = ({ userData, orders }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Content already included in the main component */}
    </div>
  );
};

const OrdersSection = ({ orders }) => {
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
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-3">
                      View
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Track
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const AddressesSection = ({ addresses }) => {
  const [editingAddress, setEditingAddress] = useState(null);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium">
          Add New Address
        </button>
      </div>
      
      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <FiMapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No saved addresses</h3>
          <p className="mt-1 text-gray-500">Add your first address to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="border border-gray-200 rounded-lg p-6 relative">
              {address.isDefault && (
                <span className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">
                  Default
                </span>
              )}
              <h3 className="font-medium text-gray-900 mb-2">{address.type}</h3>
              <p className="text-gray-600">{address.street}</p>
              <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
              <p className="text-gray-600">{address.country}</p>
              <div className="mt-4 flex space-x-3">
                <button 
                  onClick={() => setEditingAddress(address)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Edit
                </button>
                {!address.isDefault && (
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Remove
                  </button>
                )}
                {!address.isDefault && (
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const WishlistSection = ({ wishlist }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <FiHeart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
          <p className="mt-1 text-gray-500">Save items you love for later</p>
          <a
            href="/"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                      <FiShoppingBag size={16} />
                    </button>
                    <button className="p-2 bg-gray-100 text-red-500 rounded-md hover:bg-gray-200">
                      <FiHeart size={16} fill="currentColor" />
                    </button>
                  </div>
                </div>
                {item.isOnSale && (
                  <span className="mt-2 inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                    On Sale
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsSection = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promotions: true
  });

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
      
      <div className="space-y-8">
        {/* Notification Preferences */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="email-notifications"
                name="email"
                type="checkbox"
                checked={notifications.email}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="sms-notifications"
                name="sms"
                type="checkbox"
                checked={notifications.sms}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                SMS Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="promotion-notifications"
                name="promotions"
                type="checkbox"
                checked={notifications.promotions}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="promotion-notifications" className="ml-2 block text-sm text-gray-700">
                Promotions & Offers
              </label>
            </div>
          </div>
        </div>

        {/* Password Update */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                id="current-password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                id="new-password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                id="confirm-password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium">
              Update Password
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 flex justify-between items-center">
              <span className="text-gray-700">Download Personal Data</span>
              <FiChevronRight className="text-gray-400" />
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 flex justify-between items-center">
              <span className="text-gray-700">Request Account Deletion</span>
              <FiChevronRight className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;