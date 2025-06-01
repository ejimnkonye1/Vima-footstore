import { useState } from 'react';
import { FiUser, FiMapPin, FiPhone, FiMail, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiEdit, FiChevronRight } from 'react-icons/fi';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import SettingsSection from '../dashboard/setting';
import WishlistSection from '../dashboard/whislistsection';
import AddressesSection from '../dashboard/addressesection';
import OrdersSection from '../dashboard/ordersection';
import UserSidebar from '../dashboard/sidebar';
import Recentorders from '../dashboard/recentorders';
import ProfileSection from '../dashboard/profilesection';
import { ErrorDisplay, LoadingSpinner } from '../util/loader';
import { useEffect } from 'react';
import axios from 'axios';
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
  const user = useSelector((state) => state.user);
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
  console.log("u", user)

  const saveProfileChanges = () => {
    setEditMode(false);
    // In a real app, you would save to your backend here
  };
      const [orders, setOrders] = useState([]);
          const [loading, setLoading] = useState(false);
             const [error, setError] = useState(null);
    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4500/api/orders/${user.email}`);
                setOrders(response.data || []);
                console.log("r",response)
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders');
                console.log("error", error)
            } finally {
                setLoading(false);
            }
        };
        getOrders();
    }, [user.email]);

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersSection orders={orders} />;
      case 'addresses':
        return <AddressesSection orders={orders} />;
      case 'wishlist':
        return <WishlistSection wishlist={wishlist} />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection userData={userData} orders={orders} />;
    }
  };

     if (loading) return <LoadingSpinner />;
      if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}


      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
     <UserSidebar
     setActiveTab={setActiveTab}
     userData={userData}
     orders={orders}
     wishlist={wishlist}
     activeTab={activeTab}
     />

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
               <ProfileSection 
                editMode={editMode}
                userData={userData}
                handleInputChange={handleInputChange}
               />

                {/* Recent Orders */}
             <Recentorders 
   orders={orders}
   setActiveTab={setActiveTab}
             />
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







export default UserDashboard;