import { useState } from "react";

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

export default AddressesSection