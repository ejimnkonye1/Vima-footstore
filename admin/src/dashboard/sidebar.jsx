
import {  FiBox, FiUsers, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';
import { RiDashboardHorizontalLine } from "react-icons/ri";
const Sidebar = ({mobileMenuOpen, setActiveTab, setMobileMenuOpen, activeTab}) => {
    return (
        <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transform fixed md:static inset-y-0 left-0 w-64 bg-indigo-800 text-white transition-transform duration-300 ease-in-out z-40`}>
               <div className="flex items-center justify-center h-16 px-4 border-b border-indigo-700">
                 <h1 className="text-xl font-bold">StoreAdmin</h1>
                 <span className="ml-2 px-2 py-1 text-xs bg-indigo-600 rounded-full">v3.5</span>
               </div>
               <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
                 <nav className="space-y-1">
                   <button
                     onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                     className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700'}`}
                   >
                     {/* <FiDashboard className="mr-3" /> */}
                     <RiDashboardHorizontalLine className="mr-3" />
                     Dashboard
                   </button>
                   <button
                     onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }}
                     className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'products' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700'}`}
                   >
                     <FiBox className="mr-3" />
                     Products
                   </button>
                   <button
                     onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }}
                     className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'users' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700'}`}
                   >
                     <FiUsers className="mr-3" />
                     Users
                   </button>
                   <button
                     onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }}
                     className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'orders' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700'}`}
                   >
                     <FiShoppingBag className="mr-3" />
                     Orders
                   </button>
                 </nav>
                 <div className="mt-auto pt-4 border-t border-indigo-700">
                   <button className="flex items-center w-full px-4 py-3 text-indigo-200 hover:text-white hover:bg-indigo-700 rounded-lg">
                     <FiSettings className="mr-3" />
                     Settings
                   </button>
                   <button className="flex items-center w-full px-4 py-3 text-indigo-200 hover:text-white hover:bg-indigo-700 rounded-lg">
                     <FiLogOut className="mr-3" />
                     Logout
                   </button>
                 </div>
               </div>
             </div> 
    )
}

export default Sidebar