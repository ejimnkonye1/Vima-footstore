import { useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import formatAsNaira from '../util/naira';
import capitalizeFirstLetter from '../util/cap';
import { apiClient } from '../util/apiclient';

const ProductsSection = ({ products, onEdit, onDelete, loading, error }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
    setDeleteError(null); // Reset error when opening modal
  };

const confirmDelete = async () => {
  setDeleteLoading(true);
  try {
    const response = await apiClient.request(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/products/deleteproduct/${encodeURIComponent(productToDelete.name)}`,
      {
        method: 'DELETE',
      }
    );

    // Parse the response data (fetch doesn't auto-parse like Axios)
    const responseData = await response.json();

    // Check for successful response
    if (response.ok) {  // response.ok checks for status 200-299
      toast.success('Product deleted successfully');
      onDelete(productToDelete._id); // Pass the ID to update state
      setShowDeleteModal(false);
      setProductToDelete(null);
    } else {
      const errorMsg = responseData.message || 'Failed to delete product';
      setDeleteError(errorMsg);
      toast.error(errorMsg);
    }
  } catch (err) {
    let errorMsg = 'Error deleting product';
    
    // Try to get error message from response if available
    if (err instanceof Response) {
      try {
        const errorData = await err.json();
        errorMsg = errorData.message || errorMsg;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
    } else if (err.message) {
      errorMsg = err.message;
    }

    setDeleteError(errorMsg);
    toast.error(errorMsg);
    console.error('Delete error:', err);
  } finally {
    setDeleteLoading(false);
  }
};

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
    setDeleteError(null);
  };


  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {loading && <p className="p-4">Loading products...</p>}
      {error && <p className="text-red-500 p-4">{error}</p>}
<Toaster position="bottom-right" />
      {/* Delete Confirmation Modal */}
        {showDeleteModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-2xl rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete <span className="font-semibold">{productToDelete?.name}</span>?
              This action cannot be undone.
            </p>
            
            {deleteError && (
              <p className="text-red-500 mb-4 text-sm">{deleteError}</p>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                disabled={deleteLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id || product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{ capitalizeFirstLetter(product.name)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{capitalizeFirstLetter(product.category)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatAsNaira(product.price?.toFixed(0))}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.stock > 50 ? 'bg-green-100 text-green-800' : 
                    product.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} in stock
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsSection;