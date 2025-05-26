

const HeaderDashboard = ({activeTab,editingProduct}) => {
    return(
   <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 md:px-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize">
              {activeTab === 'addProduct' 
                ? (editingProduct ? 'Edit Product' : 'Add New Product') 
                : activeTab}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                  <span className="sr-only">Notifications</span>
                  <div className="relative">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </div>
                </button>
              </div>
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin profile" />
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">Admin User</span>
              </div>
            </div>
          </div>
        </header>
    )
}

export default HeaderDashboard;