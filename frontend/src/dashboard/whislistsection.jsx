import { FiHeart, FiShoppingBag } from "react-icons/fi";

const WishlistSection = ({ wishlist }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist</h2>
      
      {wishlist?.length === 0 ? (
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

export default WishlistSection