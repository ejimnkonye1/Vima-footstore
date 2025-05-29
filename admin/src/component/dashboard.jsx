import { useState } from 'react';
import {  FiBox, FiUsers, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';
import { HiOutlineMenuAlt2, HiOutlineX } from 'react-icons/hi';
import { RiDashboardHorizontalLine } from "react-icons/ri";
import ProductsSection from '../dashboard/productsection';
import AddProductForm from '../dashboard/addproductform';
import UsersSection from '../dashboard/userssection';
import OrdersSection from '../dashboard/orderssection';
import DashboardOverview from '../dashboard/DashboardOverview';
import Sidebar from '../dashboard/sidebar';
import HeaderDashboard from '../dashboard/header';
import { useEffect } from 'react';
import axios from 'axios';
import EditProductForm from '../dashboard/editproduct';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
    
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([
  ]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
 console.log(editingProduct,";;")
  const [error, setError] = useState(null);
  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsSection products={products}       onEdit={(product) => {
                setEditingProduct(product);
                setActiveTab('editProduct'); // Add this line
              }} 
               onDelete={handleDeleteProduct} loading={loading} error={error} />;
      case 'addProduct':
        return <AddProductForm onAddProduct={handleAddProduct}   />;
      case 'users':
        return <UsersSection />;
      case 'orders':
        return <OrdersSection />;
            case 'editProduct':
      return <EditProductForm
          product={editingProduct}
          onUpdateProduct={handleUpdateProduct}
          onCancel={() => setActiveTab('products')}
        />
      default:
        return <DashboardOverview />;
    }
  };
        const getProducts = async () => {
        setLoading(true);
        try {
          const response = await axios.get('https://nique-backend.vercel.app/products',{
       credentials: 'include'  
          });
          console.log('Products:', response.data);
          setProducts(response.data || []);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch products');
          console.error('Error:', err);
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {

      getProducts();
    }, []);
  

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, _id: products.length + 1 }]);
    setActiveTab('products');
  };


  const handleUpdateProduct = async () => {
    try {
      setLoading(true);
      await getProducts(); // Refresh the product list
      setActiveTab('products');
    } catch (err) {
      setError('Failed to refresh products after update');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
const handleDeleteProduct = async (deletedProductId) => {
  setProducts(products.filter(product => product._id !== deletedProductId));
  
  try {
    setLoading(true);
    await getProducts();
  } catch (err) {
    toast.error(err,'Failed to refresh products');
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt2 size={24} />}
      </button>

      {/* Sidebar */}
  <Sidebar
  mobileMenuOpen={mobileMenuOpen}
  setActiveTab={setActiveTab}
  setMobileMenuOpen={setMobileMenuOpen}
  activeTab={activeTab}

  />
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
     <HeaderDashboard
     activeTab={activeTab}
     editingProduct={editingProduct}
   
     />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {activeTab === 'products' && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => { setActiveTab('addProduct');  }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
              >
                <FiBox className="mr-2" />
                Add Product
              </button>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};












export default AdminDashboard;